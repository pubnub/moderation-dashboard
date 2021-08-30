import React from "react";
import { shallow } from "enzyme";
import AddChannelMetadataModal from "../../channels/AddChannelMetadataModal";

const mockFn = jest.fn();

describe("Test Cases for Add Channel Metadata Modal", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<AddChannelMetadataModal isAdded={mockFn} />);
  });

  test("Snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("check functions", () => {
    expect(wrapper.find("#dialog").getElement().props.open).toBeFalsy();

    wrapper.find("#addChannel").simulate("click");
    expect(wrapper.find("#dialog").getElement().props.open).toBeTruthy();

    const add = wrapper.find("#add").simulate("click");
    expect(add).toBeTruthy();

    wrapper.find("#closeButton").simulate("click");
    expect(wrapper.find("#dialog").getElement().props.open).toBeFalsy();
  });
});
