import React from "react";
import { shallow } from "enzyme";
import Messages from "../../messages/Messages";

jest.mock("react-router", () => ({
  useLocation: jest.fn().mockReturnValue({
    pathname: "/channels/messages",
    search: "",
    hash: "",
    state: {
      channel: "pro.one",
    },
    key: "bi8m6y",
  }),
}));

describe("Test Case For Messages", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<Messages channelName="pro.one" />);
  });

  test("Snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
