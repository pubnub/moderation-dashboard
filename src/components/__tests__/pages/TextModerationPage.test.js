import React from "react";
import { shallow } from "enzyme";
import TextModerationPage from "../../../pages/textModeration";

describe("Test Case For App", () => {
  test("should render router", () => {
    const wrapper = shallow(<TextModerationPage />);
    const element = wrapper.find("TextModeration");
    expect(element).toHaveLength(1);
    expect(element.text()).toEqual("<TextModeration />");
  });
});
