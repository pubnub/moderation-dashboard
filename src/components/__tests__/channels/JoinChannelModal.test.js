import React from "react";
import { shallow } from "enzyme";
import { JoinChannelModal } from "../../channels/JoinChannelModal";

const mockPushFn = jest.fn();
jest.mock("react-router", () => ({
  useHistory: () => ({
    push: mockPushFn,
  }),
}));

describe("Test Case For Join Channel Modal", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<JoinChannelModal />);
  });

  test("Snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("check Values", () => {
    expect(wrapper.find('[testid="channelId"]').text()).toBe("Channel ID");
    expect(wrapper.find("#channelId").getElement().props.placeholder).toBe("Enter Channel ID");
  });

  test("Check Buttons", () => {
    expect(wrapper.find("#joinChannelButton").text()).toBe("Join Channel");
    expect(wrapper.find("#cancelButton").text()).toBe("Cancel");
    expect(wrapper.find("#joinButton").text()).toBe("Join Channel");
  });

  test("check for handleClickOpen and handleClose", () => {
    expect(wrapper.find("#dialog").getElement().props.open).toBeFalsy();

    wrapper.find("#joinChannelButton").getElement().props.onClick();
    expect(wrapper.find("#dialog").getElement().props.open).toBeTruthy();

    wrapper.find("#dialog").getElement().props.onClose();
    expect(wrapper.find("#dialog").getElement().props.open).toBeFalsy();
  });

  test("check for joinChannel", () => {
    expect(wrapper.find("#channelId").getElement().props.helperText).toBe("");
    wrapper.find("#joinButton").simulate("click");
    expect(wrapper.find("#channelId").getElement().props.helperText).toBe("Channel is Required");

    expect(mockPushFn).toHaveBeenCalledTimes(0);
    wrapper
      .find("#channelId")
      .getElement()
      .props.onChange({ target: { value: "newText" } });
    wrapper.find("#joinButton").simulate("click");
    expect(mockPushFn).toHaveBeenCalledTimes(1);
  });
});
