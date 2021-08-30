import Pubnub from "pubnub";
import usePubNub from "../../../utils/usePubNub";
import { mockPubNubApplications } from "../../mockTest/mockPubnubAccounts";

describe("Test Case For use pubnub", () => {
  test("check for object", () => {
    localStorage.setItem("PubNubSelectedApp", JSON.stringify(mockPubNubApplications.result[1]));
    const uuid = Pubnub.generateUUID();
    localStorage.setItem("uuid", JSON.stringify(uuid));
    expect(typeof usePubNub()).toBe("object");
  });
});
