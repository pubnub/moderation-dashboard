import axios from "../utils/axios";
import beautify from "js-beautify";

// To fetch all the PubNub accounts
export async function fetchAllAccounts(id, token) {
  const accountsResponse = await axios.get(`/accounts?user_id=${id}`, {
    headers: {
      "X-Session-Token": `${token}`,
    },
  });
  if (accountsResponse.status === 200) {
    return accountsResponse.data;
  }
  throw new Error("Failed to fetch accounts");
}

// To fetch all the Applications of an PubNub account.
export async function fetchAllApps(id, token) {
  const appsResponse = await axios.get(`/apps?owner_id=${id}`, {
    headers: {
      "X-Session-Token": `${token}`,
    },
  });
  if (appsResponse.status === 200) {
    return appsResponse.data;
  }
  throw new Error("Failed to fetch applications");
}

// To fetch all Channels of a PubNub application.
export async function getChannels(pubnub, nextPage, prevPage) {
  const channelsResponse = await pubnub.objects.getAllChannelMetadata({
    include: {
      totalCount: true,
    },
    limit: 25,
    page: {
      next: nextPage,
      prev: prevPage,
    },
    sort: { updated: "desc" },
  });
  if (channelsResponse.status === 200) {
    return channelsResponse;
  }
  throw new Error("Failed to get PubNub channels");
}

// To fetch all users of a PubNub application.
export async function getUsers(pubnub, nextPage, prevPage, filterBy) {
  const usersResponse = await pubnub.objects.getAllUUIDMetadata({
    include: {
      totalCount: true,
      customFields: true,
    },
    limit: 25,
    page: {
      next: nextPage,
      prev: prevPage,
    },
    sort: { updated: "desc" },
    filter: filterBy,
  });
  if (usersResponse.status === 200) {
    return usersResponse;
  }
  throw new Error("Failed to get PubNub users");
}

// To add channel metadata to a application keyset
export async function addChannelMetadata(pubnub, channelName, channelDescription, channel) {
  const addChannelMetadataResponse = await pubnub.objects.setChannelMetadata({
    channel,
    data: {
      name: channelName,
      description: channelDescription,
    },
  });
  if (addChannelMetadataResponse.status === 200) {
    return addChannelMetadataResponse;
  }
  throw new Error("Failed to add channel metadata");
}

// To add user metadata to a application keyset
export async function addUserMetadata(pubnub, userName, email, uuid, profileUrl) {
  if (!email) email = null;
  if (!profileUrl) profileUrl = null;
  const addUserMetadataResponse = await pubnub.objects.setUUIDMetadata({
    uuid,
    data: {
      name: userName,
      email,
      profileUrl,
    },
  });
  if (addUserMetadataResponse.status === 200) {
    return addUserMetadataResponse;
  }
  throw new Error(addUserMetadataResponse.message);
}

// To delete channel metadata
export async function deleteChannelMetadata(pubnub, channel) {
  const deleteChannelMetadataResponse = await pubnub.objects.removeChannelMetadata({
    channel: channel,
  });
  if (deleteChannelMetadataResponse.status === 200) {
    return deleteChannelMetadataResponse;
  }
  throw new Error("Failed to add user metadata");
}

// To delete user metadata
export async function deleteUserMetadata(pubnub, uuid) {
  const deleteUserMetadataResponse = await pubnub.objects.removeUUIDMetadata({
    uuid: uuid,
  });
  if (deleteUserMetadataResponse.status === 200) {
    return deleteUserMetadataResponse;
  }
  throw new Error("Failed to add user metadata");
}

// To edit user metadata
export async function editUserMetadata(pubnub, userName, email, uuid, profileUrl) {
  if (!email) email = null;
  if (!profileUrl) profileUrl = null;
  const addUserMetadataResponse = await pubnub.objects.setUUIDMetadata({
    uuid,
    data: {
      name: userName,
      email,
      profileUrl,
    },
  });
  if (addUserMetadataResponse.status === 200) {
    return addUserMetadataResponse;
  }
  throw new Error("Failed to edit user metadata");
}

// To edit channel metadata
export async function editChannelMetadata(pubnub, channelName, channelDescription, channelID) {
  const addChannelMetadataResponse = await pubnub.objects.setChannelMetadata({
    channel: channelID,
    data: {
      name: channelName,
      description: channelDescription,
    },
  });
  if (addChannelMetadataResponse.status === 200) {
    return addChannelMetadataResponse;
  }
  throw new Error("Failed to add channel metadata");
}

//To fetch Messages
export async function fetchMessages(pubnub, channelName) {
  const msgResponse = await pubnub.fetchMessages({
    channels: [channelName],
    includeMeta: true,
    includeMessageActions: true,
    count: 100,
  });
  if (msgResponse) {
    return msgResponse.channels[channelName];
  }
  throw new Error("Failed to get messages");
}

// --------- PubNub function -----------
// To fetch all the PubNub functions of an Application.
export async function fetchPubNubFunction(keyId, token, fetchHandlerCode = false) {
  const functionResponse = await axios.get(`/v1/blocks/key/${keyId}/block`, {
    headers: {
      "X-Session-Token": `${token}`,
    },
  });
  if (functionResponse.status === 200) {
    const data = functionResponse.data;

    if (fetchHandlerCode) {
      // PubNub Portal API no longer returns event handler's code, until you ask for a specific block
      for (let block of data.payload) {
        const blockId = block.id;
        const blockResponse = await axios.get(`/v1/blocks/key/${keyId}/block/${blockId}`, {
          headers: {
            "X-Session-Token": `${token}`,
          },
        });
        block.event_handlers = blockResponse.data.payload.find(
          (p) => p.id === blockId
        ).event_handlers;
      }
    }

    return data;
  }
  throw new Error("Failed to fetch PubNub functions");
}

// Start a PubNub function.
export async function createPubNubFunction(credentials, token) {
  if (typeof credentials.code == "string") {
    // Clean up indentation of function logic before sending to PubNub
    credentials.code = beautify(credentials.code, {
      indent_size: 4,
      space_in_empty_paren: true,
    });
  }

  const response = await axios.post(`/v1/blocks/key/${credentials.key_id}/block`, credentials, {
    headers: {
      "X-Session-Token": `${token}`,
    },
  });
  if (response.status === 200) {
    return response.data;
  }
  throw new Error(response.data.message || "Something went wrong. Please try later");
}

// // Start a PubNub function.
export async function startPubNubFunction(credentials, token) {
  const response = await axios.post(
    `v1/blocks/key/${credentials.key_id}/block/${credentials.block_id}/start`,
    credentials,
    {
      headers: {
        "X-Session-Token": `${token}`,
      },
    }
  );
  if (response.status === 200) {
    return response.data;
  }
  throw new Error(response.data.error);
}

// //Stop a PubNub function
export async function stopPubNubFunction(credentials, token) {
  const response = await axios.post(
    `v1/blocks/key/${credentials.key_id}/block/${credentials.block_id}/stop`,
    credentials,
    {
      headers: {
        "X-Session-Token": `${token}`,
      },
    }
  );
  if (response.status === 200) {
    return response.data;
  }
  throw new Error(response.data.error);
}

// Create a event handler
export async function createPubNubEventHandler(credentials, token) {
  if (typeof credentials.code == "string") {
    // Clean up indentation of function logic before sending to PubNub
    credentials.code = beautify(credentials.code, {
      indent_size: 4,
      space_in_empty_paren: true,
    });
  }

  const response = await axios.post(
    `v1/blocks/key/${credentials.key_id}/event_handler`,
    credentials,
    {
      headers: {
        "X-Session-Token": `${token}`,
      },
    }
  );
  if (response.status === 200) {
    return response.data;
  }
  if (response.data.message) {
    throw new Error(response.data.message);
  } else {
    throw new Error(`PubNub create function request failed with code: ${response.status}`);
  }
}

export async function updatePubNubEventHandler(credentials, token) {
  if (typeof credentials.code == "string") {
    // Clean up indentation of function logic before sending to PubNub
    credentials.code = beautify(credentials.code, {
      indent_size: 4,
      space_in_empty_paren: true,
    });
  }

  const response = await axios.put(
    `/v1/blocks/key/${credentials.key_id}/event_handler/${credentials.id}`,
    credentials,
    {
      headers: {
        "X-Session-Token": `${token}`,
      },
    }
  );
  if (response.status === 200) {
    return response.data;
  }
  if (typeof response.data.message == "string") {
    throw new Error(response.data.message);
  } else if (typeof response.data.message.text == "string") {
    throw new Error(response.data.message.text);
  } else {
    throw new Error(`PubNub update function request failed with code: ${response.status}`);
  }
}

//To fetch user By name
export async function getUserByName(pubnub, userName) {
  const usersResponse = await pubnub.objects.getAllUUIDMetadata({
    filter: `name LIKE '*${userName}*'`,
  });
  if (usersResponse.status === 200) {
    return usersResponse.data;
  }
  throw new Error("Failed to get PubNub users");
}

//To fetch channel By name
export async function getChannelByName(pubnub, channelName) {
  const usersResponse = await pubnub.objects.getAllChannelMetadata({
    filter: `name LIKE '*${channelName}*'`,
  });
  if (usersResponse.status === 200) {
    return usersResponse.data;
  }
  throw new Error("Failed to get PubNub users");
}

//To fetch channel Members
export async function getChannelMembers(pubnub, channelName, nextPage) {
  const channelMembersResponse = await pubnub.objects.getChannelMembers({
    channel: channelName,
    include: {
      UUIDFields: true,
      customUUIDFields: true,
      totalCount: true,
    },
    limit: 100,
    page: {
      next: nextPage,
    },
  });
  if (channelMembersResponse.status === 200) {
    return channelMembersResponse;
  }
  throw new Error("Failed to get PubNub channel memebers");
}

//To fetch online channel Members
export async function getOnlineMembers(pubnub, channelName) {
  const response = await pubnub.hereNow({
    channels: [channelName],
  });
  if (response) {
    return response.channels[channelName]["occupants"];
  }
  throw new Error("Failed to get PubNub online members");
}

// To fetch a channel detail
export async function fetchChannelMetadata(pubnub, channelName) {
  const channelsResponse = await pubnub.objects.getChannelMetadata({
    channel: channelName,
  });
  if (channelsResponse.status === 200) {
    return channelsResponse.data;
  }
  throw new Error("Failed to get PubNub channel");
}

//To fetch Total messages count of today
export async function getMessagesCount(pubnub, channelName, midnightTimeToken) {
  const response = await pubnub.messageCounts({
    channels: [channelName],
    channelTimetokens: [midnightTimeToken],
  });
  if (response) {
    return response.channels && response.channels[channelName];
  }
  throw new Error("Failed to get total messages Count");
}

// To get number of online users in a channel
export async function getChannelsOccupancy(pubnub, channelsArray) {
  const response = await pubnub.hereNow({
    channels: channelsArray,
    includeUUIDs: false,
    includeState: false,
  });
  if (response) {
    return response.channels || [];
  }
  throw new Error("Failed to get online users");
}

//To check if channel already exists
export async function checkChannelExistence(pubnub, channel) {
  const response = await pubnub.objects.getAllChannelMetadata({
    filter: 'id == "' + channel + '"',
  });
  if (response.status === 200) {
    return response.data;
  }
  throw new Error("Failed to get PubNub channel");
}

//To check if user ID already exists
export async function checkUserIDExistence(pubnub, userID) {
  const response = await pubnub.objects.getAllUUIDMetadata({
    filter: 'id == "' + userID + '"',
  });
  if (response.status === 200) {
    return response.data;
  }
  throw new Error("Failed to get PubNub user");
}

//To delete a message
export async function softDeleteMessage(pubnub, channel, messageTimetoken) {
  const response = await pubnub.addMessageAction({
    channel,
    messageTimetoken,
    action: {
      type: "deleted",
      value: ".",
    },
  });
  if (response) {
    return response.data;
  }
  throw new Error("Failed to delete the message");
}

//To undo delete action
export async function deleteMessageAction(pubnub, channel, messageTimetoken, actionTimetoken) {
  const response = await pubnub.removeMessageAction({
    channel,
    messageTimetoken,
    actionTimetoken,
  });
  if (response) {
    return response.data;
  }
  throw new Error("Failed to undo delete action");
}

//To add edit Message action
export async function addEditMessageAction(pubnub, channel, messageTimetoken, value) {
  const response = await pubnub.addMessageAction({
    channel,
    messageTimetoken,
    action: {
      type: "updated",
      value,
    },
  });
  if (response) {
    return response.data;
  }
  throw new Error("Failed to undo delete action");
}

//To set Metadata of a user
export async function setUserMetadata(pubnub, uuid, metadata) {
  const userResponse = await pubnub.objects.setUUIDMetadata({
    uuid: uuid,
    data: {
      custom: metadata,
    },
  });
  if (userResponse.status === 200) {
    return userResponse.data;
  }
  throw new Error("Failed to set metadata of PubNub user");
}
