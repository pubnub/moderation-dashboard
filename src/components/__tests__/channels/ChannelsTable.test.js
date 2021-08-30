import React from "react";
import { shallow } from "enzyme";
import ChannelsTable from "../../channels/ChannelsTable";
import { mockChannels } from "../../mockTest/mockPubnubAccounts";
import { getChannels } from "../../../services/pubnub";

const mockPushFn = jest.fn();
const mockDeleteFn = jest.fn();
const mockSearchFn = jest.fn();
jest.mock("react-router", () => ({
  useHistory: () => ({
    push: mockPushFn,
  }),
}));
jest.mock("../../../services/pubnub", () => ({
  getChannels: jest.fn(),
}));

describe("Test Cases for Channels Table", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(
      <ChannelsTable
        searchResult={mockChannels}
        setSearchableData={mockSearchFn}
        data={[]}
        deleteChannel={mockDeleteFn}
      />
    );
  });

  test("Snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("check delete", () => {
    expect(mockDeleteFn).toHaveBeenCalledTimes(0);
    wrapper.find("#delete").getElement().props.onConfirm();
    expect(mockDeleteFn).toHaveBeenCalledTimes(1);
  });

  test("check for viewRow", () => {
    expect(mockPushFn).toHaveBeenCalledTimes(0);
    wrapper.find("ListingTable").getElement().props.viewRow("", "newChannelName");
    expect(mockPushFn).toHaveBeenCalledTimes(1);
  });

  test("check for deleteRow", () => {
    expect(wrapper.find("#delete").getElement().props.open).toBeFalsy();
    wrapper.find("ListingTable").getElement().props.deleteRow("", 1);
    expect(wrapper.find("#delete").getElement().props.open).toBeTruthy();
  });

  test("check for editRow", () => {
    const mockData = [{}, {}];
    expect(wrapper.find("UpdateChannelMetadataModal").getElement().props.data).toStrictEqual([]);
    wrapper.find("ListingTable").getElement().props.editRow("", mockData);
    expect(wrapper.find("UpdateChannelMetadataModal").getElement().props.data).toStrictEqual(
      mockData
    );
  });

  test("check for handleRowClick", () => {
    expect(mockPushFn).toHaveBeenCalledTimes(0);
    wrapper.find("ListingTable").getElement().props.handleRowClick("", { id: 123 }, true);
    expect(mockPushFn).toHaveBeenCalledTimes(0);
    wrapper.find("ListingTable").getElement().props.handleRowClick("", { id: 123 }, false);
    expect(mockPushFn).toHaveBeenCalledTimes(1);
  });

  test("check for getNewPage", () => {
    const mockData = { data: [{}, {}, {}], totalCount: 3, prev: 1, next: 3 };
    getChannels.mockImplementationOnce(() => mockData);

    expect(getChannels).toHaveBeenCalledTimes(0);
    expect(wrapper.find("ListingTable").getElement().props.number).toBe(0);

    wrapper.find("ListingTable").getElement().props.getNewPage(5);
    expect(wrapper.find("ListingTable").getElement().props.number).toBe(5);
    expect(getChannels).toHaveBeenCalledTimes(1);

    wrapper.find("ListingTable").getElement().props.getNewPage(3);
    expect(wrapper.find("ListingTable").getElement().props.number).toBe(4);
    expect(getChannels).toHaveBeenCalledTimes(2);
  });
});
