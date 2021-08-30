import React from "react";
import { shallow } from "enzyme";
import Auth from "../../../layouts/Auth";

describe("Test Case For Auth", () => {
  test("should render router", () => {
    const wrapper = shallow(<Auth />);
    expect(wrapper).toMatchSnapshot();
  });
});
