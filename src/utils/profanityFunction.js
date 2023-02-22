import { groupLanguageWords, constantBoolean } from "./helpers";

import { FilterConditionForWordList } from "./wordlist/index";
import { FilterConditionForAutomatic } from "./automaticTextModeration/filterConditionForAutomatic";

export default function profanityFunction(data) {
  const {
    wordListModType,
    wordListReRouteMessages,
    applyToAllChannelIdsWordlist,
    applyToAllChannelIdsAutomatic,
    wordListCharacterToMaskWith,
    automaticDetectionModType,
    automaticDetectionReRouteMessages,
    automaticDetectionCharacterToMaskWith,
    toolForAutomaticDetection,
    siftNinjaRiskFactorThresholdVulgar,
    siftNinjaRiskFactorThresholdSexting,
    siftNinjaRiskFactorThresholdRacism,
    siftNinjaAccountName,
    siftNinjaChannelName,
    siftNinjaApiKey,
    wordListProfanity,
    automaticProfanity,
    textModerationToggle,
    tisaneRiskFactorThresholdBigotry,
    tisaneRiskFactorThresholdCyberBullying,
    tisaneRiskFactorThresholdCriminalActivity,
    tisaneRiskFactorThresholdSexualAdvances,
    tisaneRiskFactorThresholdProfanity,
    tisaneApiKey,
    tisaneLanguage,
  } = data;

  let english = data.profanityList["English"];
  let hindi = data.profanityList["Hindi"];
  let spanish = data.profanityList["Spanish"];
  let french = data.profanityList["French"];
  let portugese = data.profanityList["Portugese"];

  function noProfanityFilterSelected() {
    return `if(request && request.ok){
        return request.ok();
    }`;
  }

  const checkForWordListProfanity =
    constantBoolean(wordListProfanity) && constantBoolean(textModerationToggle);

  const checkForAutomaticProfanity =
    constantBoolean(automaticProfanity) && constantBoolean(textModerationToggle);

  const filterConditions = () => {
    if (checkForWordListProfanity) {
      return FilterConditionForWordList(data);
    } else if (checkForAutomaticProfanity) {
      return FilterConditionForAutomatic(data);
    } else {
      return noProfanityFilterSelected();
    }
  };

  return `function runProfanity(request){
     ${filterConditions()}
     return {
       wordListProfanity: '${wordListProfanity}',
       automaticProfanity: '${automaticProfanity}',
       textModerationToggle: '${textModerationToggle}',
       wordList:{
         applyToAllChannelIdsWordlist:'${applyToAllChannelIdsWordlist}',
         wordListReRouteMessages: '${wordListReRouteMessages}',
         wordListModType: '${wordListModType}',
         wordListCharacterToMaskWith:'${wordListCharacterToMaskWith}',
         englishProfanity:'${groupLanguageWords(english)}',
         hindiProfanity: '${groupLanguageWords(hindi)}',
         frenchProfanity: '${groupLanguageWords(french)}',
         spanishProfanity: '${groupLanguageWords(spanish)}',
         portugeseProfanity: '${groupLanguageWords(portugese)}'
       },
       automaticDetection:{
         applyToAllChannelIdsAutomatic: '${applyToAllChannelIdsAutomatic}',
         automaticDetectionReRouteMessages: '${automaticDetectionReRouteMessages}',
         automaticDetectionModType: '${automaticDetectionModType}',
         automaticDetectionCharacterToMaskWith:'${automaticDetectionCharacterToMaskWith}',
         toolForAutomaticDetection:'${toolForAutomaticDetection}',
         siftNinjaRiskFactorThresholdVulgar:'${siftNinjaRiskFactorThresholdVulgar}',
         siftNinjaRiskFactorThresholdSexting:'${siftNinjaRiskFactorThresholdSexting}',
         siftNinjaRiskFactorThresholdRacism:'${siftNinjaRiskFactorThresholdRacism}',
         siftNinjaAccountName:'${siftNinjaAccountName}',
         siftNinjaChannelName:'${siftNinjaChannelName}',
         siftNinjaApiKey:'${siftNinjaApiKey}',
         tisaneRiskFactorThresholdBigotry:'${tisaneRiskFactorThresholdBigotry}',
         tisaneRiskFactorThresholdCyberBullying:'${tisaneRiskFactorThresholdCyberBullying}',
         tisaneRiskFactorThresholdCriminalActivity:'${tisaneRiskFactorThresholdCriminalActivity}',
         tisaneRiskFactorThresholdSexualAdvances:'${tisaneRiskFactorThresholdSexualAdvances}',
         tisaneRiskFactorThresholdProfanity:'${tisaneRiskFactorThresholdProfanity}',
         tisaneApiKey:'${tisaneApiKey}',
         tisaneLanguage:'${tisaneLanguage}'
       },
     };
  }`;
}
