import { mockTextfunctionResponseListing } from "../../../mockTest/mockTextPubnubFunctionResponse";
import { mockImagePubnubFunctionResponse } from "../../../mockTest/mockImagePubnubFunctionResponse";
import { mockPubNubApplications } from "../../../mockTest/mockPubnubAccounts";
import {
  textModerationCode,
  imageModerationCode,
  handleImageModerationSave,
} from "../../../../utils/imageModeration";

import { mockImageState } from "../../../mockTest/mockImageProfanity";
import * as CreateEventHandler from "../../../imageModeration/CreateEventHandler";
import * as UpdateEventHandler from "../../../imageModeration/UpdateEventHandler";
import { fetchPubNubFunction, createPubNubFunction } from "../../../../services/pubnub";

jest.mock("../../../../services/pubnub", () => {
  return {
    fetchPubNubFunction: jest.fn(),
    createPubNubFunction: jest.fn(),
  };
});
CreateEventHandler.functionToMock = jest.fn().mockReturnValue({});
UpdateEventHandler.functionToMock = jest.fn().mockReturnValue({});

const selectedApp = mockPubNubApplications.result[2].keys[0];

describe("check for image and text modertaion Function", () => {
  afterAll(() => {
    jest.resetAllMocks();
  });
  test("check text moderation function response", () => {
    const app = mockPubNubApplications.result[3].keys[0];
    const fn = textModerationCode(app, mockTextfunctionResponseListing);
    expect(typeof fn).toBe("object");
  });
  test("check image moderation function response", () => {
    const fn = imageModerationCode(selectedApp, mockImagePubnubFunctionResponse);
    expect(typeof fn).toBe("object");
  });

  test("check handleEventHandler function response", async () => {
    createPubNubFunction.mockImplementation(() => mockImagePubnubFunctionResponse);
    fetchPubNubFunction.mockImplementation(() => mockImagePubnubFunctionResponse);

    expect(fetchPubNubFunction).toHaveBeenCalledTimes(0);

    await handleImageModerationSave(selectedApp, "", {
      state: mockImageState,
      setState: jest.fn(),
    });
    expect(fetchPubNubFunction).toHaveBeenCalledTimes(1);

    expect(CreateEventHandler.functionToMock).toHaveBeenCalledTimes(0);
    expect(UpdateEventHandler.functionToMock).toHaveBeenCalledTimes(0);

    fetchPubNubFunction.mockImplementation(() => mockTextfunctionResponseListing);
    await handleImageModerationSave(selectedApp, "", {
      state: mockImageState,
      setState: jest.fn(),
      uiPagecall: "textModeration",
    });
  });
});
