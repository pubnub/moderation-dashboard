import React from "react";
import { shallow, mount } from "enzyme";
import { Grid, IconButton } from "@material-ui/core";
import Members from "../../messages/Members";
import { mockPubnubChannelMembers } from "../../mockTest/mockPubnubAccounts";
import { getOnlineMembers } from "../../../services/pubnub";
import { act } from "react-dom/test-utils";
import { OnlineBadge, OfflineBadge } from "../../../style/badge";

const mockMemberFn = jest.fn();
jest.mock("../../../services/pubnub", () => ({
  getOnlineMembers: jest.fn(),
  getChannelMembers: jest.fn(),
}));

describe("Test Case For Members", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(
      <Members
        channelMembers={mockPubnubChannelMembers}
        channelName="pro.one"
        page="NQ"
        totalCount={5}
        selectedMemberDetail={mockMemberFn}
      />
    );
  });

  test("Snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Have infinte scroll and users actions", () => {
    expect(wrapper.find("UserAction").exists()).toBe(true);
    expect(wrapper.find("MembersLoader").exists()).toBe(true);
  });

  test("check functions", async () => {
    const mockData = [
      {
        state: null,
        uuid: "70b73802-acf2-430c-a5d3-83d",
      },
    ];
    getOnlineMembers.mockImplementationOnce(() => mockData);

    await act(async () => {
      wrapper = mount(
        <Members
          channelMembers={mockPubnubChannelMembers}
          channelName="pro.one"
          page="NQ"
          totalCount={5}
          selectedMemberDetail={mockMemberFn}
        />
      );
    });
    wrapper.update();

    expect(wrapper.find(OnlineBadge).length).toBe(1);
    expect(wrapper.find(OfflineBadge).length).toBe(3);

    // handleClick function
    expect(mockMemberFn).toHaveBeenCalledTimes(0);
    wrapper.find(Grid).at(4).simulate("click", "details");
    expect(mockMemberFn).toHaveBeenCalledTimes(1);

    // confirmMute function
    expect(wrapper.find("UserAction").getElement().props.action).toBe("");
    expect(wrapper.find("UserAction").getElement().props.open).toBeFalsy();
    act(() => {
      wrapper.find(IconButton).at(0).getElement().props.onClick();
    });
    wrapper.update();
    expect(wrapper.find("UserAction").getElement().props.action).toBe("mute");
    expect(wrapper.find("UserAction").getElement().props.open).toBeTruthy();

    // confirmBlock function
    act(() => {
      wrapper.find(IconButton).at(1).getElement().props.onClick();
    });
    wrapper.update();
    expect(wrapper.find("UserAction").getElement().props.action).toBe("block");
    expect(wrapper.find("UserAction").getElement().props.open).toBeTruthy();

    // confirmMute function
    act(() => {
      wrapper.find(IconButton).at(6).getElement().props.onClick();
    });
    wrapper.update();
    expect(wrapper.find("UserAction").getElement().props.action).toBe("unmute");
    expect(wrapper.find("UserAction").getElement().props.open).toBeTruthy();

    // confirmUnblock function
    act(() => {
      wrapper.find(IconButton).at(7).getElement().props.onClick();
    });
    wrapper.update();
    expect(wrapper.find("UserAction").getElement().props.action).toBe("unblock");
    expect(wrapper.find("UserAction").getElement().props.open).toBeTruthy();

    expect(mockMemberFn).toHaveBeenCalledTimes(1);
    act(() => {
      wrapper.find(IconButton).at(5).getElement().props.onMouseOver();
      wrapper.find(IconButton).at(6).getElement().props.onMouseOver();
      wrapper.find(IconButton).at(7).getElement().props.onMouseOver();
    });
    wrapper.update();
    expect(mockMemberFn).toHaveBeenCalledTimes(1);

    act(() => {
      wrapper
        .find("UserAction")
        .getElement()
        .props.updated({ id: mockPubnubChannelMembers[2].uuid.id }, "mute");
      wrapper
        .find("UserAction")
        .getElement()
        .props.updated({ id: mockPubnubChannelMembers[2].uuid.id }, "unmute");
      wrapper
        .find("UserAction")
        .getElement()
        .props.updated({ id: mockPubnubChannelMembers[2].uuid.id }, "block");
      wrapper
        .find("UserAction")
        .getElement()
        .props.updated({ id: mockPubnubChannelMembers[2].uuid.id }, "unblock");
    });
    wrapper.update();
    expect(wrapper.find("UserAction").getElement().props.action).toBe("unblock");
  });
});
