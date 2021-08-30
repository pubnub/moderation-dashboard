import UpdateEventHandler from "../../../components/imageModeration/UpdateEventHandler";
import profanityFunctionForImage from "../../../utils/profanityFunctionForImage";
import {
  startPubNubFunction,
  stopPubNubFunction,
  updatePubNubEventHandler,
} from "../../../services/pubnub";
import { mockMaskAutomationOn } from "../../mockTest/mockTextProfanity";
import { mockImageState } from "../../mockTest/mockImageProfanity";

profanityFunctionForImage.functionToMock = jest.fn().mockReturnValue("abc()");
jest.mock("../../../services/pubnub", () => {
  return {
    startPubNubFunction: jest.fn(),
    stopPubNubFunction: jest.fn(),
    updatePubNubEventHandler: jest.fn(),
  };
});

describe("check for image update event handler Function", () => {
  afterAll(() => {
    jest.resetAllMocks();
  });
  test("check update image handler function call", async () => {
    startPubNubFunction.mockImplementation(() => ({
      status: 200,
      data: { id: 1 },
    }));
    updatePubNubEventHandler.mockImplementation(() => ({
      status: 200,
      data: { id: 2 },
    }));
    stopPubNubFunction.mockImplementation(() => ({
      status: 200,
      data: { id: 3 },
    }));
    const data = {
      eventHandler: [{ id: 1 }],
      blockId: 1,
      keyId: 1,
      token: "",
      state: mockImageState,
      setState: jest.fn(),
      textPnFnStatusdata: mockMaskAutomationOn,
    };
    // only image moderation is on
    await UpdateEventHandler(data);
    expect(updatePubNubEventHandler).toHaveBeenCalledTimes(1);
    expect(stopPubNubFunction).toHaveBeenCalledTimes(0);

    // image moderation is off
    await UpdateEventHandler({
      ...data,
      state: { ...mockImageState, imageModerationToggle: false },
    });
    expect(startPubNubFunction).toHaveBeenCalledTimes(1);
    expect(stopPubNubFunction).toHaveBeenCalledTimes(1);

    // image moderation is off and text moderation on
    const textModerationfn = await UpdateEventHandler({
      ...data,
      state: { ...mockImageState, imageModerationToggle: false },
      uiPagecall: "textModeration",
    });
    expect(textModerationfn).toBe(true);

    // image moderation is on and text moderation on
    const imageOnAndTextOn = await UpdateEventHandler({
      ...data,
      state: { ...mockImageState, imageModerationToggle: true },
      uiPagecall: "textModeration",
    });
    expect(startPubNubFunction).toHaveBeenCalledTimes(2);
    expect(imageOnAndTextOn).toBe(true);

    startPubNubFunction.mockImplementation(() => Promise.reject({ status: 401 }));

    // error handling text moderaion is on
    const errorResult = await UpdateEventHandler({
      ...data,
      state: { ...mockImageState, imageModerationToggle: true },
      uiPagecall: "textModeration",
    });
    expect(startPubNubFunction).toHaveBeenCalledTimes(3);
    expect(stopPubNubFunction).toHaveBeenCalledTimes(2);
    expect(errorResult).toBe(true);

    // error handling text moderaion is off
    await UpdateEventHandler({
      ...data,
      state: { ...mockImageState, imageModerationToggle: true },
    });
    expect(startPubNubFunction).toHaveBeenCalledTimes(4);
  });
});
