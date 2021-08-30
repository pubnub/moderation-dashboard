import React from "react";
import { mount, shallow } from "enzyme";
import ImageModeration from "../../imageModeration";
import { act } from "react-dom/test-utils";

import { selectedAppFromLS, constantBoolean } from "../../../utils/helpers";
import { mockPubNubApplications } from "../../mockTest/mockPubnubAccounts";
import { handleImageModerationSave } from "../../../utils/imageModeration";
jest.mock("../../../utils/imageModeration", () => {
  return {
    handleImageModerationSave: jest.fn(),
  };
});
jest.mock("../../../utils/helpers", () => {
  return {
    selectedAppFromLS: jest.fn(),
    constantBoolean: jest.fn(),
    pnFunctionFilterStatus: jest.fn(),
  };
});
let mockState = {
  applyToAllChannelIds: true,
  initialLoading: false,
  imageModerationToggle: "true",
  channelId: "initialText",
  channelIdError: false,
  sightengineAPIUserError: false,
  sightengineAPIKeyError: false,
  sightengineWorkflowIdError: false,
  channelOnChange: true,
  toolForImageModeration: "sightengine",
  sightengineAPIUser: "236156668",
  sightengineAPIKey: "NSvtoAtDvv8kMDDANGqrase",
  sightengineWorkflowId: "wfl_UyHigiCRqMCDT5wVHLZT",
  sightengineRiskFactorThreshold: "0.5",
  reRouteMessages: "true",
  error: {
    status: false,
    msg: "",
  },
  successMsg: "",
  errorMsg: "",
  successStatus: false,
  errorStatus: false,
  saveLoading: false,
};
const clickFn = jest.fn();
describe("Image Moderation Test Cases", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(
      <ImageModeration state={mockState} setState={jest.fn()} handleSave={clickFn} />
    );
  });

  test("Snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Check Title and SubTitle", () => {
    wrapper = shallow(<ImageModeration />);
    expect(wrapper.find("[testid='title']").text()).toBe("Image Moderation");
    expect(wrapper.find("[testid='subTitle']").text()).toBe("Profanity detection method");
  });

  test("Has components", () => {
    expect(wrapper.find("FilterCard").exists()).toBe(true);
    expect(wrapper.find("AutomaticImageModeration").exists()).toBe(true);
  });

  test("check on handle save", async () => {
    wrapper = shallow(
      <ImageModeration state={mockState} setState={jest.fn()} handleSave={clickFn} />
    );
    await act(async () => {
      //change to state errorStatus
      wrapper
        .find("AutomaticImageModeration")
        .getElements()[0]
        .props.setState({
          ...mockState,
          errorStatus: true,
        });

      const result = await wrapper
        .find("AutomaticImageModeration")
        .getElements()[0]
        .props.handleSave({ preventDefault: jest.fn() });
      expect(result).toBeUndefined();
      expect(
        wrapper.find("AutomaticImageModeration").getElements()[0].props.state.errorStatus
      ).toBe(true);

      // change to state channelId
      wrapper
        .find("AutomaticImageModeration")
        .getElements()[0]
        .props.setState({
          ...mockState,
          channelId: "",
        });

      await wrapper
        .find("AutomaticImageModeration")
        .getElements()[0]
        .props.handleSave({ preventDefault: jest.fn() });
      expect(wrapper.find("AutomaticImageModeration").getElements()[0].props.state.errorMsg).toBe(
        "Channel Id is required."
      );

      // change to state sightengineAPIUser
      wrapper
        .find("AutomaticImageModeration")
        .getElements()[0]
        .props.setState({
          ...mockState,
          sightengineAPIUser: "",
        });

      await wrapper
        .find("AutomaticImageModeration")
        .getElements()[0]
        .props.handleSave({ preventDefault: jest.fn() });
      expect(
        wrapper.find("AutomaticImageModeration").getElements()[0].props.state
          .sightengineAPIUserError
      ).toBe(true);

      // change to state sightengineAPIKey
      wrapper
        .find("AutomaticImageModeration")
        .getElements()[0]
        .props.setState({
          ...mockState,
          sightengineAPIKey: "",
        });

      await wrapper
        .find("AutomaticImageModeration")
        .getElements()[0]
        .props.handleSave({ preventDefault: jest.fn() });
      expect(
        wrapper.find("AutomaticImageModeration").getElements()[0].props.state.sightengineAPIKeyError
      ).toBe(true);

      // change to state sightengineWorkflowId
      wrapper
        .find("AutomaticImageModeration")
        .getElements()[0]
        .props.setState({
          ...mockState,
          sightengineWorkflowId: "",
        });

      await wrapper
        .find("AutomaticImageModeration")
        .getElements()[0]
        .props.handleSave({ preventDefault: jest.fn() });
      expect(
        wrapper.find("AutomaticImageModeration").getElements()[0].props.state
          .sightengineWorkflowIdError
      ).toBe(true);

      // final state change
      wrapper
        .find("AutomaticImageModeration")
        .getElements()[0]
        .props.setState({
          ...mockState,
        });
      constantBoolean.mockImplementation(() => true);
      selectedAppFromLS.mockImplementation(() => mockPubNubApplications.result[0]);
      handleImageModerationSave.mockImplementationOnce(() => {
        throw new Error("Failed to fetch PubNub functions");
      });
      await wrapper
        .find("AutomaticImageModeration")
        .getElements()[0]
        .props.handleSave({ preventDefault: jest.fn() });

      expect(wrapper.find("AutomaticImageModeration").getElements()[0].props.state.errorMsg).toBe(
        "Failed to fetch PubNub functions"
      );

      wrapper
        .find("AutomaticImageModeration")
        .getElements()[0]
        .props.setState({
          ...mockState,
        });
      handleImageModerationSave.mockImplementationOnce(() => true);

      await wrapper
        .find("AutomaticImageModeration")
        .getElements()[0]
        .props.handleSave({ preventDefault: jest.fn() });
      expect(handleImageModerationSave).toHaveBeenCalledTimes(2);
    });
  });
});
