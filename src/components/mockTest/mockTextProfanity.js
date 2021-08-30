const createMockObject = ({
  wordListProfanity = "true",
  automaticProfanity = "true",
  textModerationToggle = "true",
  wordListReRouteMessages = "true",
  wordListModType = "Block-message",
  automaticDetectionReRouteMessages = "true",
  automaticDetectionModType = "block-message",
}) => {
  return {
    wordListProfanity,
    automaticProfanity,
    textModerationToggle,
    profanityList: {
      English:
        "anal|anus|arse|ass|ballsack|balls|bastard|bitch|biatch|bloody|blowjob|blow job|bollock|bollok|boner|boob|bugger|bum|butt|buttplug|clitoris|cock|coon|crap|cunt|damn|dick|dildo|dyke|fag|feck|fellate|fellatio|felching|fuck|f u c k|fudgepacker|fudge packer|flange|Goddamn|God damn|hell|homo|jerk|jizz|knobend|knob end|labia|lmao|lmfao|muff|nigger|nigga|penis|piss|poop|prick|pube|pussy|queer|scrotum|sex|shit|s hit|sh1t|slut|smegma|spunk|tit|tosser|turd|twat|vagina|wank|whore|wtf",
      Hindi: "",
      Portugese: "",
      French: "",
      Spanish: "",
    },
    wordList: {
      applyToAllChannelIdsWordlist: "true",
      wordListReRouteMessages,
      wordListModType,
      wordListCharacterToMaskWith: "*",
      englishProfanity:
        "anal|anus|arse|ass|ballsack|balls|bastard|bitch|biatch|bloody|blowjob|blow job|bollock|bollok|boner|boob|bugger|bum|butt|buttplug|clitoris|cock|coon|crap|cunt|damn|dick|dildo|dyke|fag|feck|fellate|fellatio|felching|fuck|f u c k|fudgepacker|fudge packer|flange|Goddamn|God damn|hell|homo|jerk|jizz|knobend|knob end|labia|lmao|lmfao|muff|nigger|nigga|penis|piss|poop|prick|pube|pussy|queer|scrotum|sex|shit|s hit|sh1t|slut|smegma|spunk|tit|tosser|turd|twat|vagina|wank|whore|wtf",
      hindiProfanity: "",
      frenchProfanity: "",
      spanishProfanity: "",
      portugeseProfanity: "",
    },
    automaticDetection: {
      applyToAllChannelIdsAutomatic: "true",
      automaticDetectionReRouteMessages,
      automaticDetectionModType,
      automaticDetectionCharacterToMaskWith: "*",
      toolForAutomaticDetection: "tisane",
      siftNinjaRiskFactorThresholdVulgar: "0",
      siftNinjaRiskFactorThresholdSexting: "0",
      siftNinjaRiskFactorThresholdRacism: "0",
      siftNinjaAccountName: "1",
      siftNinjaChannelName: "sa",
      siftNinjaApiKey: "aaa",
      tisaneRiskFactorThresholdBigotry: "0.5",
      tisaneRiskFactorThresholdCyberBullying: "0.5",
      tisaneRiskFactorThresholdCriminalActivity: "0.5",
      tisaneRiskFactorThresholdSexualAdvances: "0.5",
      tisaneRiskFactorThresholdProfanity: "0.5",
      tisaneApiKey: "d9a83e99c5eb43aaba96ad58be649255",
      tisaneLanguage: "English",
    },
  };
};

export const mockTextProfanityOff = createMockObject({
  automaticProfanity: "false",
  textModerationToggle: "false",
});

export const mockMasktWordProfanityOn = createMockObject({
  automaticProfanity: "false",
  wordListReRouteMessages: "false",
  wordListModType: "Mask-word",
});

export const mockMaskReouteWordProfanityOn = createMockObject({
  automaticProfanity: "false",
  wordListModType: "Mask-word",
});

export const mockBannedWordProfanityOn = createMockObject({
  automaticProfanity: "false",
  wordListReRouteMessages: "false",
});

export const mockBannedReouteWordProfanityOn = createMockObject({
  automaticProfanity: "false",
});

export const mockBlockAutomationOn = createMockObject({
  wordListProfanity: "false",
  automaticDetectionReRouteMessages: "false",
});

export const mockBlockReoutingAutomationOn = createMockObject({
  wordListProfanity: "false",
});

export const mockMaskReoutingAutomationOn = createMockObject({
  wordListProfanity: "false",
  automaticDetectionModType: "mask-message",
});

export const mockMaskAutomationOn = createMockObject({
  wordListProfanity: "false",
  automaticDetectionModType: "mask-message",
  automaticDetectionReRouteMessages: "false",
});

export const mockWithoutMaskandBannedAutoOn = createMockObject({
  textModerationToggle: "false",
  automaticProfanity: "false",
  wordListModType: "Block-message-1",
  automaticDetectionModType: "mask-message",
  automaticDetectionReRouteMessages: "false",
});

export const mockTextModerationProps = (defaultTool = "tisane") => ({
  automaticDetection: {
    applyToAllChannelIdsAutomatic: true,
    toolForAutomaticDetection: defaultTool,
    siftNinjaRiskFactorThresholdVulgar: 0.5,
    siftNinjaRiskFactorThresholdSexting: 0.5,
    siftNinjaRiskFactorThresholdRacism: 0.5,
    siftNinjaAccountName: "",
    siftNinjaChannelName: "",
    siftNinjaApiKey: "",
    tisaneRiskFactorThresholdBigotry: 0.5,
    tisaneRiskFactorThresholdCyberBullying: 0.5,
    tisaneRiskFactorThresholdCriminalActivity: 0.5,
    tisaneRiskFactorThresholdSexualAdvances: 0.5,
    tisaneRiskFactorThresholdProfanity: 0.5,
    tisaneApiKey: "",
    tisaneLanguage: "Hindi",
    automaticDetectionChannel: "*",
    automaticChannelError: false,
    automaticMaskCharError: false,
    automaticDetectionReRouteMessages: false,
    automaticDetectionModType: "mask-message",
    automaticDetectionCharacterToMaskWith: "*",
  },
  textModerationToggle: false,
  wordListProfanity: false,
  automaticProfanity: false,
  channelOnChange: false,
  saveLoading: false,
  initialLoading: true,
  errorStatus: false,
  successStatus: false,
  errorMsg: "",
  successMsg: "",
});

export default null;
