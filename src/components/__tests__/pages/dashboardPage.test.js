import React from "react";
import { shallow } from "enzyme";
import DashboardPage from "../../../pages/dashboard";

describe("Test Case For Dashboard", () => {
  test("SnapShot", () => {
    const wrapper = shallow(<DashboardPage />);
    expect(wrapper).toMatchSnapshot();
  });

  test("should render router", () => {
    const wrapper = shallow(<DashboardPage />);
    const element = wrapper.find("Header");
    expect(element).toHaveLength(1);
    expect(element.text()).toEqual("<Header />");
    const element2 = wrapper.find("AppsListing");
    expect(element2).toHaveLength(1);
    expect(element2.text()).toEqual("<AppsListing />");
  });
});
