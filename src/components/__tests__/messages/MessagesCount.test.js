import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import MessagesCount from "../../messages/MessagesCount";
import { getMessagesCount } from "../../../services/pubnub";

jest.mock("../../../services/pubnub", () => ({
  getMessagesCount: jest.fn(),
}));

describe("Test Case For Messages Count", () => {
  test("Snapshot", async () => {
    getMessagesCount.mockImplementationOnce(() => 5);
    await act(async () => {
      const wrapper = mount(<MessagesCount channelName="pro.one" />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
