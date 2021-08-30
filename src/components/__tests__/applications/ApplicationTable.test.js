import React from "react";
import { mount } from "enzyme";
import ApplicationTable from "../../applications/ApplicationTable";
import { mockPubNubApplications } from "../../mockTest/mockPubnubAccounts";

const mockApplicationTable = mockPubNubApplications.result[2].keys;

const mockPush = jest.fn();
const mockRow = {
  subscribe_key: "sub-c-a18a",
};

localStorage.setItem("PubNubApplications", JSON.stringify(mockPubNubApplications));

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: mockPush,
  }),
}));

describe("Test Case For Application Table", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(
      <ApplicationTable
        searchResult={mockApplicationTable}
        handleRowClick={jest.fn()}
        data={mockApplicationTable}
      />
    );
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  test("Snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should render router", () => {
    expect(wrapper.find("ListingTable")).toHaveLength(1);
  });

  test("check for handleRowClick", () => {
    expect(mockPush).toHaveBeenCalledTimes(0);
    wrapper.find("ListingTable").getElements()[0].props.handleRowClick("", mockRow);
    expect(mockPush).toHaveBeenCalledTimes(1);
  });
});
