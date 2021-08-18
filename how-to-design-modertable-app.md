## How to design a "moderate-able" chat app

PubNub provides a flexible set of APIs for creating real time messaging applications. The Moderation Dashboard application makes some assumptions about how a chat application is designed. This section provides an overview for how to build a chat application that will work well with the moderation dashboard.

1. Users

   The user view in the moderation tool is populated via user metadata. Therefore any chat app should include logic that sets up each UUID with user object data that includes at least the field `name`. `email` and `profileUrl` can also be added by the admin in users object metadata which are optional fields

   Here is an example of a fully populated user object that can be interpreted by the dashboard.

   ```bash
   custom: { "name": "John Smith", "email": "jsmith@acme.com", "profileUrl": "https//profiles.acme.com/johnsmith"}
   ```

   Object metadata is not enabled by default. Before making calls to the PubNub Objects API, you must enabled Objects for your keyset via the Admin Portal as described in the [User Metadata documentation](https://www.pubnub.com/docs/connections/users-metadata). In order for your chat clients to be notified of changes the user's status, you must also enable "User Metadata Events" and "Channel Metadata Events" in the Admin Portal.

   ![alt text](public/readme/enable-objects.png)

   For simplicity this application sets user metadata to ban, mute, block or flag users. Chat application developers may also choose to use the PubNub Access Manager to implement muting or blocking a channel. This readme describes how a developer can inspect user object metadata in a chat app to enforce banning, muting, or blocking a user. If you wish to use PAM, you will need to modify this app to update your user’s PAM tokens accordingly. This technique is also described below.

   - Ban User: A banned user should not have any access to any channel in a chat application. Chat applications that enforce banned users via metadata should inspect a user’s metadata after they “log in” to the chat app. If the metadata includes a “ban: true” field, the application should log the user out, or otherwise prevent them from viewing or sending messages to any channels. Developers whose chat apps use PAM may wish to update the code in BanUser.js, replacing (or adding to) the call to setUserMetaData, with a call to the backend service that manages the PAM tokens, ie: https:/mypamservice.acme.com/blockUser?uuid=UUID. This interface should implement a pubnub.grant() call that sets the user's read and write permissions to false for all channels.

   - Mute User: A muted user should be allowed to see the messages in a channel, but should not be allowed to publish them. To enforce a muted user on a particular channel using the user’s metadata, inspect the mutedChannels property of the user’s metadata. If the comma separated list in the value includes the current channel, the application should provide some type of GUI that informs the user they are muted on the channel and does not allow them to publish to that channel. Developers whose chat apps use PAM may wish to update the code in UserAction.js, replacing (or adding to) the call to handleMuteClick, with a call to the backend service that manages the PAM tokens, ie: https:/mypamservice.acme.com/muteUser?uuid=UUID&channel=CHANNELID. This interface should implement a pubnub.grant() call that sets the user's write permissions to false for the channel

   - Block User: A blocked users should not be allowed to see messages or create new messages to any channels that they are blocked from. To enforce a blocked user on a particular channel using the user’s metadata, inspect the blockedChannels property of the user’s metadata. If the comma separated list in the value includes the current channel, the application should provide some type of GUI that informs the user they are blocked from the channel and does not allow them to subscribe or publish to that channel. Developers whose chat apps use PAM may wish to update the code in UserAction.js, replacing (or adding to) the call to handleMuteClick, with a call to the backend service that manages the PAM tokens, ie: https:/mypamservice.acme.com/blockUser?uuid=UUID&channel=CHANNELID. This interface should implement a pubnub.grant() call that sets the user's read and write permissions to false for the channel

2. Channels

   The channel view in the moderation tool is populated via channel metadata. Therefore any chat app should include logic that sets up each channel with channel object data that includes fields: channel and name. description can also be added by the admin in channels object metadata which is a optional field.

   Here is an example of a fully populated channel object that can be interpreted by the dashboard.

   ```bash
   custom: {
   "id": "space_bc03548bcb11eb8dcd0242c130", "name": "Besties", "description": "", "updated": "2021-08-05T07:05:30.480949Z"}
   ```

   Note: It is a best practice/encouraged that moderated channels follow a channel ID naming pattern such as “public.\*“

3. Messages

   The Moderation Dashboard provides a view that allows Admins to review messages sent over the last 24 hours, and optionally to delete or modify those messages. This functionality requires that PubNub's [Storage and Playback](https://www.pubnub.com/docs/chat/features/message-history) capability is enabled for the moderated chat application's keyset in the Admin Console. Storage is not enabled by default. After enabling storage set a retention value of 1 day (or more if your application will use stored messages in a different way).

   ![alt text](public/readme/enable-message-storage.png)

   To modify a message, a message action is added to a message with the new updated value as below:

   ```javascript
      action: {
         type: 'updated',
         value: 'Hello World! (fixed typo)',
      },
   ```

   To design a moderate-able one needs to fetch messages with message actions and check if there is a updated action added to that message.

   To delete a message, a message action is added to a message with type deleted action as below:

   ```javascript
      action: {
         type: 'deleted',
         value: '.',
      },
   ```

   To design a moderate-able one needs to fetch messages with message actions and check if there is a deleted action added to that message.

4. Automatic Moderation

   The Moderation Dashboard expects payload to be in below format for text and image moderation.

   ```json
   {
     "text": "Message with text"
   }
   ```

   Following are the formats for messages which are send through text and image moderation functions:

   - Text message:

   ```json
   {
     "message": {
       "text": "hello",
       "type": "text"
     },
     "timetoken": "16288547735385049",
     "message_type": null,
     "meta": "",
     "uuid": "userId"
   }
   ```

   - Image+text message:

   ```json
   {
     "message": {
       "message": {
         "text": "hi",
         "type": "text"
       },
       "file": {
         "url": "fileUrl",
         "name": "Screenshot.png",
         "id": "bdc547d5-1444-4763-b081-407e067f781e"
       }
     },
     "timetoken": "16288575775551984",
     "message_type": 4,
     "meta": "",
     "uuid": "userId"
   }
   ```

   - Moderated text message:

     ```json
     {
       "message": {
         "text": "***",
         "type": "text"
       },
       "timetoken": "16288559005032306",
       "message_type": null,
       "meta": "",
       "uuid": "user1"
     }
     ```

   - Masked/routed text message to banned channel:

   ```json
   {
     "message": {
       "moderatedMessage": "***",
       "type": "text",
       "originalMessage": "go to hell"
     },
     "timetoken": "16288559005165712",
     "message_type": null,
     "meta": "",
     "uuid": ""
   }
   ```

   - Banned/blocked image + masked text message to a banned channel:

   ```json
   {
     "message": {
       "message": {
         "moderatedMessage": "***",
         "type": "text",
         "originalMessage": "go to hell",
         "reason": "personal attack"
       },
       "type": "text",
       "file": {
         "url": "fileUrl",
         "reason": [
           {
             "text": "reason for blocking"
           }
         ],
         "type": "image",
         "id": "fileId",
         "name": "image.png"
       }
     },
     "timetoken": "16288568309185250",
     "message_type": null,
     "meta": "",
     "uuid": ""
   }
   ```
