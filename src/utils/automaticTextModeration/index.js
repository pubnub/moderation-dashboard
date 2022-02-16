export const getSelectedDetectionTool = (data) => {
  if (data.toolForAutomaticDetection === "tisane") {
    const selectedLanguage = getSelectedLanguage(data.tisaneLanguage);
    return `const apiKey = '${data.tisaneApiKey}';
      const abuseTypes = ['bigotry', 'personal_attack', 'criminal_activity', 'sexual_advances', 'profanity'];
      const serverityTypeObject = {
        extreme:0.25,
        high:0.50,
        medium:0.75,
        low:1,
        none:0
      };
      const abuseTypeObject = {
        bigotry:${data.tisaneRiskFactorThresholdBigotry},
        criminal_activity:${data.tisaneRiskFactorThresholdCriminalActivity},
        sexual_advances:${data.tisaneRiskFactorThresholdSexualAdvances},
        personal_attack:${data.tisaneRiskFactorThresholdCyberBullying},
        profanity:${data.tisaneRiskFactorThresholdProfanity}
      };
      const url = "https://api.tisane.ai/parse";
      const http_options = {
        "method": "POST",
        "headers": {
          "Ocp-Apim-Subscription-Key": apiKey
        },
        "body": JSON.stringify({
          "language": "${selectedLanguage}", // or whatever language you use
          "content": message.text,
          "settings": {"snippets": true, "format":"dialogue"}
        }),
        "timeout" : 5000
    };

    return xhr.fetch(url, http_options).then(response => {

      const body = JSON.parse(response.body);
      const thirdPartyResponse = (response.status === 200 ? body : { error: body });
      let checkThresholdForThirdParty = false;
      const reasons = [];
      const serverityTypes = [];

      // Check each abuse type returned against the threshold
      if (thirdPartyResponse.abuse && Array.isArray(thirdPartyResponse.abuse) && thirdPartyResponse.abuse.length) {
        console.log('text moderation abuse analysis: ', thirdPartyResponse.abuse);
        thirdPartyResponse.abuse.forEach((element)=>{
          serverityTypes.push(element.severity);
          if (abuseTypeObject[element.type] !== 0) {
            if (abuseTypes.includes(element.type) && abuseTypeObject[element.type] >= serverityTypeObject[element.severity]) {
              const abuse = element.type.replace(/_/g, ' ');
              reasons.push(abuse+'; '+ element.severity);
              if (!checkThresholdForThirdParty) {
                console.log("Message was flagged by automatic text moderation.");
                checkThresholdForThirdParty = true;
              }
            }
          }
        });
      }`;
  }
  return `const accountName = '${data.siftNinjaAccountName}';
  const channelName = '${data.siftNinjaChannelName}';
  const apiKey = '${data.siftNinjaApiKey}'
  const basicAuth = require('codec/auth');
  const authorization = basicAuth.basic(accountName + '/' + channelName,apiKey);
  const http_options = {
    "method": "POST",
    "headers": {
        "Content-Type": "application/json",
        "Authorization": authorization
    },
    "body": JSON.stringify({
        "text": message.text,
        "user_id": message.user_id,
        "user_display_name": message.user_display_name
    })
  };
  const reasons = [];
  const url = "https://" + accountName + ".siftninja.com/api/v1/channel/" + channelName + "/sifted_data";
  return xhr.fetch(url, http_options).then(response => {

  var body = JSON.parse(response.body);
  var thirdPartyResponse = (response.status === 200 ? body : { error: body });

  const vulgarity = thirdPartyResponse.tags.vulgar === null?0:thirdPartyResponse.tags.vulgar;
  const racist = thirdPartyResponse.tags.racist === null?0:thirdPartyResponse.tags.racist;
  const sexting = thirdPartyResponse.tags.sexting === null?0:thirdPartyResponse.tags.sexting;

  console.log('Vulgarity score :', vulgarity, 'Racism score :', racist, 'Sexting score :', sexting);

  const checkThresholdForThirdParty = vulgarity>'${data.siftNinjaRiskFactorThresholdVulgar}'
  || racist>'${data.siftNinjaRiskFactorThresholdRacism}'
  || sexting>'${data.siftNinjaRiskFactorThresholdSexting}';`;
};

const getSelectedLanguage = (language) => {
  const languages = {
    Autodetect: "*",
    English: "en",
    Spanish: "es",
    Portugese: "pt",
    French: "fr",
  };
  return languages[language];
};
