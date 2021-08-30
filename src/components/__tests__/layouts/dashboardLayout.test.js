import React from "react";
import { shallow } from "enzyme";
import DashboardLayout from "../../../layouts/Dashboard";

describe("Test Case For Dashboard", () => {
  test("should render router", () => {
    const wrapper = shallow(<DashboardLayout />);
    const element = wrapper.find("Header");
    expect(element).toHaveLength(1);
    expect(element.text()).toEqual("<Header />");
    const element2 = wrapper.find("Sidebar");
    expect(element2).toHaveLength(1);
    expect(element2.text()).toEqual("<Sidebar />");
  });
});
