import React from "react";
import { shallow } from "enzyme";
import AutomaticProfanityMethod from "../../../textModeration/automaticModeration/AutomaticProfanityMethod";
import { mockTextModerationProps } from "../../../mockTest/mockTextProfanity";

const expectTextValue = (a, b) => {
  expect(a.text()).toBe(b);
};

describe("Automatic Text Moderation", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(
      <AutomaticProfanityMethod state={mockTextModerationProps()} setState={jest.fn()} />
    );
  });

  test("Snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Check Labels", () => {
    expectTextValue(wrapper.find('[testId="Channel_Id"]'), "Channel ID");
    expectTextValue(wrapper.find('[testId="applyAll_channel"]'), "Apply to All Channel IDs");
    expectTextValue(
      wrapper.find('[testId="SelectToolLabel"]'),
      "Select third party tool for Automatic Detection"
    );
    expectTextValue(wrapper.find('[testid="tisaneApiKey"]'), "Tisane.ai API Key");
    expectTextValue(wrapper.find('[testid="lang"]'), "Language");
    expectTextValue(
      wrapper.find('[testid="BigotryLevel"]'),
      "Filter Level For Bigotry (Hate Speech)"
    );
    expectTextValue(
      wrapper.find('[testid="CyberBullying"]'),
      "Filter Level For Personal Attacks (Cyberbullying)"
    );
    expectTextValue(wrapper.find('[testid="criminalLevel"]'), "Filter Level For Criminal Activity");
    expectTextValue(wrapper.find('[testid="sexualLevel"]'), "Filter Level For Sexual Advances");
    expectTextValue(wrapper.find('[testid="ProfanityLevel"]'), "Filter Level For Profanity");
    expectTextValue(wrapper.find('[testid="blockOrMask"]'), "When profanity is detected");
    expectTextValue(wrapper.find('[testid="setChar"]'), "Set a masking character");
    expectTextValue(wrapper.find('[testid="reRouteMsg"]'), "Route messages to");
  });

  test("Check initial Values", () => {
    expect(wrapper.find("#channelId").getElement().props.value).toBe("*");
    expect(wrapper.find("#selectTool").getElement().props.value).toBe("tisane");
    expect(wrapper.find("#tisaneApiKey").getElement().props.value).toBe("");
    expect(wrapper.find("#lang").getElement().props.value).toBe("Hindi");
    expect(wrapper.find("#BigotryLevel").getElement().props.value).toBe(0.5);
    expect(wrapper.find("#CyberBullying").getElement().props.value).toBe(0.5);
    expect(wrapper.find("#criminalLevel").getElement().props.value).toBe(0.5);
    expect(wrapper.find("#sexualLevel").getElement().props.value).toBe(0.5);
    expect(wrapper.find("#ProfanityLevel").getElement().props.value).toBe(0.5);
    expect(wrapper.find("#blockOrMask").getElement().props.value).toBe("mask-message");
    expect(wrapper.find("#setChar").getElement().props.value).toBe("*");
  });

  test("Check Placeholders", () => {
    expect(wrapper.find("#channelId").getElement().props.placeholder).toBe(
      "Enter channel or channel pattern here Under18.*, Under18"
    );
    expect(wrapper.find("#tisaneApiKey").getElement().props.placeholder).toBe("Tisane.ai API key");
    expect(wrapper.find("#setChar").getElement().props.placeholder).toBe("Set");
  });

  test("Tisane Handler", () => {
    const LangChange = wrapper.find("#lang").simulate("change", {
      target: { name: "tisaneLanguage", value: "Spanish" },
    });
    expect(LangChange).toBeTruthy();

    const KeyChange = wrapper.find("#tisaneApiKey").simulate("change", {
      target: { name: "tisaneApiKey", value: "newKey" },
    });
    expect(KeyChange).toBeTruthy();

    const CyberChange = wrapper
      .find("#CyberBullying")
      .simulate("change", { target: { value: "" } }, "newCyberValue");
    expect(CyberChange).toBeTruthy();

    const CriminalChange = wrapper
      .find("#criminalLevel")
      .simulate("change", { target: { value: "" } }, "newCriminalValue");
    expect(CriminalChange).toBeTruthy();

    const BigotryChange = wrapper
      .find("#BigotryLevel")
      .simulate("change", { target: { value: "" } }, "newBiogotry");
    expect(BigotryChange).toBeTruthy();

    const SexualChange = wrapper
      .find("#sexualLevel")
      .simulate("change", { target: { value: "" } }, "newSexual");
    expect(SexualChange).toBeTruthy();

    const ProfanityChange = wrapper
      .find("#ProfanityLevel")
      .simulate("change", { target: { value: "" } }, "newProfanityValue");
    expect(ProfanityChange).toBeTruthy();
  });

  test("Check CheckBoxes", () => {
    expect(wrapper.find("#applyAll").getElement().props.checked).toBe(true);
    expect(wrapper.find("#reRoute").getElement().props.checked).toBe(false);
  });

  test("Check Save Button", () => {
    expect(wrapper.find("#save").text()).toBe("Save");
  });

  test("SiftNinja Handler", () => {
    wrapper = shallow(
      <AutomaticProfanityMethod state={mockTextModerationProps("siftninja")} setState={jest.fn()} />
    );

    const ToolChange = wrapper.find("#selectTool").simulate("change", {
      target: { name: "toolForAutomaticDetection", value: "tisane" },
    });
    expect(ToolChange).toBeTruthy();

    const ChannelChange = wrapper.find("#channelId").simulate("change", {
      target: { name: "automaticDetectionChannel", value: "tisane" },
    });
    expect(ChannelChange).toBeTruthy();

    const ReRouteChange = wrapper.find("#reRoute").simulate("change", {
      target: { name: "automaticDetectionReRouteMessages", checked: false },
    });
    expect(ReRouteChange).toBeTruthy();

    const ModChange = wrapper.find("#blockOrMask").simulate("change", {
      target: { name: "automaticDetectionModType", value: "newModType" },
    });
    expect(ModChange).toBeTruthy();

    const VulgarChange = wrapper
      .find("#vulgarRiskFactor")
      .simulate("change", { target: { value: "" } }, "newVulgar");
    expect(VulgarChange).toBeTruthy();

    const SextingChange = wrapper
      .find("#SextingRisk")
      .simulate("change", { target: { value: "" } }, "newSextingValue");
    expect(SextingChange).toBeTruthy();

    const RacismChange = wrapper
      .find("#racismRisk")
      .simulate("change", { target: { value: "" } }, "newRacismValue");
    expect(RacismChange).toBeTruthy();

    const AccountChange = wrapper.find("#siftAccountName").simulate("change", {
      target: { name: "siftNinjaAccountName", value: "newAccount" },
    });
    expect(AccountChange).toBeTruthy();

    const SiftChannelChange = wrapper.find("#siftChannelName").simulate("change", {
      target: { name: "siftNinjaChannelName", value: "newAccount" },
    });
    expect(SiftChannelChange).toBeTruthy();

    const ApiKeyChange = wrapper.find("#siftApiKey").simulate("change", {
      target: { name: "siftNinjaApiKey", value: "newKey" },
    });
    expect(ApiKeyChange).toBeTruthy();

    const CharChange = wrapper.find("#setChar").simulate("change", {
      target: { name: "automaticDetectionCharacterToMaskWith", value: "@" },
    });
    expect(CharChange).toBeTruthy();

    const ApplyAllChannelTrue = wrapper
      .find("#applyAll")
      .simulate("change", { target: { checked: true } });
    expect(ApplyAllChannelTrue).toBeTruthy();

    const ApplyAllChannelFalse = wrapper
      .find("#applyAll")
      .simulate("change", { target: { checked: false } });
    expect(ApplyAllChannelFalse).toBeTruthy();
  });
});
