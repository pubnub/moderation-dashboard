import React from "react";
import { shallow } from "enzyme";
import LoginPage from "../../../pages/login";

describe("Test Case For Login", () => {
  test("should render router", () => {
    const wrapper = shallow(<LoginPage />);
    const element = wrapper.find("LoginForm");
    expect(element).toHaveLength(1);
    expect(element.text()).toEqual("<LoginForm />");
  });
});
