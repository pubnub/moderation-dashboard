import { constantBoolean } from '../helpers';
import { getSelectedDetectionTool } from './index';

const regexForBanned = `"\\b(banned)\\b"`.replace(/\\/g, '\\\\');

export function FilterConditionForAutomatic(
  textPnFnStatusdata,
  type = 'default'
) {
  let automaticDetectionModType,
    automaticDetectionReRouteMessages,
    automaticDetectionCharacterToMaskWith,
    selectedDetectionTool;

  if (type === 'default') {
    ({
      automaticDetectionModType,
      automaticDetectionReRouteMessages,
      automaticDetectionCharacterToMaskWith,
    } = textPnFnStatusdata);
    selectedDetectionTool = getSelectedDetectionTool(textPnFnStatusdata);
  } else {
    ({
      automaticDetectionModType,
      automaticDetectionReRouteMessages,
      automaticDetectionCharacterToMaskWith,
    } = textPnFnStatusdata.automaticDetection);
    selectedDetectionTool = getSelectedDetectionTool(
      textPnFnStatusdata.automaticDetection
    );
  }

  const checkForAutomaticMaskMessage =
    automaticDetectionModType === 'mask-message';
  const checkForAutomaticBlockMessage =
    automaticDetectionModType === 'block-message';
  const checkForAutomaticReRouteMessages = constantBoolean(
    automaticDetectionReRouteMessages
  );

  if (checkForAutomaticMaskMessage) {
    if (checkForAutomaticReRouteMessages) {
      return automaticMaskMessageAndReroute({
        selectedDetectionTool,
        automaticDetectionCharacterToMaskWith,
        type,
      });
    }
    return automaticMaskMessage({
      selectedDetectionTool,
      automaticDetectionCharacterToMaskWith,
      type,
    });
  }

  if (checkForAutomaticBlockMessage) {
    if (checkForAutomaticReRouteMessages) {
      return automaticBlockMessageAndReroute({
        selectedDetectionTool,
        type,
      });
    }
    return automaticBlockMessage({
      selectedDetectionTool,
      type,
    });
  }

  if (type === 'default') {
    return `if(request && request.ok){
      return request.ok()
    }`;
  }

  return `return Promise.resolve(false)`;
}

function automaticMaskMessage({
  selectedDetectionTool,
  automaticDetectionCharacterToMaskWith,
  type,
}) {
  if (type === 'default') {
    return `if(request && request.ok){
    const xhr = require("xhr");
    const console = require('console');
    var bannedChannel = new RegExp(${regexForBanned}, "g")
    let message = request.message;
  
    if(bannedChannel.test(request.channels[0])){
       request.message.type = "text";
       console.log('Skipping moderation on message sent to banned channel: ' + request.channels[0]);
       return request.ok(message);
     }
  
     ${selectedDetectionTool}
    if(checkThresholdForThirdParty){
               message.text = message.text.replace(/[a-z-A-Z-!]/g, '${automaticDetectionCharacterToMaskWith}');
              return request.ok(message);
          }
         request.message.type = "text"
         return request.ok(message);
  
     }).catch(err => {
         var thirdPartyResponse = { error: err };
         Object.assign(message, { thirdPartyResponse });
  
         return request.ok(message);
     });
      }`;
  }

  // using image modertaion
  return `return new Promise((resolve, reject) => {
    ${selectedDetectionTool}
    if(checkThresholdForThirdParty){
        message.text = message.text.replace(/[a-z-A-Z-!]/g, '${automaticDetectionCharacterToMaskWith}');
        return resolve(true);
    }
    message.type = "text"
    return resolve(true);
    }).catch(err => {
      var thirdPartyResponse = { error: err };
      Object.assign(message, { thirdPartyResponse });
      return reject(message);
  })
   })`;
}

function automaticMaskMessageAndReroute({
  selectedDetectionTool,
  automaticDetectionCharacterToMaskWith,
  type,
}) {
  if (type === 'default') {
    return `if(request && request.ok){
    const pubnub = require('pubnub');
    const bannedChannel = new RegExp(${regexForBanned}, "g")
    const console = require('console');
    let message = request.message;
 
    if(bannedChannel.test(request.channels[0])){
       request.message.type = "text";
       console.log('Skipping moderation on message sent to banned channel: '  + request.channels[0]);
       return request.ok(message);
    }
 
    const xhr = require("xhr");
    ${selectedDetectionTool}
    if(checkThresholdForThirdParty){
 
             var originalMessage = request.message.text;
             const moderatedMessage = message.text.replace(/[a-z-A-Z-!]/g, '${automaticDetectionCharacterToMaskWith}');
             let payload = {"type":"text", originalMessage, moderatedMessage};
             if (reasons && reasons.length) {
               payload.reason = reasons.join(", ");
             }
              pubnub.publish({
              "channel": 'banned.'+request.channels[0],
              "message": payload
              }).then((publishResponse) => {
                console.log('Sending original message to banned.' + request.channels[0]);
                console.log(publishResponse)
              }).catch((err) => {
                  console.error(err);
              });
             message.type = 'text';
             message.text = moderatedMessage;
             console.log('Sending moderated message to channel: ' + request.channels[0]);
             return request.ok(message);
         }
        request.message.type = "text"
        return request.ok(message);
 
    }).catch(err => {
        var thirdPartyResponse = { error: err };
        Object.assign(message, { thirdPartyResponse });
 
        return request.ok(message);
    });
 
     }`;
  }

  // using image modertaion
  return `return new Promise((resolve, reject) => {
    ${selectedDetectionTool}
    if(checkThresholdForThirdParty){
      originalMessage = message.text;
      moderatedMessage = message.text.replace(/[a-z-A-Z-!]/g, '${automaticDetectionCharacterToMaskWith}');
      message.text = moderatedMessage;
      textReouteFlag = true;
      if (reasons && reasons.length) {
        reasonForModeration = reasons.join(", ");
      }
      return resolve(true);
    }
    message.type = "text";
    return resolve(true);
    }).catch(err => {
      var thirdPartyResponse = { error: err };
      Object.assign(message, { thirdPartyResponse });
      return reject(message);
  });
   })`;
}

function automaticBlockMessage({ selectedDetectionTool, type }) {
  if (type === 'default') {
    return `if(request && request.ok){
    var bannedChannel = new RegExp(${regexForBanned}, "g");
    let message = request.message;
    const console = require('console');
    
  if(bannedChannel.test(request.channels[0])){
     request.message.type = "text";
     console.log('Skipping moderation on message sent to banned channel: '  + request.channels[0]);
     return request.ok(message);
  }
    const xhr = require("xhr");
    ${selectedDetectionTool}
    if(checkThresholdForThirdParty){
          return request.abort("moderated message");
    }
  request.message.type = "text"
  return request.ok(message);

  }).catch(err => {
      var thirdPartyResponse = { error: err };
      Object.assign(message, { thirdPartyResponse });

      return request.ok(message);
  });

   }`;
  }

  // using image modertaion
  return `return new Promise((resolve, reject) => {
    ${selectedDetectionTool}
    if(checkThresholdForThirdParty){
       textBlockedFlag = true;
       return resolve(true);
    }
    message.type = "text"
    return resolve(true);
  }).catch(err => {
    var thirdPartyResponse = { error: err };
    Object.assign(message, { thirdPartyResponse });
    return reject(message);
});
   })`;
}

function automaticBlockMessageAndReroute({ selectedDetectionTool, type }) {
  if (type === 'default') {
    return `if(request && request.ok){
    const pubnub = require('pubnub');
    var bannedChannel = new RegExp(${regexForBanned}, "g")
    let message = request.message;
    const console = require('console');
 
    if(bannedChannel.test(request.channels[0])){
       request.message.type = "text";
       console.log('Skipping moderation on message sent to banned channel: ' + request.channels[0]);
       return request.ok(message);
    }
    const xhr = require("xhr");
    ${selectedDetectionTool}
    
         if(checkThresholdForThirdParty){
              let payload = {"type":"text", originalMessage: request.message.text};
              if (reasons && reasons.length) {
                payload.reason = reasons.join(", ");
              }
               pubnub.publish({
               "channel": 'banned.'+request.channels[0],
               "message": payload
               }).then((publishResponse) => {
                 console.log('Sending original message to banned.' + request.channels[0]);
                 console.log(publishResponse)
               }).catch((err) => {
                   console.error(err);
               });
               return request.abort("moderated message");
         }
 
        request.message.type = "text"
        console.log('Sending moderated message to channel: ' + request.channels[0]);
        return request.ok(message);
 
    }).catch(err => {
        var thirdPartyResponse = { error: err };
        Object.assign(message, { thirdPartyResponse });
 
        return request.ok(message);
    });
 
     }`;
  }

  // using image modertaion
  return `return new Promise((resolve, reject) => {
    ${selectedDetectionTool}
    if(checkThresholdForThirdParty){
        originalMessage = message.text;
        textBlockedFlag = true;
        textReouteFlag = true;
        if (reasons && reasons.length) {
          reasonForModeration = reasons.join(", ");
        }
        return resolve(true);
    }
    message.type = "text"
    return resolve(true);
  }).catch(err => {
    var thirdPartyResponse = { error: err };
    Object.assign(message, { thirdPartyResponse });
    return reject(message);
});
   })`;
}
