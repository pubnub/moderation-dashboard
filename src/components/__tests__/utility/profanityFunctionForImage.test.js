import {
  mockTextProfanityOff,
  mockMasktWordProfanityOn,
  mockMaskReouteWordProfanityOn,
  mockBannedWordProfanityOn,
  mockBannedReouteWordProfanityOn,
  mockBlockAutomationOn,
  mockBlockReoutingAutomationOn,
  mockMaskReoutingAutomationOn,
  mockMaskAutomationOn,
  mockWithoutMaskandBannedAutoOn,
} from "../../mockTest/mockTextProfanity";

import {
  mockImageModerationOn,
  mockImageModerationOff,
  mockImageModerationReoute,
} from "../../mockTest/mockImageProfanity";

import profanityFunctionForImage from "../../../utils/profanityFunctionForImage";

describe("check for image and text modertaion Function", () => {
  test("check image toggle off and text moderation toggle Off", () => {
    const fn = profanityFunctionForImage({
      ...mockImageModerationOff,
      textPnFnStatusdata: mockMasktWordProfanityOn,
    });
    expect(typeof fn).toBe("string");
  });

  test("check image toggle on and text moderation toggle Off", () => {
    const imagebannedfn = profanityFunctionForImage({
      ...mockImageModerationOn,
      textPnFnStatusdata: mockTextProfanityOff,
    });
    expect(typeof imagebannedfn).toBe("string");

    const imageReoutefn = profanityFunctionForImage({
      ...mockImageModerationReoute,
      textPnFnStatusdata: mockTextProfanityOff,
    });
    expect(typeof imageReoutefn).toBe("string");
  });

  test("check image toggle off and text word and auto moderation toggle on", () => {
    const bannedWordfn = profanityFunctionForImage({
      ...mockImageModerationOff,
      textPnFnStatusdata: mockBannedWordProfanityOn,
    });
    expect(typeof bannedWordfn).toBe("string");

    const bannedReouteWordfn = profanityFunctionForImage({
      ...mockImageModerationOff,
      textPnFnStatusdata: mockBannedReouteWordProfanityOn,
    });
    expect(typeof bannedReouteWordfn).toBe("string");

    const maskReouteWordfn = profanityFunctionForImage({
      ...mockImageModerationOff,
      textPnFnStatusdata: mockMaskReouteWordProfanityOn,
    });
    expect(typeof maskReouteWordfn).toBe("string");

    const maskWordfn = profanityFunctionForImage({
      ...mockImageModerationOff,
      textPnFnStatusdata: mockMasktWordProfanityOn,
    });
    expect(typeof maskWordfn).toBe("string");

    const blockfn = profanityFunctionForImage({
      ...mockImageModerationOff,
      textPnFnStatusdata: mockBlockAutomationOn,
    });
    expect(typeof blockfn).toBe("string");

    const blockreoutingfn = profanityFunctionForImage({
      ...mockImageModerationOff,
      textPnFnStatusdata: mockBlockReoutingAutomationOn,
    });
    expect(typeof blockreoutingfn).toBe("string");

    const maskreoutingfn = profanityFunctionForImage({
      ...mockImageModerationOff,
      textPnFnStatusdata: mockMaskReoutingAutomationOn,
    });
    expect(typeof maskreoutingfn).toBe("string");

    const maskfn = profanityFunctionForImage({
      ...mockImageModerationOff,
      textPnFnStatusdata: mockMaskAutomationOn,
    });
    expect(typeof maskfn).toBe("string");
  });

  test("check banned image toggle on and text word and auto moderation toggle on", () => {
    const bannedWordfn = profanityFunctionForImage({
      ...mockImageModerationOn,
      textPnFnStatusdata: mockBannedWordProfanityOn,
    });
    expect(typeof bannedWordfn).toBe("string");

    const bannedReouteWordfn = profanityFunctionForImage({
      ...mockImageModerationOn,
      textPnFnStatusdata: mockBannedReouteWordProfanityOn,
    });
    expect(typeof bannedReouteWordfn).toBe("string");

    const maskReouteWordfn = profanityFunctionForImage({
      ...mockImageModerationOn,
      textPnFnStatusdata: mockMaskReouteWordProfanityOn,
    });
    expect(typeof maskReouteWordfn).toBe("string");

    const maskWordfn = profanityFunctionForImage({
      ...mockImageModerationOn,
      textPnFnStatusdata: mockMasktWordProfanityOn,
    });
    expect(typeof maskWordfn).toBe("string");

    const blockfn = profanityFunctionForImage({
      ...mockImageModerationOn,
      textPnFnStatusdata: mockBlockAutomationOn,
    });
    expect(typeof blockfn).toBe("string");

    const blockreoutingfn = profanityFunctionForImage({
      ...mockImageModerationOn,
      textPnFnStatusdata: mockBlockReoutingAutomationOn,
    });
    expect(typeof blockreoutingfn).toBe("string");

    const maskreoutingfn = profanityFunctionForImage({
      ...mockImageModerationOn,
      textPnFnStatusdata: mockMaskReoutingAutomationOn,
    });
    expect(typeof maskreoutingfn).toBe("string");

    const maskfn = profanityFunctionForImage({
      ...mockImageModerationOn,
      textPnFnStatusdata: mockMaskAutomationOn,
    });
    expect(typeof maskfn).toBe("string");

    const promiseReturn = profanityFunctionForImage({
      ...mockImageModerationOn,
      textPnFnStatusdata: mockWithoutMaskandBannedAutoOn,
    });
    expect(typeof promiseReturn).toBe("string");
  });

  test("check image Reouting toggle on and text word and auto moderation toggle on", () => {
    const bannedWordfn = profanityFunctionForImage({
      ...mockImageModerationReoute,
      textPnFnStatusdata: mockBannedWordProfanityOn,
    });
    expect(typeof bannedWordfn).toBe("string");

    const bannedReouteWordfn = profanityFunctionForImage({
      ...mockImageModerationReoute,
      textPnFnStatusdata: mockBannedReouteWordProfanityOn,
    });
    expect(typeof bannedReouteWordfn).toBe("string");

    const maskReouteWordfn = profanityFunctionForImage({
      ...mockImageModerationReoute,
      textPnFnStatusdata: mockMaskReouteWordProfanityOn,
    });
    expect(typeof maskReouteWordfn).toBe("string");

    const maskWordfn = profanityFunctionForImage({
      ...mockImageModerationReoute,
      textPnFnStatusdata: mockMasktWordProfanityOn,
    });
    expect(typeof maskWordfn).toBe("string");

    const blockfn = profanityFunctionForImage({
      ...mockImageModerationReoute,
      textPnFnStatusdata: mockBlockAutomationOn,
    });
    expect(typeof blockfn).toBe("string");

    const blockreoutingfn = profanityFunctionForImage({
      ...mockImageModerationReoute,
      textPnFnStatusdata: mockBlockReoutingAutomationOn,
    });
    expect(typeof blockreoutingfn).toBe("string");

    const maskreoutingfn = profanityFunctionForImage({
      ...mockImageModerationReoute,
      textPnFnStatusdata: mockMaskReoutingAutomationOn,
    });
    expect(typeof maskreoutingfn).toBe("string");

    const maskfn = profanityFunctionForImage({
      ...mockImageModerationReoute,
      textPnFnStatusdata: mockMaskAutomationOn,
    });
    expect(typeof maskfn).toBe("string");
  });
});
