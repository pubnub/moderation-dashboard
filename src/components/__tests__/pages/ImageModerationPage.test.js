import React from "react";
import { shallow } from "enzyme";
import ImageModerationPage from "../../../pages/imageModeration";

describe("Test Case For Image Moderation", () => {
  test("should render router", () => {
    const wrapper = shallow(<ImageModerationPage />);
    const element = wrapper.find("ImageModeration");
    expect(element).toHaveLength(1);
    expect(element.text()).toEqual("<ImageModeration />");
  });
});
