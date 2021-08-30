import React from "react";
import { shallow } from "enzyme";
import OverviewPage from "../../../pages/overview";

describe("Test Case For Overview", () => {
  test("should render router", () => {
    const wrapper = shallow(<OverviewPage />);
    const element = wrapper.find("OverviewGrid");
    expect(element).toHaveLength(1);
    expect(element.text()).toEqual("<OverviewGrid />");
  });
});
