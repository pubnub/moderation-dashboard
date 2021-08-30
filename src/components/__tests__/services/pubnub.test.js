/* eslint-disable jest/no-conditional-expect */
import PubNub from "pubnub";
import axios from "../../../utils/axios";
import {
  fetchAllAccounts,
  fetchAllApps,
  fetchPubNubFunction,
  createPubNubFunction,
  startPubNubFunction,
  stopPubNubFunction,
  createPubNubEventHandler,
  updatePubNubEventHandler,
  setUserMetadata,
  addEditMessageAction,
  deleteMessageAction,
  softDeleteMessage,
  checkUserIDExistence,
  checkChannelExistence,
  getChannelsOccupancy,
  getMessagesCount,
  fetchChannelMetadata,
  getOnlineMembers,
  getChannelMembers,
  getChannelByName,
  getUserByName,
  fetchMessages,
  editChannelMetadata,
  editUserMetadata,
  deleteUserMetadata,
  deleteChannelMetadata,
  addUserMetadata,
  addChannelMetadata,
  getUsers,
  getChannels,
} from "../../../services/pubnub";
import { mockAllAccounts, mockAllApps } from "../../mockTest/services/mockPubnubServices";

const SUBSCRIBE_KEY = "sub-c-d86a1698-889e-11ea-b883-d2d532c9a1bf";
const PUBLISH_KEY = "pub-c-5397272a-7664-4b57-bc91-944977fb3f25";
const TEST_PREFIX = "objectsV2tests";
const UUID = `${TEST_PREFIX}-main`;
const UUID_1 = `${TEST_PREFIX}-uuid-1`;
const USER_NAME = `Test Name 123`;
const CHANNEL_NAME = `Test Channel Name 123`;
const CHANNEL_1 = `${TEST_PREFIX}-channel-1`;
let pubnub = new PubNub({
  subscribeKey: SUBSCRIBE_KEY,
  publishKey: PUBLISH_KEY,
});
jest.mock("pubnub", () =>
  jest.fn().mockImplementation(() => ({
    publish: jest.fn(),
    subscribe: jest.fn(),
    addMessageAction: jest.fn(),
    removeMessageAction: jest.fn(),
    hereNow: jest.fn(),
    messageCounts: jest.fn(),
    fetchMessages: jest.fn(),
    objects: {
      setUUIDMetadata: jest.fn(),
      getAllUUIDMetadata: jest.fn(),
      getChannelMetadata: jest.fn(),
      getChannelMembers: jest.fn(),
      getAllChannelMetadata: jest.fn(),
      setChannelMetadata: jest.fn(),
      removeUUIDMetadata: jest.fn(),
      removeChannelMetadata: jest.fn(),
    },
  }))
);
jest.mock("axios", () => ({
  create: jest.fn(() => ({
    get: jest.fn(() => Promise.resolve({ data: {} })),
    post: jest.fn(() => Promise.resolve({ data: {} })),
    put: jest.fn(() => Promise.resolve({ data: {} })),
  })),
}));

const successPromise = Promise.resolve({
  status: 200,
  data: { id: UUID_1, name: USER_NAME },
});
const successPromise2 = Promise.resolve({
  status: 200,
  data: { id: UUID, name: USER_NAME },
});
const emptyPromise = Promise.resolve();

const addMessageActionSuccessImplementation = () => {
  return pubnub.addMessageAction.mockImplementation(() => successPromise);
};
const addMessageActionFailedImplementation = () => {
  return pubnub.addMessageAction.mockImplementation(() => emptyPromise);
};

describe("Test Cases for Pubnub Services", () => {
  afterAll(() => {
    jest.resetAllMocks();
  });

  test("On successfully fetching all accounts", async () => {
    try {
      axios.get.mockResolvedValue(mockAllAccounts);
      const result = await fetchAllAccounts(123, "abc");
      expect(result.result.accounts.length).toBe(3);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledTimes(0);
      expect(axios.get).toHaveBeenCalledWith("/accounts?user_id=123", {
        headers: {
          "X-Session-Token": "abc",
        },
      });

      axios.get.mockResolvedValue({ status: 201 });
      await fetchAllAccounts(1, "xyz");
    } catch (error) {
      expect(error.message).toEqual("Failed to fetch accounts");
    }
  });

  test("On successfully fetching all apps", async () => {
    try {
      axios.get.mockResolvedValue(mockAllApps);
      const result = await fetchAllApps(1234, "xyz");
      expect(result.result.length).toBe(4);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledTimes(0);
      expect(axios.get).toHaveBeenCalledWith(`/apps?owner_id=1234`, {
        headers: {
          "X-Session-Token": "xyz",
        },
      });

      axios.get.mockResolvedValue({ status: 204 });
      await fetchAllApps(1, "abc");
    } catch (e) {
      expect(e.message).toEqual("Failed to fetch applications");
    }
  });

  test("On successfully fetching PubNub Functions", async () => {
    try {
      const mockData = { data: { result: [] }, status: 200, statusText: "OK" };
      axios.get.mockResolvedValue(mockData);
      const result = await fetchPubNubFunction(2, "sessionToken");
      expect(result.result).toEqual([]);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledTimes(0);
      expect(axios.get).toHaveBeenCalledWith(`/v1/blocks/key/2/block`, {
        headers: {
          "X-Session-Token": "sessionToken",
        },
      });

      axios.get.mockResolvedValue({ status: 202 });
      await fetchPubNubFunction(3, "sessionToken");
    } catch (e) {
      expect(e.message).toEqual("Failed to fetch PubNub functions");
    }
  });

  it("On successfully fetching APIs", async () => {
    const data = {
      hits: [
        {
          objectID: "1",
          title: "a",
        },
        {
          objectID: "2",
          title: "b",
        },
      ],
    };
    axios.post.mockImplementation(() => Promise.resolve({ status: 200, data }));
    try {
      await expect(createPubNubFunction({ key_id: "1" }, "param2")).resolves.toEqual(data);
      await expect(startPubNubFunction({ key_id: "1", block_id: "2" }, "param2")).resolves.toEqual(
        data
      );
      await expect(stopPubNubFunction({ key_id: "1", block_id: "2" }, "param2")).resolves.toEqual(
        data
      );
      await expect(createPubNubEventHandler({ key_id: "1" }, "param2")).resolves.toEqual(data);
      axios.put.mockImplementation(() => Promise.resolve({ status: 200, data }));
      await expect(updatePubNubEventHandler({ key_id: "1", id: 1 }, "param2")).resolves.toEqual(
        data
      );

      axios.post.mockImplementation(() => Promise.resolve({ status: 202, data: {} }));
      await createPubNubFunction({ key_id: "1" }, "param3");
    } catch (e) {
      expect(e.message).toEqual("Something went wrong. Please try later");
    }
  });

  it("To set Metadata of a user", async () => {
    try {
      pubnub.objects.setUUIDMetadata.mockImplementation(() => successPromise);
      const updateUserData = await setUserMetadata(pubnub, UUID_1, {
        name: USER_NAME,
      });
      expect(updateUserData.id).toEqual(UUID_1);

      const editUserData = await editUserMetadata(pubnub, USER_NAME, null, UUID_1, null);
      expect(editUserData.data.id).toEqual(UUID_1);
      try {
        const addUserData = await addUserMetadata(pubnub, USER_NAME, null, UUID_1, null);
        expect(addUserData.data.id).toEqual(UUID_1);

        // failed
        pubnub.objects.setUUIDMetadata.mockImplementation(() => {
          return Promise.resolve({
            status: 201,
            data: {},
            message: "Failed to set metadata of PubNub user",
          });
        });
        await addUserMetadata(pubnub, USER_NAME, "email", UUID_1, null);
      } catch (err) {
        expect(err.message).toEqual("Failed to set metadata of PubNub user");
      }

      await setUserMetadata(pubnub, UUID_1, {
        name: USER_NAME,
      });
    } catch (e) {
      expect(e.message).toEqual("Failed to set metadata of PubNub user");
    }
  });

  it("To add edit Message action", async () => {
    try {
      // success
      addMessageActionSuccessImplementation();
      const addEditMsgAction = await addEditMessageAction(
        pubnub,
        CHANNEL_1,
        "16286961954085918",
        "updatehere"
      );
      expect(addEditMsgAction.id).toEqual(UUID_1);

      // failed
      addMessageActionFailedImplementation();
      await addEditMessageAction(pubnub, CHANNEL_1, "16286961954085919", "errorhere");
    } catch (e) {
      expect(e.message).toEqual("Failed to undo delete action");
    }
  });

  it("To undo delete action", async () => {
    try {
      // success
      pubnub.removeMessageAction.mockImplementation(() => successPromise);
      const delMsgAction = await deleteMessageAction(
        pubnub,
        CHANNEL_1,
        "16286961954085918",
        "162869619540859"
      );
      expect(delMsgAction.id).toEqual(UUID_1);

      // failed
      pubnub.removeMessageAction.mockImplementation(() => emptyPromise);
      await deleteMessageAction(pubnub, CHANNEL_1, "16286961954085919", "186961954085919");
    } catch (error) {
      expect(error.message).toEqual("Failed to undo delete action");
    }
  });

  it("To soft delete action", async () => {
    try {
      // success
      addMessageActionSuccessImplementation();
      const delData = await softDeleteMessage(pubnub, CHANNEL_1, "16286961954085918");

      expect(delData.id).toEqual(UUID_1);
      // failed
      addMessageActionFailedImplementation();
      await softDeleteMessage(pubnub, CHANNEL_1, "16286961954085919");
    } catch (e) {
      expect(e.message).toEqual("Failed to delete the message");
    }
  });

  it("To check if user ID already exists", async () => {
    try {
      // success
      pubnub.objects.getAllUUIDMetadata.mockImplementation(() => successPromise2);
      const existUpdateUserData = await checkUserIDExistence(pubnub, UUID);
      expect(existUpdateUserData.id).toEqual(UUID);

      const userByName = await getUserByName(pubnub, USER_NAME);
      expect(userByName.id).toEqual(UUID);
      try {
        const userList = await getUsers(pubnub, 1, 0, "");
        expect(userList.data.id).toEqual(UUID);

        // failed
        pubnub.objects.getAllUUIDMetadata.mockImplementation(() => {
          return Promise.resolve({ status: 201 });
        });
        await getUsers(pubnub, 2, 1, "");
      } catch (err) {
        expect(err.message).toEqual("Failed to get PubNub users");
      }
      await checkUserIDExistence(pubnub, UUID_1);
    } catch (e) {
      expect(e.message).toEqual("Failed to get PubNub user");
    }
  });

  it("To check if channel already exists", async () => {
    try {
      // success
      pubnub.objects.getAllChannelMetadata.mockImplementation(() => successPromise);
      const existChannel = await checkChannelExistence(pubnub, CHANNEL_NAME, "16286961954085918");

      expect(existChannel.id).toEqual(UUID_1);
      try {
        const channelList = await getChannels(pubnub, 1, 0);

        expect(channelList.data.id).toEqual(UUID_1);
        pubnub.objects.getAllChannelMetadata.mockImplementation(() => {
          return Promise.resolve({ status: 204 });
        });
        await getChannels(pubnub, 2, 0);
      } catch (e) {
        expect(e.message).toEqual("Failed to get PubNub channels");
      }

      // failed
      pubnub.objects.getAllChannelMetadata.mockImplementation(() => {
        return Promise.resolve({ status: 201 });
      });
      await checkChannelExistence(pubnub, CHANNEL_NAME, "16286961954085919");
    } catch (e) {
      expect(e.message).toEqual("Failed to get PubNub channel");
    }
  });

  it("To get number of online users in a channel", async () => {
    try {
      // success
      pubnub.hereNow.mockImplementation(() => {
        return Promise.resolve({
          status: 200,
          channels: { id: UUID_1, name: USER_NAME },
        });
      });
      const channelsOccupancy = await getChannelsOccupancy(pubnub, [CHANNEL_1]);

      expect(channelsOccupancy.id).toEqual(UUID_1);
      // failed
      pubnub.hereNow.mockImplementation(() => emptyPromise);
      await getChannelsOccupancy(pubnub, [CHANNEL_NAME]);
    } catch (e) {
      expect(e.message).toEqual("Failed to get online users");
    }
  });

  it("To fetch Total messages count of today", async () => {
    try {
      // success
      pubnub.messageCounts.mockImplementation(() => {
        return Promise.resolve({
          status: 200,
          channels: { [CHANNEL_1]: { id: UUID_1, name: USER_NAME } },
        });
      });
      const msgCount = await getMessagesCount(pubnub, CHANNEL_1, "16286961954085918");
      expect(msgCount.id).toEqual(UUID_1);
      // failed
      pubnub.messageCounts.mockImplementation(() => emptyPromise);
      await getMessagesCount(pubnub, CHANNEL_1, "16286961954085919");
    } catch (e) {
      expect(e.message).toEqual("Failed to get total messages Count");
    }
  });

  it("To fetch a channel detail", async () => {
    try {
      // success
      pubnub.objects.getChannelMetadata.mockImplementation(() => successPromise2);
      const fetChMetadata = await fetchChannelMetadata(pubnub, CHANNEL_1);

      expect(fetChMetadata.id).toEqual(UUID);
      // failed
      pubnub.objects.getChannelMetadata.mockImplementation(() => {
        return Promise.resolve({ status: 201 });
      });
      await fetchChannelMetadata(pubnub, CHANNEL_NAME);
    } catch (e) {
      expect(e.message).toEqual("Failed to get PubNub channel");
    }
  });

  it("To fetch online channel Members", async () => {
    try {
      // success
      pubnub.hereNow.mockImplementation(() => {
        return Promise.resolve({
          status: 200,
          channels: {
            [CHANNEL_1]: { occupants: { id: UUID_1, name: USER_NAME } },
          },
        });
      });
      const onlineMember = await getOnlineMembers(pubnub, CHANNEL_1);

      expect(onlineMember.id).toEqual(UUID_1);
      // failed
      pubnub.hereNow.mockImplementation(() => emptyPromise);
      await getOnlineMembers(pubnub, CHANNEL_NAME);
    } catch (e) {
      expect(e.message).toEqual("Failed to get PubNub online members");
    }
  });

  it("To fetch channel By name", async () => {
    try {
      // success
      pubnub.objects.getAllChannelMetadata.mockImplementation(() => successPromise2);
      const updateUserData = await getChannelByName(pubnub, CHANNEL_1);

      expect(updateUserData.id).toEqual(UUID);
      // failed
      pubnub.objects.getAllChannelMetadata.mockImplementation(() => {
        return Promise.resolve({ status: 201 });
      });
      await getChannelByName(pubnub, CHANNEL_NAME);
    } catch (e) {
      expect(e.message).toEqual("Failed to get PubNub users");
    }
  });

  it("To fetch channel Members", async () => {
    try {
      // success
      pubnub.objects.getChannelMembers.mockImplementation(() => successPromise2);
      const updateUserData = await getChannelMembers(pubnub, CHANNEL_1, 0);

      expect(updateUserData.data.id).toEqual(UUID);
      // failed
      pubnub.objects.getChannelMembers.mockImplementation(() => {
        return Promise.resolve({ status: 201 });
      });
      await getChannelMembers(pubnub, CHANNEL_NAME, 1);
    } catch (e) {
      expect(e.message).toEqual("Failed to get PubNub channel memebers");
    }
  });

  it("To fetch Messages", async () => {
    try {
      // success
      pubnub.fetchMessages.mockImplementation(() => {
        return Promise.resolve({
          status: 200,
          channels: { [CHANNEL_NAME]: { id: UUID_1, name: USER_NAME } },
        });
      });
      const fetchMsg = await fetchMessages(pubnub, CHANNEL_NAME);

      expect(fetchMsg.id).toEqual(UUID_1);
      // failed
      pubnub.fetchMessages.mockImplementation(() => emptyPromise);
      await fetchMessages(pubnub, CHANNEL_1);
    } catch (e) {
      expect(e.message).toEqual("Failed to get messages");
    }
  });

  it("To edit channel metadata", async () => {
    try {
      // success
      pubnub.objects.setChannelMetadata.mockImplementation(() => successPromise);
      const editChMetaData = await editChannelMetadata(pubnub, UUID_1, {
        name: USER_NAME,
      });

      expect(editChMetaData.data.id).toEqual(UUID_1);
      try {
        const addChMetaData = await addChannelMetadata(pubnub, CHANNEL_NAME, USER_NAME, CHANNEL_1);

        expect(addChMetaData.data.id).toEqual(UUID_1);
        // failed
        pubnub.objects.setChannelMetadata.mockImplementationOnce(() => {
          return Promise.resolve({ status: 201 });
        });
        await addChannelMetadata(pubnub, CHANNEL_1, USER_NAME, CHANNEL_NAME);
      } catch (err) {
        expect(err.message).toEqual("Failed to add channel metadata");
      }
      pubnub.objects.setChannelMetadata.mockImplementationOnce(() => {
        return Promise.resolve({ status: 202 });
      });
      await editChannelMetadata(pubnub, UUID, {
        name: USER_NAME,
      });
    } catch (e) {
      expect(e.message).toEqual("Failed to add channel metadata");
    }
  });

  it("To delete user metadata", async () => {
    try {
      // success
      pubnub.objects.removeUUIDMetadata.mockImplementation(() => successPromise);
      const editChMetaData = await deleteUserMetadata(pubnub, UUID_1);
      expect(editChMetaData.data.id).toEqual(UUID_1);

      // failed
      pubnub.objects.removeUUIDMetadata.mockImplementationOnce(() => {
        return Promise.resolve({ status: 201 });
      });
      await deleteUserMetadata(pubnub, UUID, {
        name: USER_NAME,
      });
    } catch (e) {
      expect(e.message).toEqual("Failed to add user metadata");
    }
  });

  it("To delete channel metadata", async () => {
    try {
      // success
      pubnub.objects.removeChannelMetadata.mockImplementation(() => successPromise);
      const editChMetaData = await deleteChannelMetadata(pubnub, CHANNEL_NAME);
      expect(editChMetaData.data.id).toEqual(UUID_1);

      // failed
      pubnub.objects.removeChannelMetadata.mockImplementationOnce(() => {
        return Promise.resolve({ status: 201 });
      });
      await deleteChannelMetadata(pubnub, CHANNEL_1);
    } catch (e) {
      expect(e.message).toEqual("Failed to add user metadata");
    }
  });
});
