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
} from "../../mockTest/mockTextProfanity";

import profanityFunction from "../../../utils/profanityFunction";

describe("check text moderation function", () => {
  test("check for text modertaion off", () => {
    const fn = profanityFunction(mockTextProfanityOff);
    expect(typeof fn).toBe("string");
    expect(fn).toContain(`applyToAllChannelIdsWordlist`);
  });

  test("check for word text modertaion on", () => {
    const maskwordFn = profanityFunction(mockMasktWordProfanityOn);
    expect(typeof maskwordFn).toBe("string");

    const maskReoutewordFn = profanityFunction(mockMaskReouteWordProfanityOn);
    expect(typeof maskReoutewordFn).toBe("string");

    const bannedwordFn = profanityFunction(mockBannedWordProfanityOn);
    expect(typeof bannedwordFn).toBe("string");

    const bannedReoutewordFn = profanityFunction(mockBannedReouteWordProfanityOn);
    expect(typeof bannedReoutewordFn).toBe("string");
  });

  test("check for auto text modertaion on", () => {
    const maskFn = profanityFunction(mockMaskAutomationOn);
    expect(typeof maskFn).toBe("string");
    expect(maskFn).toContain(`automaticProfanity: 'true'`);

    const maskReouteFn = profanityFunction(mockMaskReoutingAutomationOn);
    expect(typeof maskReouteFn).toBe("string");

    const blockFn = profanityFunction(mockBlockAutomationOn);
    expect(typeof blockFn).toBe("string");

    const blockReouteFn = profanityFunction(mockBlockReoutingAutomationOn);
    expect(typeof blockReouteFn).toBe("string");
  });
});
