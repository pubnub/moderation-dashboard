# PUBNUB MODERATION TOOL

The purpose of this project is to provide an easy-to-use moderation tool (under open source
license) for PubNub customers to deploy for their chat implementations. Developers may choose to deploy this dashboard as-is for their applications, or leverage the project as a starting point to build moderation capabilities specific to their own requirements.

## Requirements

- [Node.js](https://nodejs.org/en/)
- [PubNub Account](https://dashboard.pubnub.com/)

## Running the project

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

   A web browser should automatically open [http://localhost:3000](http://localhost:3000), and you can explore the moderation dashboard. 

## Intended audience

PubNub developers who are building or have built a PubNub powered chat app.

For details on how to build a chat app that works with this Moderation Dashboard see [How to design a "moderate-able" chat app](how-to-design-modertable-app.md).

## [Capabilities](what-it-does.md)

- View and Modify Users - via Pubnub Object metadata

- View and Modify Channels - via PubNub Object metadata

- Configure automatic profanity filtering using a supplied word list

- Configure advanced text moderation via a third party text moderation API ([3rd party account required](working-with-third-parties.md))

- Configure advanced image moderation via a third party image moderation API ([3rd party account required](working-with-third-parties.md))

- View Channel History as an Admin and modify or delete existing messages

- View messages that were blocked or obfuscated from the automated text and image moderation

- Ban Users from the app

- Mute or Block users from specific channels

- Flag users for future moderation

## Modifying this application

This project is designed to provide a starting point for PubNub developers who are building chat solutions that require moderation, and it encapsulates best practices for many common moderation tasks. Developers are welcome to use this project "as is" with their chat solutions, however, since one size never fits all, developers are also welcome to modify this application as needed to fit their own needs.

Developers interested in modifying this project are encouraged to start by understanding [the directory structure](directory-structure.md)

<sup>This application was built in partnership with [SourceFuse](https://www.sourcefuse.com/). SourceFuse’s unique open source coding empowers enterprise businesses with a full spectrum of innovative, digital-first, and cloud-native solutions. At the time of this writing, SourceFuse is the only premier PubNub development partner and specializes in leveraging PubNub in building modern real time applications across verticals like Healthcare, Education, Finance. For more information on this build or other potential solutions, please contact SourceFuse’s team of experts at hello@sourcefuse.com.</sup>
