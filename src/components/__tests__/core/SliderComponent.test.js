import React from "react";
import { shallow } from "enzyme";
import SliderComponent from "../../core/SliderComponent";

describe("Test Cases for Slider Component", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(
      <SliderComponent value={0.75} onChange={jest.fn()} name="sightengineRiskFactorThreshold" />
    );
  });

  test("Snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
