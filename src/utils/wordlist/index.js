import { combineLanguageWords, constantBoolean } from '../helpers';

const regexForBanned = `"\\b(banned)\\b"`.replace(/\\/g, '\\\\');

export function FilterConditionForWordList(
  textPnFnStatusdata,
  type = 'default'
) {
  let  wordListCharacterToMaskWith, wordListModType,wordListReRouteMessages,
  englishProfanity,hindiProfanity,frenchProfanity,spanishProfanity,portugeseProfanity;
  if (type === 'default'){
    ({
      wordListCharacterToMaskWith,
      wordListModType,
      wordListReRouteMessages,
      englishProfanity,
      hindiProfanity,
      frenchProfanity,
      spanishProfanity,
      portugeseProfanity,
    } = textPnFnStatusdata);
  }else {
    ({
      wordListCharacterToMaskWith,
      wordListModType,
      wordListReRouteMessages,
      englishProfanity,
      hindiProfanity,
      frenchProfanity,
      spanishProfanity,
      portugeseProfanity,
    } = textPnFnStatusdata.wordList);
  }
  

  const checkForWordListMaskWord = wordListModType === 'Mask-word';
  const checkForWordListBlockMessage = wordListModType === 'Block-message';
  const checkForWordListReRouteMessages = constantBoolean(
    wordListReRouteMessages
  );
  let profanityList = {};
  if (textPnFnStatusdata.profanityList) {
    profanityList = textPnFnStatusdata.profanityList;
  }else{
    profanityList = {
      English: englishProfanity.split('|').join(','),
      Hindi: hindiProfanity.split('|').join(','),
      Portugese: portugeseProfanity.split('|').join(','),
      French: frenchProfanity.split('|').join(','),
      Spanish: spanishProfanity.split('|').join(','),
    };
  }
 

  let swearWords = combineLanguageWords(profanityList).replace(
    /(\r\n|\n|\r)/gm,
    ''
  );
  let regex = `"\\b(${swearWords})\\b"`.replace(/\\/g, '\\\\');

  if (checkForWordListMaskWord) {
    if (checkForWordListReRouteMessages) {
      return wordListMaskWordsAndReroute({
        regex,
        wordListCharacterToMaskWith,
        type,
      });
    }
    return wordListMaskWords({ regex, wordListCharacterToMaskWith, type });
  }

  if (checkForWordListBlockMessage) {
    if (checkForWordListReRouteMessages) {
      return wordListBlockMessageAndReroute({ regex, type });
    }
    return wordListBlockMessage({ regex, type });
  }

  if (type === 'default') {
    return `if(request && request.ok){
        return request.ok()
      }`;
  }

  return `return Promise.resolve(false)`;
}

function wordListMaskWords({ regex, wordListCharacterToMaskWith, type }) {
  if (type === 'default') {
    return `if (request && request.ok) {
      var badWords = new RegExp(${regex}, "g")
      var bannedChannel = new RegExp(${regexForBanned}, "g")
      if (
        request.message &&
        request.message.text &&
        badWords.test(request.message.text) &&
        !bannedChannel.test(request.channels[0])
      ) {
        var newString = request.message.text;
        newString = newString.replace(badWords, '${wordListCharacterToMaskWith.repeat(
          3
        )}');
        request.message.text = newString;
        return request.ok();
      }
        request.message.type = "text"
        return request.ok();
     }`;
  }

  // using image modertaion
  return `return new Promise((resolve, reject) => {
    const badWords = new RegExp(${regex}, "g");
    if (
      message &&
      message.text &&
      badWords.test(message.text)
    ) {
      let newString = message.text;
      newString = newString.replace(badWords, '${wordListCharacterToMaskWith.repeat(
        3
      )}');
      message.text = newString;
      return resolve(true)
    }
    message.type = "text"
      return resolve(true)
   })`;
}

function wordListMaskWordsAndReroute({
  regex,
  wordListCharacterToMaskWith,
  type,
}) {
  if (type === 'default') {
    return `
  if (request && request.ok) {
    const pubnub = require('pubnub');
    var badWords = new RegExp(${regex}, "g")
    var bannedChannel = new RegExp(${regexForBanned}, "g")
    if (
      request.message &&
      request.message.text &&
      badWords.test(request.message.text) &&
      !bannedChannel.test(request.channels[0])
    ) {
      var originalMessage = request.message.text
      const moderatedMessage = originalMessage.replace(badWords, '${wordListCharacterToMaskWith.repeat(
        3
      )}');
      request.message.text = moderatedMessage;
      pubnub.publish({
      "channel": 'banned.'+request.channels[0],
      "message":{ "type":"text", originalMessage, moderatedMessage }
      }).then((publishResponse) => {
        console.log(publishResponse)
      }).catch((err) => {
          console.error(err);
      });
    }
      request.message.type = "text"
      return request.ok();
   }`;
  }

  // using image modertaion
  return `return new Promise((resolve, reject) => {
    const badWords = new RegExp(${regex}, "g");
    if (
      message &&
      message.text &&
      badWords.test(message.text)
    ) {
      originalMessage = message.text
      moderatedMessage = originalMessage.replace(badWords, '${wordListCharacterToMaskWith.repeat(
        3
      )}');
      message.text = moderatedMessage;
      textReouteFlag = true;
      return resolve(true)
    }
    message.type = "text"
      return resolve(true)
   })`;
}

function wordListBlockMessage({ regex, type }) {
  if (type === 'default') {
    return `if (request && request.ok) {
    var badWords = new RegExp(${regex}, "g")
    var bannedChannel = new RegExp(${regexForBanned}, "g")
    if(badWords.test(request["message"]["text"]) && !bannedChannel.test(request.channels[0])) {
       return request.abort("moderated message");
   }
      request.message.type = "text"
      return request.ok();
  }`;
  }

  // using image modertaion
  return `return new Promise((resolve, reject) => {
    const badWords = new RegExp(${regex}, "g");
    if (
      message &&
      message.text &&
      badWords.test(message.text)
    ) {
      textBlockedFlag = true;
      return resolve(true)
    }
    message.type = "text"
      return resolve(true)
   })`;
}

function wordListBlockMessageAndReroute({ regex, type }) {
  if (type === 'default') {
    return `if (request && request.ok) {
    const pubnub = require('pubnub');
    var badWords = new RegExp(${regex}, "g")
    var bannedChannel = new RegExp(${regexForBanned}, "g")
    if(badWords.test(request["message"]["text"]) && !bannedChannel.test(request.channels[0])) {
      pubnub.publish({
      "channel": 'banned.'+request.channels[0],
      "message": { originalMessage: request.message.text, "type":"text" }
      }).then((publishResponse) => {
        console.log(publishResponse)
      }).catch((err) => {
          console.error(err);
      });
       return request.abort("moderated message");
   }
      request.message.type = "text"
      return request.ok();
  }`;
  }

  // using image modertaion
  return `return new Promise((resolve, reject) => {
    const badWords = new RegExp(${regex}, "g");
    if (
      message &&
      message.text &&
      badWords.test(message.text)
    ) {
      originalMessage = message.text;
      textBlockedFlag = true;
      textReouteFlag = true;
      return resolve(true);
    }
    message.type = "text"
      return resolve(true);
   })`;
}
