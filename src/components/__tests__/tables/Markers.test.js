import React from "react";
import { shallow } from "enzyme";
import Markers from "../../tables/Markers";

describe("Test Cases for Markers", () => {
  test("Snapshot", () => {
    const wrapper = shallow(<Markers />);
    expect(wrapper).toMatchSnapshot();
  });
});
