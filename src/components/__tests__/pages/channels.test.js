import React from "react";
import { shallow } from "enzyme";
import ChannelPage from "../../../pages/channels";

describe("Test Case For Channel", () => {
  test("should render router", () => {
    const wrapper = shallow(<ChannelPage />);
    const element = wrapper.find("ChannelsListing");
    expect(element).toHaveLength(1);
    expect(element.text()).toEqual("<ChannelsListing />");
  });
});
