import React from "react";
import { shallow } from "enzyme";
import AccountsPage from "../../../pages/accounts";

describe("Test Case For Accounts", () => {
  test("should render router", () => {
    const wrapper = shallow(<AccountsPage />);
    const element = wrapper.find("AccountList");
    expect(element).toHaveLength(1);
    expect(element.text()).toEqual("<AccountList />");
  });
});
