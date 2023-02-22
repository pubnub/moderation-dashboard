# Moderation Dashboard

The purpose of this project is to provide an easy-to-use, open-source moderation tool for PubNub customers to deploy for their chat implementations. Developers may choose to deploy this dashboard in its current shape and form or use the project as a starting point to build moderation capabilities specific to their own requirements.

## Requirements

- [Node.js](https://nodejs.org/en/)
- [PubNub Account](https://dashboard.pubnub.com/)

## Run the project

1. Clone the GitHub repository.

   ```bash
   git clone https://github.com/pubnub/moderation-dashboard.git
   ```

1. Install the project.

   ```bash
   cd moderation-dashboard
   npm install
   ```

1. Start the project.

   ```bash
   npm start
   ```

A web browser should automatically open [http://localhost:3000](http://localhost:3000) and you can explore PubNub Moderation Dashboard.

## Intended audience

PubNub developers who are building or have built a PubNub-powered chat app.

For details on how to build a chat app that works with Moderation Dashboard, see the [Required Configuration](https://www.pubnub.com/docs/chat/moderation-dashboard/required-configuration) document.

## Capabilities

- View and modify users - via Pubnub Object metadata

- View and modify channels - via PubNub Object metadata

- Configure automatic profanity filtering using a supplied word list

- Configure advanced text moderation via a third party text moderation API

- Configure advanced image moderation via a third party image moderation API

- View channel history and modify or delete the existing messages

- View messages that were blocked or obfuscated from the automated text and image moderation

- Ban users from the app

- Mute or block users from specific channels

- Flag users for future moderation

To fully understand how Moderation Dashboard works and what moderation features it provides, read the [official documentation](https://www.pubnub.com/docs/chat/moderation-dashboard/overview).

## Modifying this application

This project is designed to provide a starting point for PubNub developers who are building chat
solutions that require moderation, and it encapsulates best practices for many common moderation
tasks. You are welcome to use this project "as is" with your chat solutions. However, since
one size never fits all, you are welcome to modify this application as needed to fit
you own needs.

Developers interested in modifying this project are encouraged to start by understanding
[the directory structure](directory-structure.md).

<sup>This application was built in partnership with [SourceFuse](https://www.sourcefuse.com/).
SourceFuse’s unique open-source coding empowers enterprise businesses with a full spectrum of
innovative, digital-first, and cloud-native solutions. At the time of this writing, SourceFuse is
the only premier PubNub development partner and specializes in leveraging PubNub in building modern
real-time applications across verticals like Healthcare, Education, Finance. For more information on
this build or other potential solutions, please contact SourceFuse’s team of experts at
hello@sourcefuse.com.</sup>
