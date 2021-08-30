import React from "react";
import { shallow } from "enzyme";
import FilterCard from "../../imageModeration/FilterCard";

const mockProps = {
  state: {
    initialLoading: false,
  },
};

describe("Test Case for Filter Card", () => {
  test("Snapshot", () => {
    const wrapper = shallow(<FilterCard state={mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  test("check text", () => {
    const wrapper = shallow(<FilterCard state={mockProps} />);
    expect(wrapper.find('[testid="autoDetection"]').text()).toBe("Automatic Detection");
  });
});
