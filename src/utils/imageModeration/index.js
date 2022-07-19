import {
  filterImageFunction,
  pnFunctionFilterStatus,
  filterImageEventHandler,
  filterFunction,
  filterEventHandler,
  constantBoolean,
} from "../helpers";
import CreateEventHandler from "../../components/imageModeration/CreateEventHandler";
import UpdateEventHandler from "../../components/imageModeration/UpdateEventHandler";
import { fetchPubNubFunction, createPubNubFunction } from "../../services/pubnub";

export const textModerationCode = (selectedApp, fetchFunctionsResponse) => {
  const findTextModerationFunction = filterFunction(fetchFunctionsResponse, selectedApp);
  let blockId;
  let eventHandlerList;
  let eventHandler = [];
  if (findTextModerationFunction.length) {
    blockId = findTextModerationFunction[0].id;
    eventHandlerList = findTextModerationFunction[0].event_handlers;
    eventHandler = filterEventHandler(eventHandlerList, findTextModerationFunction);
  }
  let textPnFnStatusdata = [];
  let wordListProfanity = false;
  let automaticProfanity = false;
  let textModerationToggle = false;
  let textChannelId;
  if (eventHandler.length) {
    textPnFnStatusdata = pnFunctionFilterStatus(eventHandler[0].code);
    ({ wordListProfanity, automaticProfanity, textModerationToggle } = textPnFnStatusdata);
    textChannelId = eventHandler[0].channels;
  }
  return {
    findTextModerationFunction,
    blockId,
    eventHandlerList,
    eventHandler,
    wordListProfanity,
    automaticProfanity,
    textModerationToggle: constantBoolean(textModerationToggle),
    textPnFnStatusdata,
    textChannelId,
  };
};

const handleEventHandler = ({
  eventHandler,
  blockId,
  token,
  state,
  setState,
  keyId,
  textPnFnStatusdata,
  uiPagecall,
}) => {
  if (eventHandler.length === 0) {
    return CreateEventHandler({
      blockId,
      token,
      state,
      setState,
      keyId,
      textPnFnStatusdata,
    });
  } else {
    return UpdateEventHandler({
      eventHandler,
      blockId,
      state,
      setState,
      keyId,
      token,
      textPnFnStatusdata,
      uiPagecall,
    });
  }
};

export const handleImageModerationSave = async (
  app,
  token,
  { state, setState, uiPagecall = "imageModeration" }
) => {
  const fetchFunctionsResponse = await fetchPubNubFunction(app.id, token, true);
  const { findImageFunction, eventHandler, blockId } = imageModerationCode(
    app,
    fetchFunctionsResponse
  );
  const { textPnFnStatusdata, textChannelId, textModerationToggle } = textModerationCode(
    app,
    fetchFunctionsResponse
  );

  if (uiPagecall === "textModeration") {
    if (eventHandler.length) {
      const data = pnFunctionFilterStatus(eventHandler[0].code);
      if (!data.imageModerationToggle) {
        return true;
      }
      data.channelId = textChannelId;
      data.isState = false;
      await UpdateEventHandler({
        eventHandler,
        blockId,
        state: data,
        setState,
        keyId: app.id,
        token,
        textPnFnStatusdata,
        uiPagecall,
      });
    }
  } else {
    if (textModerationToggle && textChannelId && textChannelId !== state.channelId) {
      return setState((previousState) => ({
        ...previousState,
        saveLoading: false,
        successStatus: false,
        errorStatus: true,
        errorMsg: "Channel ID is not same as Text moderation",
        successMsg: "",
      }));
    }
    const keyId = app.id;
    if (findImageFunction.length) {
      await handleEventHandler({
        eventHandler,
        blockId,
        state,
        setState,
        keyId,
        token,
        textPnFnStatusdata,
        uiPagecall,
      });
    } else {
      const config = {
        key_id: app.id,
        name: `KEY-${app.id}-IMAGE-MODERATION`,
        description: "Image moderation function",
      };
      await createPubNubFunction(config, token);
      const fetchFunctions = await fetchPubNubFunction(app.id, token);
      const blockIdForImage = filterImageFunction(fetchFunctions, app)[0].id;
      await CreateEventHandler({
        blockId: blockIdForImage,
        token,
        state,
        setState,
        keyId: app.id,
        textPnFnStatusdata,
      });
    }
  }
};

export const imageModerationCode = (selectedApp, fetchFunctionsResponse) => {
  const findImageFunction = filterImageFunction(fetchFunctionsResponse, selectedApp);
  let blockId;
  let eventHandlerList;
  let eventHandler = [];
  if (findImageFunction.length) {
    blockId = findImageFunction[0].id;
    eventHandlerList = findImageFunction[0].event_handlers;
    eventHandler = filterImageEventHandler(eventHandlerList, findImageFunction);
  }
  return {
    findImageFunction,
    blockId,
    eventHandlerList,
    eventHandler,
  };
};
