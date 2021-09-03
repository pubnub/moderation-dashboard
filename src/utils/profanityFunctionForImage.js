import { constantBoolean } from "./helpers";
import { FilterConditionForWordList } from "./wordlist/index";
import { FilterConditionForAutomatic } from "./automaticTextModeration/filterConditionForAutomatic";

/* ---------
    This functon will be passed to the PubNub event hanlder
  ----------- */
export default function profanityFunctionForImage(data) {
  const {
    imageModerationToggle,
    toolForImageModeration,
    sightengineAPIUser,
    sightengineAPIKey,
    sightengineWorkflowId,
    sightengineRiskFactorThreshold,
    reRouteMessages,
    applyToAllChannelIds,
    textPnFnStatusdata,
  } = data;
  let regexForBanned = `"\\b(banned)\\b"`.replace(/\\/g, "\\\\");

  const checkForTextModeration = () => {
    if (!constantBoolean(textPnFnStatusdata.textModerationToggle)) {
      return `console.log("skipping text moderation it is toggled off");
      return true;`;
    }
    if (constantBoolean(textPnFnStatusdata.wordListProfanity)) {
      return FilterConditionForWordList(textPnFnStatusdata, "image");
    }
    if (constantBoolean(textPnFnStatusdata.automaticProfanity)) {
      // update for automatic
      return FilterConditionForAutomatic(textPnFnStatusdata, "image");
    }
    return `console.log("skipping text moderation it has never been enabled");
    return true;`;
  };
  /* -------
   This PubNub function is use when admin turn on the image moderation.
   This function will only block the image from the main channel if it passes the sightengine reject_prob value.
   This will not re-route any image.
   ---------  */
  /* ------
    This PubNub function is use when admin turn on the image moderation and select the re-route checkbox.
    When this function runs it will moderate the image if it passes the sightengine reject_prob value
    and then it will re-route the image to the respective banned channel
  ---------  */
  const imageModeration = (imageTypeFunction = "block") => {
    let imageFunction = ` imageBannedFlag = true; `;
    const textModerationPromise = checkForTextModeration();
    if (imageTypeFunction === "reroute") {
      imageFunction = ` imageBannedReouteFlag = true;`;
    }

    return `if (request && request.ok) {
      const bannedChannel = new RegExp(${regexForBanned}, "g");
      const console = require("console");
      const query = require("codec/query_string");
      const xhr = require("xhr");
      const pubnub = require("pubnub");

      if (bannedChannel.test(request.channels[0])) {
        console.log('Skipping moderation on file sent to banned channel: ' + request.channels[0]);
        return request.ok();
      }

      let envelope = request.message;
      let message = envelope.message;
      let file = envelope.file;

      let originalMessage;
      let moderatedMessage;
      let fileUrl;
      let imageBannedFlag = false;
      let imageBannedReouteFlag = false;
      let textBlockedFlag = false;
      let textReouteFlag = false;
      let reasonForModeration;

      console.log("received image moderation request: ", envelope);

      // A message that contains both text and a file generates a Before Publish File event.
      // Perform text moderation if configured and the message contains text
      const textmoderation = () => {
        if (message && message.text) {
          ${textModerationPromise}
        } else {
          console.log("skipping text moderation, either the message or the text field is missing");
          return true;
        }
      };

      // Perform image moderation
      const imageModerationFunction = () => {
          if (file) {
            const apiUrl = "https://api.sightengine.com/1.0/check-workflow.json";
            const channel = request.channels[0];
            fileUrl = pubnub.getFileUrl({
              channel: channel,
              id: file.id,
              name: file.name,
            });
            const queryParams = {
              'api_secret': '${sightengineAPIKey}',
              'workflow': '${sightengineWorkflowId}',
              'api_user': '${sightengineAPIUser}',
              url: fileUrl
            };

            return new Promise((resolve, reject) => {
              xhr
                .fetch(apiUrl + "?" + query.stringify(queryParams))
                .then(function (r) {
                  const body = JSON.parse(r.body || r);
                  return resolve(body);
                })
                .catch(function (e) {
                  console.error(e);
                  return reject(e);
                });
            });
        } else {
            console.log("image moderation skipping API call because there is no file in the message!");
            return true;
        }
      };

      // Process the responses from both the text and image moderation
      return Promise.all([imageModerationFunction(), textmoderation()])
        .then((values) => {
          console.log("image moderation result: ", values[0].summary);
          let payload = {};

          if (
            values[0] &&
            values[0].summary &&
            values[0].summary.reject_prob &&
            '${sightengineRiskFactorThreshold}' < values[0].summary.reject_prob
          ) {
              ${imageFunction}
            }

          if (imageBannedReouteFlag) {
            payload["file"] = {
              url: fileUrl,
              id: file.id,
              name: file.name,
              reason: values[0].summary.reject_reason,
            };
          }

          if (textReouteFlag) {
            payload["message"] = { type: "text" };
            payload.message.originalMessage = originalMessage || message.text;

            if (moderatedMessage) {
                payload.message.moderatedMessage = moderatedMessage;
            }
            if (reasonForModeration) {
                payload.message.reason = reasonForModeration;
            }
          }

          // this block handles re-routing
          if (payload.file || payload.message) {
            payload.senderUuid = request.params.uuid;
            return pubnub.publish({
              channel: "banned." + request.channels[0],
              message: payload,
            })
            .then((publishResponse) => {
              if (textBlockedFlag && (imageBannedFlag || imageBannedReouteFlag)) {
                console.log("aborting reason 1 (both text and image were re-routed)");
                return request.abort("moderated message");
              }

              if (textBlockedFlag) {
                console.log("text sent with image will be blocked");
                delete envelope.message;
              }

              if (imageBannedFlag || imageBannedReouteFlag) {
                console.log("image will be blocked");
                // If text passed but image didn't, repackage as a plain text message
                if (envelope.message && envelope.message.text) {
                    const text = envelope.message.text += "\\n - Image blocked by moderation -";
                    request.message = {
                        type: "text",
                        text
                    };
                } else {
                  delete envelope.file;
                }
            }

            if (!envelope.text && !envelope.message && !envelope.file) {
                console.log("aborting reason 2 (message was empty or blocked, image was re-routed)");
                return request.abort("moderated message");
            }

              console.log(
                "passing reason 1 (only one of message or file was re-routed)",
                request.message
              );
              return request.ok();
            })
            .catch((err) => {
              console.error(err);
            });
          }

          // this block handles blocking (no re-routing enabled)
          if (values[0] || values[1]) {
            if (textBlockedFlag && imageBannedFlag) {
              console.log("aborting reason 3 (both text and image were blocked)");
              return request.abort("moderated message");
            }

            if (textBlockedFlag) {
              delete envelope.message;
            }

            if (imageBannedFlag || imageBannedReouteFlag) {
              delete envelope.file;
            }

            if (!envelope.message && !envelope.file) {
              console.log("aborting function (message was empty or blocked, image was blocked)");
              return request.abort("moderated message");
            }

            console.log("passing function (file not blocked and message is ok or masked)", request.message);
            return request.ok();
          }
        })
        .catch((err) => {
          console.log(err);
          return request.abort(err);
        });
    }
    `;
  };
  /* -------
  This function is for handling differect use cases for image moderation
---------- */
  const filterConditions = () => {
    let imageTypeFunction = "block";
    if (constantBoolean(reRouteMessages)) {
      imageTypeFunction = "reroute";
    }
    return imageModeration(imageTypeFunction);
  };
  return `function runProfanity(request){
            ${filterConditions()}
        return {
          imageModerationToggle: '${imageModerationToggle}',
          toolForImageModeration: '${toolForImageModeration}',
          sightengineAPIUser: '${sightengineAPIUser}',
          sightengineAPIKey: '${sightengineAPIKey}',
          sightengineWorkflowId: '${sightengineWorkflowId}',
          sightengineRiskFactorThreshold: '${sightengineRiskFactorThreshold}',
          reRouteMessages: '${reRouteMessages}',
          applyToAllChannelIds: '${applyToAllChannelIds}'
        };
    }`;
}
