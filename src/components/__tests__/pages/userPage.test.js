import React from "react";
import { shallow } from "enzyme";
import UsersPage from "../../../pages/users";

describe("Test Case For Overview", () => {
  test("should render router", () => {
    const wrapper = shallow(<UsersPage />);
    const element = wrapper.find("UsersListing");
    expect(element).toHaveLength(1);
    expect(element.text()).toEqual("<UsersListing />");
  });
});
