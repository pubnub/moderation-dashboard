import React from "react";
import { shallow } from "enzyme";
import SwitchButton from "../../core/SwitchButton";

describe("Test Cases for SwitchButton", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<SwitchButton />);
  });

  test("Snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
