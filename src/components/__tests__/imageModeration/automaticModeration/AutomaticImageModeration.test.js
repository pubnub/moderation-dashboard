import React from "react";
import { shallow } from "enzyme";
import AutomaticImageModeration from "../../../imageModeration/automaticModeration/AutomaticImageModeration";

const mockState = {
  applyToAllChannelIds: true,
  initialLoading: false,
  imageModerationToggle: "",
  channelId: "initialText",
  channelIdError: false,
  sightengineAPIUserError: false,
  sightengineAPIKeyError: false,
  sightengineWorkflowIdError: false,
  channelOnChange: false,
  toolForImageModeration: "sightengine",
  sightengineAPIUser: "",
  sightengineAPIKey: "",
  sightengineWorkflowId: "",
  sightengineRiskFactorThreshold: "",
  reRouteMessages: "",
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

const expectValue = (a, b) => {
  expect(a).toBe(b);
};

describe("Automatic Image Moderation Test Cases", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<AutomaticImageModeration state={mockState} setState={jest.fn()} />);
  });

  test("Snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Contains Labels", () => {
    expectValue(wrapper.find("[testid='Channel_ID']").text(), "Channel ID");
    expectValue(wrapper.find('[testid="Apply_All"]').text(), "Apply to All Channel IDs");
    expectValue(
      wrapper.find("#SelectTool").text(),
      "Select third party tool for Automatic Detection"
    );
    expectValue(wrapper.find('[testId="ApiUser"]').text(), "Sightengine API User");
    expectValue(wrapper.find('[testId="Api_Key"]').text(), "Sightengine API Key");
    expectValue(wrapper.find('[testId="workFlowId"]').text(), "Sightengine Workflow ID");
    expectValue(wrapper.find('[testId="riskFactor"]').text(), "Sightengine Risk Factor");
    expectValue(wrapper.find('[testid="reRouteMsg"]').text(), "Route messages to");
  });

  test("Check initial Values", () => {
    expect(wrapper.find("#channelId").getElement().props.value).toBe("initialText");
    expect(wrapper.find("#ImageModerationTool").getElement().props.value).toBe("sightengine");
    expect(wrapper.find("#sightEngineAPIUser").getElement().props.value).toBe("");
    expect(wrapper.find("#apiKey").getElement().props.value).toBe("");
    expect(wrapper.find("#sightEngineWorkflowId").getElement().props.value).toBe("");
    expect(wrapper.find("#riskFactorSlider").getElement().props.value).toBe("");

    expect(wrapper.find("#channelId").getElement().props.placeholder).toBe("channel ID");
    expect(wrapper.find("#sightEngineAPIUser").getElement().props.placeholder).toBe(
      "Sightengine API User"
    );

    expect(wrapper.find("#apiKey").getElement().props.placeholder).toBe("Sightengine API Key");
    expect(wrapper.find("#sightEngineWorkflowId").getElement().props.placeholder).toBe(
      "Sightengine Workflow ID"
    );
  });

  test("Check CheckBoxes", () => {
    expect(wrapper.find("#checkBox").getElement().props.checked).toBe(true);
    expect(wrapper.find("#reRouteCheckBox").getElement().props.checked).toBe(false);
  });

  test("Check Save Button", () => {
    expect(wrapper.find("#save").text()).toBe("Save");
  });

  test("SightEngine Handler", () => {
    const ChannelChange = wrapper.find("#channelId").simulate("change", {
      target: { name: "channelId", value: "newChannelId" },
    });
    expect(ChannelChange).toBeTruthy();

    const ToolChange = wrapper.find("#ImageModerationTool").simulate("change", {
      target: { name: "toolForImageModeration", value: "newSightEngine" },
    });
    expect(ToolChange).toBeTruthy();

    const ApiUserChange = wrapper.find("#sightEngineAPIUser").simulate("change", {
      target: { name: "sightengineAPIUser", value: "newApiUser" },
    });
    expect(ApiUserChange).toBeTruthy();

    const ApiKeyChange = wrapper.find("#apiKey").simulate("change", {
      target: { name: "sightengineAPIKey", value: "newApiKey" },
    });
    expect(ApiKeyChange).toBeTruthy();

    const WorkFlowIdChange = wrapper.find("#sightEngineWorkflowId").simulate("change", {
      target: { name: "sightengineWorkflowId", value: "newWorkId" },
    });
    expect(WorkFlowIdChange).toBeTruthy();

    const ReRouteChange = wrapper.find("#reRouteCheckBox").simulate("change", {
      target: { name: "reRouteMessages", checked: true },
    });
    expect(ReRouteChange).toBeTruthy();

    const RiskChange = wrapper
      .find("#riskFactorSlider")
      .simulate("change", { target: { value: "" } }, "newRisk");
    expect(RiskChange).toBeTruthy();

    const ApplyAllTrue = wrapper.find("#checkBox").simulate("change", {
      target: { name: "applyToAllChannelIds", checked: true },
    });
    expect(ApplyAllTrue).toBeTruthy();

    const ApplyAllFalse = wrapper.find("#checkBox").simulate("change", {
      target: { name: "applyToAllChannelIds", checked: false },
    });
    expect(ApplyAllFalse).toBeTruthy();
  });
});
