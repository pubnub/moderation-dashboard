import React from "react";
import { shallow } from "enzyme";
import ListingTable from "../../tables/ListingTable";
import { mockPubNubApplications } from "../../mockTest/mockPubnubAccounts";

const mockHeadCells = [
  {
    id: "name",
    alignment: "left",
    label: "NAME",
    avatar: true,
    hasChild: true,
    user: true,
    icons: true,
  },
  { id: "publish_key", alignment: "left", label: "PUBLISH KEY" },
  { id: "subscribe_key", alignment: "left", label: "SUBSCRIBE KEY" },
  { id: "created", alignment: "left", label: "CREATED ON" },
];

describe("Test Cases for Listing Table", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(
      <ListingTable
        data={mockPubNubApplications.result[0].keys}
        headCells={mockHeadCells}
        handleRowClick={jest.fn()}
        message={"No data Found"}
        number={0}
        getNewPage={jest.fn()}
      />
    );
  });

  test("Snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("render components", () => {
    expect(wrapper.find("ListingPagination").exists()).toBeTruthy();
  });

  test("check function", () => {
    expect(
      wrapper.find("ListingPagination").getElements()[0].props.handleChangePage("", 10)
    ).toBeUndefined();
    expect(
      wrapper.find("EnhancedTableHead").getElements()[0].props.onRequestSort()
    ).toBeUndefined();
  });
});
