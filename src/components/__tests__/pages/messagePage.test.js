import React from "react";
import { shallow } from "enzyme";
import MessagesPage from "../../../pages/messages";

describe("Test Case For Messages", () => {
  test("should render router", () => {
    const wrapper = shallow(<MessagesPage />);
    const element = wrapper.find("Messages");
    expect(element).toHaveLength(1);
    expect(element.text()).toEqual("<Messages />");
  });
});
