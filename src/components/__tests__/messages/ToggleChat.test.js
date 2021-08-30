import React from "react";
import { shallow } from "enzyme";
import ToggleChat from "../../messages/ToggleChat";

const mockToggleFn = jest.fn();
describe("Test Case For Toggle Chat", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<ToggleChat toggledVal="chat" setToggledVal={mockToggleFn} />);
  });

  test("Snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("initial styling", () => {
    expect(wrapper.find("#chat").getElement().props.className.includes("activeToggled")).toBe(true);

    expect(wrapper.find("#ban").getElement().props.className.includes("disableToggled")).toBe(true);
  });

  test("check function", () => {
    expect(mockToggleFn).toHaveBeenCalledTimes(0);

    wrapper.find("#chat").simulate("click");
    expect(mockToggleFn).toHaveBeenCalledTimes(1);

    wrapper.find("#ban").simulate("click");
    expect(mockToggleFn).toHaveBeenCalledTimes(2);
  });
});
