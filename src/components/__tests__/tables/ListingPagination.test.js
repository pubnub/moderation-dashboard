import React from "react";
import { shallow } from "enzyme";
import ListingPagination from "../../tables/ListingPagination";
import { mockPubNubApplications } from "../../mockTest/mockPubnubAccounts";

describe("Test Cases for Listing Pagination", () => {
  test("Snapshot", () => {
    const wrapper = shallow(
      <ListingPagination
        handleChangePage={jest.fn()}
        page={0}
        tableData={mockPubNubApplications.result[0].keys}
        rowsPerPage={25}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
