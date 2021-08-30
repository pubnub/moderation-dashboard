import profanityFunctionForImage from "../../utils/profanityFunctionForImage";

import { startPubNubFunction, createPubNubEventHandler } from "../../services/pubnub";
async function CreateEventHandler({ blockId, keyId, token, state, setState, textPnFnStatusdata }) {
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

  const config = {
    type: "js",
    key_id: keyId,
    block_id: blockId,
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
    await createPubNubEventHandler(config, token);
    if (imageModerationToggle) {
      await startPubNubFunction({ key_id: keyId, block_id: blockId }, token);
    }
    setState((prevState) => ({
      ...prevState,
      saveLoading: false,
    }));
  } catch (error) {
    setState((previousStateValue) => ({
      ...previousStateValue,
      errorStatus: true,
      saveLoading: false,
      errorMsg: error.message,
      successMsg: "",
      successStatus: false,
    }));
  }
}

export default CreateEventHandler;
