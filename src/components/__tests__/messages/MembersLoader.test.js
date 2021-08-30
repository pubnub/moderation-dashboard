import React from "react";
import { shallow } from "enzyme";
import MembersLoader from "../../messages/MembersLoader";

describe("Test Case For Members Loader", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(
      <MembersLoader
        loading={false}
        membersLength={97}
        fetchChannelsMembersOnScroll={jest.fn()}
        totalCount={190}
      />
    );
  });

  test("Snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
