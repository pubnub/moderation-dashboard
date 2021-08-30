import CreateEventHandler from "../../../components/imageModeration/CreateEventHandler";
import profanityFunctionForImage from "../../../utils/profanityFunctionForImage";
import { startPubNubFunction, createPubNubEventHandler } from "../../../services/pubnub";

import { mockMaskAutomationOn } from "../../mockTest/mockTextProfanity";

import { mockImageState } from "../../mockTest/mockImageProfanity";

profanityFunctionForImage.functionToMock = jest.fn().mockReturnValue("run()");

jest.mock("../../../services/pubnub", () => {
  return {
    startPubNubFunction: jest.fn(),
    createPubNubEventHandler: jest.fn(),
  };
});

describe("check for image create event handler Function", () => {
  afterAll(() => {
    jest.resetAllMocks();
  });
  test("check image moderation function call", async () => {
    startPubNubFunction.mockImplementation(() => ({
      status: 200,
      data: { id: 1 },
    }));
    createPubNubEventHandler.mockImplementation(() => ({
      status: 200,
      data: { id: 2 },
    }));
    const data = {
      blockId: 1,
      keyId: 1,
      token: "",
      state: mockImageState,
      setState: jest.fn(),
      textPnFnStatusdata: mockMaskAutomationOn,
    };
    // image moderation is on
    await CreateEventHandler(data);
    expect(createPubNubEventHandler).toHaveBeenCalledTimes(1);

    // image moderation is off
    await CreateEventHandler({
      ...data,
      state: { ...mockImageState, imageModerationToggle: false },
    });
    expect(startPubNubFunction).toHaveBeenCalledTimes(1);
  });
});
