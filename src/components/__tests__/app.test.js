import React from "react";
import { shallow } from "enzyme";
import App from "../../App";

describe("Test Case For App", () => {
  test("should render router", () => {
    const wrapper = shallow(<App />);
    const element = wrapper.find("Routes");
    expect(element).toHaveLength(1);
    expect(element.text()).toEqual("<Routes />");
  });
});
