import PubNub from "pubnub";
import {
  capitalizeFirstCharacter,
  accountsFromLS,
  selectedAccountsFromLS,
  appsFromLS,
  selectedAppFromLS,
  applicationsWithKeyFromLS,
  avatarStyle,
  channelsFromLS,
  capitalizeNameInitials,
  usersFromLS,
  formatDate,
  truncateString,
  showError,
  checkValidChannelName,
  filterFunction,
  filterEventHandler,
  filterImageFunction,
  filterImageEventHandler,
  getProfanityWordsByLanguage,
  sliceTableArray,
  formatTimeToken,
  capitalizeFirstLetter,
  formatProfileImageUrl,
  formatUserName,
  selectedChannelFromLS,
  truncateChannelDescription,
  uuidFromLS,
  combineLanguageWords,
  groupLanguageWords,
  constantBoolean,
  checkChannelMember,
  membersFromLS,
  getModeratedMessageTooltip,
  getModeratedReasonTooltip,
  fetchWords,
  pnFunctionFilterStatus,
  checkMuteStatus,
  checkBlockStatus,
  getMessageFileUrl,
  formatBannedMessage,
  getMessageText,
} from "../../../utils/helpers";
import {
  mockPubnubAccounts,
  mockPubnubChannelMembers,
  mockUuid,
  mockPubNubSelectedChannel,
  mockPubNubApplications,
  mockPubNubUsers,
  mockChannels,
} from "../../mockTest/mockPubnubAccounts";

let pubnub = new PubNub({
  subscribeKey: "SUBSCRIBE_KEY",
  publishKey: "PUBLISH_KEY",
});
jest.mock("pubnub", () =>
  jest.fn().mockImplementation(() => ({
    getFileUrl: jest.fn(),
  }))
);

describe("Test Cases For Helper", () => {
  afterAll(() => {
    jest.resetAllMocks();
    localStorage.clear();
    fetch.mockClear();
  });

  test("check for capitalize First Character", () => {
    const name = "abc xyz";
    const result = capitalizeFirstCharacter(name);
    expect(result).toEqual("Abc Xyz");
  });

  test("check for accounts from local storage", () => {
    const result = accountsFromLS();
    expect(result).toBe(false);
    localStorage.setItem("PubNubAccounts", JSON.stringify(mockPubnubAccounts));
    const detail = accountsFromLS();
    expect(detail).toMatchObject(mockPubnubAccounts);
  });

  test("check for reason and tooltip", () => {
    const reason = getModeratedReasonTooltip("personal attack");
    expect(reason).toBe("Reason: personal attack");
    expect(getModeratedReasonTooltip(null)).toBeNull();

    const msg = getModeratedMessageTooltip("hi");
    expect(msg).toBe("Moderated message: hi");
    expect(getModeratedMessageTooltip(null)).toBeNull();
  });

  test("check for pubnubChannelMembers, selectedChannel and uuid from local storage", () => {
    const member = membersFromLS();
    expect(member).toBe(false);
    localStorage.setItem("PubNubChannelMembers", JSON.stringify(mockPubnubChannelMembers));
    const newMember = membersFromLS();
    expect(newMember).toMatchObject(mockPubnubChannelMembers);

    const uuid = uuidFromLS();
    expect(uuid).toBe(false);
    localStorage.setItem("uuid", JSON.stringify(mockUuid));
    const newUuId = uuidFromLS();
    expect(newUuId).toBe(mockUuid);

    const channleId = selectedChannelFromLS();
    expect(channleId).toBe(false);
    localStorage.setItem("PubNubSelectedChannel", JSON.stringify(mockPubNubSelectedChannel));
    const newChannleId = selectedChannelFromLS();
    expect(newChannleId).toBe(mockPubNubSelectedChannel);
  });

  test("check for channel member id", () => {
    const result = checkChannelMember(0);
    expect(result).toBe(false);
    const detail = checkChannelMember({ uuid: { id: 1 } });
    expect(detail).toBe(1);
  });

  test("check for constant Boolean", () => {
    const result = constantBoolean("false");
    expect(result).toBe(false);
    const detail = constantBoolean("true");
    expect(detail).toBe(true);
    const num = constantBoolean(4);
    expect(num).toBe(4);
  });

  test("check for group Language Words, combineLanguageWords, truncateChannelDescription", () => {
    const result = groupLanguageWords("shit,kutta");
    expect(result).toBe("shit|kutta");
    expect(groupLanguageWords(null)).toBeNull();

    const detail = combineLanguageWords(["anal,anus,arse,ass,ballsack"]);
    expect(detail).toBe("anal|anus|arse|ass|ballsack");
    expect(combineLanguageWords("")).toBe("");
    expect(combineLanguageWords("a,b")).toBe("a|||b");

    const des = truncateChannelDescription(
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."
    );
    expect(des).toBe("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean com...");

    expect(
      truncateChannelDescription("Lorem ipsum dolor sit amet, consectetuer adipiscing elit.")
    ).toBe("Lorem ipsum dolor sit amet, consectetuer adipiscing elit.");

    const unknown = formatUserName();
    expect(unknown).toBe("Unknown");
    const name = formatUserName("Test");
    expect(name).toBe("Test");

    const defualturl = formatProfileImageUrl();
    expect(defualturl).toBe(process.env.PUBLIC_URL + "/images/default-user.svg");
    const url = formatProfileImageUrl("http://localhost:3000/dashboard");
    expect(url).toBe("http://localhost:3000/dashboard");

    const rs = capitalizeFirstLetter();
    expect(rs).toBe(null);
    const info = capitalizeFirstLetter("test name");
    expect(info).toBe("Test name");

    const token = formatTimeToken();
    expect(token).toBe(null);
  });

  test("check for Table rows", () => {
    const result = sliceTableArray(
      ["Chicago Pizza", "Neapolitan Pizza", "New York Pizza", "Sicilian Pizza"],
      1,
      3
    );
    expect(result).toEqual(["Sicilian Pizza"]);
    const tableData = sliceTableArray(
      ["Chicago Pizza", "Neapolitan Pizza", "New York Pizza", "Sicilian Pizza"],
      1,
      5
    );
    expect(tableData).toEqual([
      "Chicago Pizza",
      "Neapolitan Pizza",
      "New York Pizza",
      "Sicilian Pizza",
    ]);
  });

  test("check for Language", () => {
    const result = getProfanityWordsByLanguage(
      {
        English: "balls|bastard|bitch|biatch|bloody",
        Hindi: "",
        French: "",
        Portugese: "",
        Spanish: "",
      },
      "English"
    );
    expect(result).toBe("balls|bastard|bitch|biatch|bloody");
  });

  test("check for text and image filter and event function", () => {
    const result = filterImageEventHandler(
      [
        { name: "BLOCK-1-IMAGE-MODERATION", key: 1 },
        { name: "BLOCK-2-IMAGE-MODERATION", key: 2 },
      ],
      [{ id: 2 }]
    );
    expect(result).toEqual([{ key: 2, name: "BLOCK-2-IMAGE-MODERATION" }]);

    const keyImageFn = filterImageFunction(
      {
        payload: [
          { name: "KEY-1-IMAGE-MODERATION", key: 1 },
          { name: "KEY-2-IMAGE-MODERATION", key: 2 },
        ],
      },
      { id: 2 }
    );
    expect(keyImageFn).toEqual([{ key: 2, name: "KEY-2-IMAGE-MODERATION" }]);

    const textEventFn = filterEventHandler(
      [
        { name: "BLOCK-1", key: 1 },
        { name: "BLOCK-2", key: 2 },
      ],
      [{ id: 2 }]
    );
    expect(textEventFn).toEqual([{ key: 2, name: "BLOCK-2" }]);

    const textFilterFn = filterFunction(
      {
        payload: [
          { name: "KEY-1", key: 1 },
          { name: "KEY-2", key: 2 },
        ],
      },
      { id: 2 }
    );
    expect(textFilterFn).toEqual([{ key: 2, name: "KEY-2" }]);
  });

  test("check for channel name", () => {
    const invalidChannelName = checkValidChannelName("Item List");
    expect(invalidChannelName).toBe(false);

    const validChannelName = checkValidChannelName("Item:List");
    expect(validChannelName).toBe(true);

    const validChannelName2 = checkValidChannelName("Item*List");
    expect(validChannelName2).toBe(true);
  });

  test("check for error message", () => {
    const msg = showError({ message: "Method not allowed" });
    expect(msg).toBe("Method not allowed");

    const errorMsg = showError({ error: { message: "Found Error" } });
    expect(errorMsg).toBe("Found Error");

    const forbiddenMsg = showError({ message: "Forbidden" });
    expect(forbiddenMsg).toBe("Not permitted to Access manager");
  });

  test("check for truncate String function", () => {
    const truncateStr = truncateString(`Lorem`, "description");
    expect(truncateStr).toEqual("Lorem");

    const truncate50Str = truncateString(
      `Aenean commodo ligula eget dolor. Lorem ipsum dolor sit amet`
    );
    expect(truncate50Str).toEqual("Aenean commodo ligula eget dolor. Lorem ipsum do...");
  });

  test("check for formatting Date", () => {
    const dateFormat = formatDate("05/02/2021");
    expect(dateFormat).toEqual("May 2nd 2021, 12:00 am");

    const emptyData = formatDate();
    expect(emptyData).toBe(null);
  });

  test("check for usersFromLS, channelsFromLS, applicationsWithKeyFromLS, selectedAppFromLS and selectedAccountsFromLS from local storage", () => {
    const emptyPubnubUser = usersFromLS();
    expect(emptyPubnubUser).toBe(false);
    localStorage.setItem("PubNubUsers", JSON.stringify(mockPubNubUsers));
    const pubnubUsers = usersFromLS();
    expect(pubnubUsers).toMatchObject(mockPubNubUsers);

    const emptyChannelLs = channelsFromLS();
    expect(emptyChannelLs).toBe(false);
    localStorage.setItem("PubNubChannels", JSON.stringify(mockChannels));
    const channelLs = channelsFromLS();
    expect(channelLs).toMatchObject(mockChannels);

    const emptyApplicationKey = applicationsWithKeyFromLS();
    expect(emptyApplicationKey).toBe(false);
    const filterData = [
      {
        ...mockPubNubApplications.result[1],
        ...mockPubNubApplications.result[2],
      },
    ];
    localStorage.setItem("PubNubApplicationsWithKey", JSON.stringify(filterData));
    const applicationKey = applicationsWithKeyFromLS();
    expect(applicationKey).toMatchObject(filterData);

    const emptySelectAppKey = selectedAppFromLS();
    expect(emptySelectAppKey).toBe(false);
    localStorage.setItem("PubNubSelectedApp", JSON.stringify(mockPubNubApplications.result[0]));
    const selectAppKey = selectedAppFromLS();
    expect(selectAppKey).toMatchObject(mockPubNubApplications.result[0]);

    const emptyAppKey = appsFromLS();
    expect(emptyAppKey).toBe(false);
    localStorage.setItem("PubNubApplications", JSON.stringify(mockPubNubApplications));
    const appKey = appsFromLS();
    expect(appKey).toMatchObject(mockPubNubApplications);

    const emptySelAccKey = selectedAccountsFromLS();
    expect(emptySelAccKey).toBe(false);
    localStorage.setItem("PubNubSelectedAccount", JSON.stringify(mockPubnubAccounts[1]));
    const selAccKey = selectedAccountsFromLS();
    expect(selAccKey).toMatchObject(mockPubnubAccounts[1]);
  });

  test("check for capitalizeNameInitials", () => {
    const username = capitalizeNameInitials("test name");
    expect(username).toBe("TN");
    const emptyUsername = capitalizeNameInitials();
    expect(emptyUsername).toBe(false);
    const firstName = capitalizeNameInitials("abcd");
    expect(firstName).toBe("AB");
  });

  test("check for styliing function", () => {
    const style5 = avatarStyle(5);
    expect(style5).toEqual({
      backgroundColor: "#FCF0EF",
      width: "30px",
      height: "30px",
      color: "#E66E68",
      borderRadius: "8px",
    });
    const style3 = avatarStyle(3);
    expect(style3).toEqual({
      backgroundColor: "#FFFABB",
      width: "30px",
      height: "30px",
      color: "#FFD502",
      borderRadius: "8px",
    });

    const style2 = avatarStyle(2);
    expect(style2).toEqual({
      backgroundColor: "#CAFFE6",
      width: "30px",
      height: "30px",
      color: "#34F89C",
      borderRadius: "8px",
    });

    const style1 = avatarStyle(1);
    expect(style1).toEqual({
      backgroundColor: "#CAF0FF",
      width: "30px",
      height: "30px",
      color: "#3BC8FF",
      borderRadius: "8px",
    });

    const account = jest.fn();
    account.mockImplementationOnce(() => {
      return { email: "xyz" };
    });
    const style = avatarStyle("xyz", account);
    expect(style).toEqual({
      color: "#6387ED",
    });
  });

  test("check for fetchWords function", async () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        text: function () {
          return { Id: "123" };
        },
      })
    );
    const response = await fetchWords(`/words/Hindi.txt`);
    expect(response.Id).toEqual("123");

    // check pnFunctionFilterStatus
    expect(pnFunctionFilterStatus(`function runProfanity(request){return 'abc';}`)).toBe("abc");
  });

  test("check for mute, block, message url", () => {
    const member = {
      uuid: {
        custom: { mutedChannels: ["mute"], blockedChannels: ["blocked"] },
      },
    };
    expect(checkMuteStatus()).toBe(false);
    expect(checkBlockStatus()).toBe(false);
    expect(checkMuteStatus(member, "mute")).toBe(true);
    expect(checkBlockStatus(member, "blocked")).toBe(true);

    const mockData = {
      channelMessage: {
        actions: {
          updated: [{ updated: "" }],
        },
      },
      text: "text msg",
      message: {
        file: {
          reason: "xyz",
          id: 1,
          name: "image.png",
        },
        message: {
          originalMessage: "shit",
          moderatedMessage: "**",
          reason: "abc",
        },
      },
    };
    const channelMessage = Object.assign({}, mockData);
    expect(getMessageText(mockData.channelMessage, mockData)).toBe("0");
    expect(
      formatBannedMessage({
        ...mockData.message,
        file: { url: "zxyz", reason: "xyz" },
      }).reason
    ).toEqual("abc");
    expect(getMessageFileUrl(mockData, mockData.channelMessage)).toEqual(mockData);
    pubnub.getFileUrl.mockImplementation(() => "url");
    const result = getMessageFileUrl(mockData.message, channelMessage, pubnub);
    expect(result.file.url).toBe("url");
  });
});
