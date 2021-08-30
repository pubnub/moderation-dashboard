import React from "react";
import { shallow, mount } from "enzyme";
import ChannelsListing from "../../channels/ChannelsListing";
import { act } from "react-dom/test-utils";
import { mockChannels } from "../../mockTest/mockPubnubAccounts";
import { getChannelByName, deleteChannelMetadata } from "../../../services/pubnub";

jest.mock("../../../services/pubnub", () => ({
  getChannelByName: jest.fn(),
  deleteChannelMetadata: jest.fn(),
}));

const waitForComponentToPaint = async (wrapper) => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve));
    wrapper.update();
  });
};
const expectValue = (a, b) => {
  expect(a).toBe(b);
};

describe("Channel List Test Cases", () => {
  test("Channel List Header", () => {
    const wrapper = shallow(<ChannelsListing />);
    expect(wrapper.find("[testid='channelHeader']").text()).toBe("Channels");
  });

  test("Channel Snapshot", () => {
    const wrapper = shallow(<ChannelsListing />);
    expect(wrapper).toMatchSnapshot();
  });

  test("Have Header Tools and Table", () => {
    const wrapper = shallow(<ChannelsListing />);
    expect(wrapper.find("Search").exists()).toBe(true);
    expect(wrapper.find("AddChannelMetadataModal").exists()).toBe(true);
    expect(wrapper.find("JoinChannelModal").exists()).toBe(true);
    expect(wrapper.find("ChannelsTable").exists()).toBe(true);
  });

  test("Search Box Input Change", async () => {
    const wrapper = mount(<ChannelsListing />);
    await waitForComponentToPaint(wrapper);
    const searchBox = wrapper.find("input[type='text']").getElement().props;
    expectValue(searchBox.value, "");
    expectValue(searchBox.placeholder, "Search for channel name");

    wrapper.find("input[type='text']").simulate("change", {
      target: { value: "newText" },
    });
    const newSearchBox = wrapper.find("input[type='text']").getElement().props;
    expectValue(newSearchBox.value, "newText");
  });

  test("check functions", async () => {
    const wrapper = shallow(<ChannelsListing />);
    localStorage.setItem("PubNubChannels", JSON.stringify(mockChannels));
    getChannelByName.mockImplementationOnce(() => [{}, {}]);
    expect(getChannelByName).toHaveBeenCalledTimes(0);
    await wrapper.find("#search").getElement().props.cancelSearch();
    await wrapper.find("#search").getElement().props.requestSearch();
    expect(getChannelByName).toHaveBeenCalledTimes(1);
    getChannelByName.mockImplementationOnce(() => {
      throw new Error("Failed to fetch applications");
    });
    await wrapper.find("#search").getElement().props.requestSearch();
    expect(getChannelByName).toHaveBeenCalledTimes(2);
    getChannelByName.mockImplementationOnce(() => []);
    await wrapper.find("#search").getElement().props.requestSearch();
    expect(getChannelByName).toHaveBeenCalledTimes(3);

    wrapper.find("AddChannelMetadataModal").getElement().props.isAdded();

    deleteChannelMetadata.mockImplementationOnce(() => [{}, {}]);
    expect(deleteChannelMetadata).toHaveBeenCalledTimes(0);
    wrapper.find("ChannelsTable").getElement().props.deleteChannel(123);
    expect(deleteChannelMetadata).toHaveBeenCalledTimes(1);
  });
});
