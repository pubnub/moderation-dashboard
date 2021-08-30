import React from "react";
import { shallow } from "enzyme";
import FilterCard from "../../textModeration/FilterCard";

const mockProps = {
  mockState: {
    state: {
      initialLoading: false,
      automaticProfanity: true,
    },
  },
  handleClick: jest.fn(),
};

describe("Test Case for Text Filter Card", () => {
  test("Snapshot", () => {
    const wrapper = shallow(
      <FilterCard state={mockProps.mockState} handleClick={mockProps.handleClick} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  test("check text", () => {
    const wrapper = shallow(
      <FilterCard state={mockProps.mockState} handleClick={mockProps.handleClick} />
    );
    expect(wrapper.find('[testid="autoDetection"]').text()).toBe("Automatic Detection");
  });
});
