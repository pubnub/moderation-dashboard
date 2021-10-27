import moment from "moment";

export const capitalizeFirstCharacter = (name) => {
  let words = name.split(" ");
  return words
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(" ");
};

export const accountsFromLS = () => {
  if (localStorage.getItem("PubNubAccounts")) {
    return JSON.parse(localStorage.getItem("PubNubAccounts"));
  } else {
    return false;
  }
};

export const selectedAccountsFromLS = () => {
  if (localStorage.getItem("PubNubSelectedAccount")) {
    return JSON.parse(localStorage.getItem("PubNubSelectedAccount"));
  } else {
    return false;
  }
};

export const appsFromLS = () => {
  if (localStorage.getItem("PubNubApplications")) {
    return JSON.parse(localStorage.getItem("PubNubApplications"));
  } else {
    return false;
  }
};

export const selectedAppFromLS = () => {
  if (localStorage.getItem("PubNubSelectedApp")) {
    return JSON.parse(localStorage.getItem("PubNubSelectedApp"));
  } else {
    return false;
  }
};

export const applicationsWithKeyFromLS = () => {
  if (localStorage.getItem("PubNubApplicationsWithKey")) {
    return JSON.parse(localStorage.getItem("PubNubApplicationsWithKey"));
  } else {
    return false;
  }
};

export const avatarStyle = (index, account) => {
  if (index % 5 === 0) {
    return {
      backgroundColor: "#FCF0EF",
      width: "30px",
      height: "30px",
      color: "#E66E68",
      borderRadius: "8px",
    };
  } else if (index % 3 === 0) {
    return {
      backgroundColor: "#FFFABB",
      width: "30px",
      height: "30px",
      color: "#FFD502",
      borderRadius: "8px",
    };
  } else if (index % 2 === 0) {
    return {
      backgroundColor: "#CAFFE6",
      width: "30px",
      height: "30px",
      color: "#34F89C",
      borderRadius: "8px",
    };
  } else if (index % 1 === 0) {
    return {
      backgroundColor: "#CAF0FF",
      width: "30px",
      height: "30px",
      color: "#3BC8FF",
      borderRadius: "8px",
    };
  } else if (index === account().email) {
    return {
      color: "#6387ED",
    };
  }
};

export const channelsFromLS = () => {
  if (localStorage.getItem("PubNubChannels")) {
    return JSON.parse(localStorage.getItem("PubNubChannels"));
  } else {
    return false;
  }
};

export const capitalizeNameInitials = (name) => {
  if (name) {
    let words = name.split(" "),
      initials = words[0].substring(0, 1).toUpperCase();
    if (words.length > 1) {
      initials += words[words.length - 1].substring(0, 1).toUpperCase();
      return initials;
    }
    return words[0].substring(0, 2).toUpperCase();
  }
  return false;
};

export const usersFromLS = () => {
  if (localStorage.getItem("PubNubUsers")) {
    return JSON.parse(localStorage.getItem("PubNubUsers"));
  } else {
    return false;
  }
};

export const formatDate = (date) => {
  if (date) {
    return moment(new Date(date)).format("MMMM Do YYYY, h:mm a");
  }
  return null;
};

export const truncateString = (string, index) => {
  // if (
  //   (string && string.length > 20 && index === "id") ||
  //   (string && string.length > 20 && index === "description")
  // ) {
  //   return string.substring(0, 18) + "...";
  // }
  if (string && string.length > 50) {
    return string.substring(0, 48) + "...";
  }
  return string || "-";
};

export const fetchWords = (path) => {
  return fetch(path)
    .then((r) => r.text())
    .then((text) => {
      return text;
    });
};

export const reload = () => window.location.reload();

export const showError = (errorData) => {
  if (errorData.message === "Forbidden") {
    return "Not permitted to Access manager";
  }
  if (errorData.message) {
    return "Method not allowed";
  }
  return errorData.error.message;
};

export const checkValidChannelName = (name) => {
  // eslint-disable-next-line no-useless-escape
  const characters = [",", ":", "*", "/", "\\"];
  for (let index = 0; index <= characters.length; index++) {
    if (name && name.includes(characters[index])) {
      return true;
    }
  }
  return false;
};

export const filterFunction = (data, key) => {
  if (data) return data.payload.filter((item) => item.name === `KEY-${key.id}`);
};

export const filterEventHandler = (data, block) => {
  if (data) return data.filter((item) => item.name === `BLOCK-${block[0].id}`);
};

export const filterImageFunction = (data, key) => {
  if (data) return data.payload.filter((item) => item.name === `KEY-${key.id}-IMAGE-MODERATION`);
};

export const filterImageEventHandler = (data, block) => {
  if (data) return data.filter((item) => item.name === `BLOCK-${block[0].id}-IMAGE-MODERATION`);
};

export const pnFunctionFilterStatus = (str) => {
  // eslint-disable-next-line no-new-func
  return new Function("return " + str)()();
};

export const getProfanityWordsByLanguage = (profanityList, language) => {
  return profanityList[language];
};

export const sliceTableArray = (tableData, page, rowsPerPage) => {
  if (tableData.length > rowsPerPage) {
    return tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }
  return tableData;
};

export const formatTimeToken = (timeToken) => {
  if (timeToken) return moment.unix(timeToken / 10000000).format("LT");
  return null;
};

export const capitalizeFirstLetter = (string) => {
  if (string) return string.charAt(0).toUpperCase() + string.slice(1);
  return null;
};

export const formatProfileImageUrl = (url) => {
  if (url) return url;
  return process.env.PUBLIC_URL + "/images/default-user.svg";
};

export const formatUserName = (name) => {
  if (name) return name;
  return "Unknown";
};

export const selectedChannelFromLS = () => {
  if (localStorage.getItem("PubNubSelectedChannel")) {
    return JSON.parse(localStorage.getItem("PubNubSelectedChannel"));
  } else {
    return false;
  }
};

export const truncateChannelDescription = (string) => {
  if (string && string.length > 70) {
    return string.substring(0, 68) + "...";
  }
  return string;
};

export const uuidFromLS = () => {
  if (localStorage.getItem("uuid")) {
    return JSON.parse(localStorage.getItem("uuid"));
  } else {
    return false;
  }
};

export const combineLanguageWords = (wordList) => {
  const combinedWords = Object.values(wordList).filter((item) => item.length !== 0);
  if (combinedWords.length > 0) {
    return combinedWords
      .reduce((a, c) => a + "," + c)
      .split(",")
      .join("|");
  }
  return "";
};

export function groupLanguageWords(words) {
  if (words) {
    return words
      .split(",")
      .join("|")
      .replace(/(\r\n|\n|\r)/gm, "");
  }
  return words;
}

export function constantBoolean(variable) {
  return typeof variable === "string" ? variable === "true" : variable;
}

export const lastMidnightHours = () => {
  const date = new Date();
  const timeToken = date.setHours(0, 0, 0, 0);
  return timeToken * 10000;
};

export const checkChannelMember = (member) => {
  if (member) return member.uuid.id;
  return false;
};

export const membersFromLS = () => {
  if (localStorage.getItem("PubNubChannelMembers")) {
    return JSON.parse(localStorage.getItem("PubNubChannelMembers"));
  } else {
    return false;
  }
};

export const getModeratedMessageTooltip = (message) => {
  if (message) return "Moderated message: " + message;
  return null;
};

export const getModeratedReasonTooltip = (reason) => {
  if (reason) return "Reason: " + reason;
  return null;
};

export const checkMuteStatus = (member, channel) => {
  if (
    member &&
    member.uuid.custom &&
    member.uuid.custom.mutedChannels &&
    member.uuid.custom.mutedChannels.includes(channel)
  ) {
    return true;
  }
  return false;
};

export const checkBlockStatus = (member, channel) => {
  if (
    member &&
    member.uuid.custom &&
    member.uuid.custom.blockedChannels &&
    member.uuid.custom.blockedChannels.includes(channel)
  ) {
    return true;
  }
  return false;
};

export const getMessageFileUrl = (messageObject, channelMessage, pubnub, channelID) => {
  if (
    channelMessage.message &&
    channelMessage.message.file &&
    channelMessage.message.file.id &&
    channelMessage.message.file.name &&
    !channelMessage.message.file.url
  ) {
    const url = pubnub.getFileUrl({
      channel: channelID,
      id: channelMessage.message.file.id,
      name: channelMessage.message.file.name,
    });
    messageObject.file.url = url;
  }
  return messageObject;
};

export const formatBannedMessage = (messageObject) => {
  if (messageObject.file && messageObject.file.url) messageObject.image = messageObject.file.url;

  if (messageObject.file && messageObject.file.reason)
    messageObject.imageReason = messageObject.file.reason;

  if (messageObject.message && messageObject.message.originalMessage)
    messageObject.originalMessage = messageObject.message.originalMessage;

  if (messageObject.message && messageObject.message.moderatedMessage)
    messageObject.moderatedMessage = messageObject.message.moderatedMessage;

  if (messageObject.message && messageObject.message.reason)
    messageObject.reason = messageObject.message.reason;

  return messageObject;
};

export const getMessageText = (channelMessage, messageObject) => {
  return (
    (channelMessage.actions &&
      channelMessage.actions.updated &&
      Object.keys(channelMessage.actions.updated)[0]) ||
    messageObject.text ||
    (messageObject.message && messageObject.message.text)
  );
};
