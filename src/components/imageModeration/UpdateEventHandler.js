import profanityFunctionForImage from "../../utils/profanityFunctionForImage";

import {
  startPubNubFunction,
  stopPubNubFunction,
  updatePubNubEventHandler,
} from "../../services/pubnub";

/* ------
  This function is for updating the event hanlder
---------  */
async function UpdateEventHandler({
  eventHandler,
  blockId,
  keyId,
  token,
  setState,
  state,
  textPnFnStatusdata,
  uiPagecall,
}) {
  const {
    imageModerationToggle,
    channelId,
    applyToAllChannelIds,
    toolForImageModeration,
    sightengineAPIUser,
    sightengineAPIKey,
    sightengineWorkflowId,
    sightengineRiskFactorThreshold,
    reRouteMessages,
  } = state;

  const updatedConfig = {
    type: "js",
    key_id: keyId,
    block_id: blockId,
    id: eventHandler[0].id,
    channels: channelId,
    code: `${profanityFunctionForImage({
      imageModerationToggle,
      channelId,
      applyToAllChannelIds,
      toolForImageModeration,
      sightengineAPIUser,
      sightengineAPIKey,
      sightengineWorkflowId,
      sightengineRiskFactorThreshold,
      reRouteMessages,
      textPnFnStatusdata,
    })}`,
    event: "js-before-publish-file",
    log_level: "debug",
    name: `BLOCK-${blockId}-IMAGE-MODERATION`,
    output: "output-0.5823105682419438",
  };

  try {
    await updatePubNubEventHandler(updatedConfig, token);
    if (!imageModerationToggle) {
      await stopPubNubFunction({ key_id: keyId, block_id: blockId }, token);
      if (uiPagecall === "textModeration") {
        return true;
      }
      return setState((previousState) => ({
        ...previousState,
        saveLoading: false,
        successStatus: true,
        errorStatus: false,
        errorMsg: "",
        successMsg: "Successfully Updated.",
      }));
    }
    await startPubNubFunction({ key_id: keyId, block_id: blockId }, token);
    if (uiPagecall === "textModeration") {
      return true;
    }
    setState((previous) => ({
      ...previous,
      saveLoading: false,
      successStatus: true,
      errorStatus: false,
      errorMsg: "",
      successMsg: "Successfully Updated.",
    }));
  } catch (error) {
    if (uiPagecall === "textModeration") {
      return true;
    }
    setState((previousValue) => ({
      ...previousValue,
      errorStatus: true,
      saveLoading: false,
      errorMsg: error.message,
      successMsg: "",
      successStatus: false,
    }));
  }
}

export default UpdateEventHandler;
