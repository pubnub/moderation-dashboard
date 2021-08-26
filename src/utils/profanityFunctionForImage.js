import { constantBoolean } from './helpers';
import { FilterConditionForWordList } from './wordlist/index';
import { FilterConditionForAutomatic } from './automaticTextModeration/filterConditionForAutomatic';

/* ---------
    This functon will be passe to the event hanlder
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
  let regexForBanned = `"\\b(banned)\\b"`.replace(/\\/g, '\\\\');

  const checkForTextModeration = () => {
    if (!constantBoolean(textPnFnStatusdata.textModerationToggle)) {
      return ` return Promise.resolve(false)`;
    }
    if (constantBoolean(textPnFnStatusdata.wordListProfanity)) {
      return FilterConditionForWordList(textPnFnStatusdata, 'image');
    }
    if (constantBoolean(textPnFnStatusdata.automaticProfanity)) {
      // update for automatic
      return FilterConditionForAutomatic(textPnFnStatusdata, 'image');
    }
    return `return Promise.resolve(false)`;
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
  const imageModeration = (imageTypeFunction = 'block') => {
    let imageFunction = ` imageBannedFlag = true; `;
    const textModerationPromise = checkForTextModeration();
    if (imageTypeFunction === 'reroute') {
      imageFunction = ` imageBannedReouteFlag = true;`;
    }

    return ` if (request && request.ok) {
                const bannedChannel = new RegExp(${regexForBanned}, "g")
                const console = require("console");
                const query = require("codec/query_string");
                const xhr = require("xhr");
                const pubnub = require("pubnub");

                if (bannedChannel.test(request.channels[0])) {
                  request.message.type = "text";
                  return request.ok(request);
                }

                let message = request.message.message;
                let originalMessage;
                let moderatedMessage;
                let imageBannedFlag = false;
                let imageBannedReouteFlag = false;
                let textBlockedFlag = false;
                let textReouteFlag = false;
                let reasonForModeration;

                const textmoderation = () => {
                  if ('text' in message) {
                    console.log("start text Moderation Function");
                    ${textModerationPromise}
                  } else {
                    console.log('Message has no "text" element, performing image moderation only');
                    return Promise.resolve(false);
                  }
                };

                if (request.message.file) {
                      var apiUrl = "https://api.sightengine.com/1.0/check-workflow.json";
                      var fileUrl = "";
                      const channel = request.channels[0];
                      const fileId = request.message.file.id;
                      const fileName = request.message.file.name;
                      fileUrl = pubnub.getFileUrl({
                        channel: channel,
                        id: fileId,
                        name: fileName,
                      });
                      const queryParams = {
                        'api_secret': '${sightengineAPIKey}',
                        'workflow': '${sightengineWorkflowId}',
                        'api_user': '${sightengineAPIUser}',
                        url: fileUrl
                      };

                      const imageModerationFunction = () => {
                        return new Promise((resolve, reject) => {
                          console.log("start image Moderation Function");
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
                      };

                      return Promise.all([imageModerationFunction(), textmoderation()])
                        .then((values) => {
                          console.log("values", values);
                          let payload = {'file': {}, 'message': {}};
                          if (
                            values[0] &&
                            values[0].summary &&
                            values[0].summary.reject_prob &&
                            '${sightengineRiskFactorThreshold}' < values[0].summary.reject_prob
                          ) {
                              ${imageFunction}
                            }

                          if (imageBannedReouteFlag) {
                            payload.file = {
                              type:'image',
                              url: fileUrl,
                              id: fileId,
                              name: fileName,
                              reason: values[0].summary.reject_reason,
                            }
                          }

                          if (textReouteFlag) {
                            payload.message.type = "text";
                            if (originalMessage) {
                               payload.message.originalMessage = originalMessage;
                            } else {
                               payload.message.originalMessage = request.message.message.text;
                            }
                            if (moderatedMessage) {
                               payload.message.moderatedMessage = moderatedMessage;
                            }
                            if (reasonForModeration) {
                               payload.message.reason = reasonForModeration;
                            }
                          }
                
                          if (payload.file.type || payload.message.type) {
                            return pubnub
                            .publish({
                              channel: "banned." + request.channels[0],
                              message: payload,
                            })
                            .then((publishResponse) => {
                              if (textBlockedFlag && (imageBannedFlag || imageBannedReouteFlag)) {
                                return request.abort("moderated message");
                              }
                              if (!imageBannedFlag && !imageBannedReouteFlag) {
                                message.file = {};
                                message.file.id = fileId;
                                message.file.name = fileName;
                                message.file.url = fileUrl;
                              }
                              if (textBlockedFlag) {
                                delete message.text;
                              }
                              if (message.text) {
                                message.message = {}
                                message.message.text = message.text
                                delete message.text
                              }
                              message.file =  message.file || {};
                              message.message =  message.message || {};
                              if (!message.file.name && !message.message.text) {
                                return request.abort("moderated message");
                              }
                              return request.ok(message);
                            })
                            .catch((err) => {
                              console.error(err);
                            });
                          }
                          if (values[0] || values[1]) {
                           if (textBlockedFlag && imageBannedFlag) {
                            return request.abort("moderated message");
                           }
                            if (textBlockedFlag) {
                              delete message.text;
                            }
                            if (!imageBannedFlag) {
                              request.message.message.file = {};
                              request.message.message.file.url = fileUrl;
                              request.message.message.file.id = fileId;
                              request.message.message.file.name = fileName;
                              request.message.message.type = "text";
                            }
                            message.message = {}
                            if (message.text) {
                              message.message.text = message.text
                              delete message.text
                            }
                            message.file =  message.file || {};
                            if (!message.file.name && !message.message.text) {
                              return request.abort("moderated message");
                            }
                            return request.ok(message);
                          }
                        })
                        .catch((err) => {
                          console.log(err);
                          return request.abort(err);
                        });
                    }
              }
                `;
  };
  /* -------
  This function is for handling differect use cases for image moderation
---------- */
  const filterConditions = () => {
    let imageTypeFunction = 'block';
    if (constantBoolean(reRouteMessages)) {
      imageTypeFunction = 'reroute';
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
        }
    }`;
}
