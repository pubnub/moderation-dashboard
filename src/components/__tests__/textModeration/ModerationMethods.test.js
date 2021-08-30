import React from "react";
import { shallow } from "enzyme";
import ModerationMethods from "../../textModeration/ModerationMethods";

const mockManual = {
  wordListProfanity: "true",
};

const mockAutomatic = {
  automaticProfanity: "true",
};

const mockEmpty = {
  wordListProfanity: "false",
  automaticProfanity: "false",
};

describe("Test Case for Moderation Methods", () => {
  test("Snapshot", () => {
    const wrapper = shallow(<ModerationMethods state={mockManual} />);
    expect(wrapper).toMatchSnapshot();
  });

  test("check Automatic", () => {
    const wrapper = shallow(<ModerationMethods state={mockAutomatic} />);
    expect(wrapper.find("AutomaticProfanityMethod").exists()).toBe(true);
    expect(wrapper.find("WordListProfanityMethod").exists()).toBeFalsy();
  });

  test("check Manual", () => {
    const wrapper = shallow(<ModerationMethods state={mockManual} />);
    expect(wrapper.find("WordListProfanityMethod").exists()).toBe(true);
    expect(wrapper.find("AutomaticProfanityMethod").exists()).toBeFalsy();
  });

  test("check Empty", () => {
    const wrapper = shallow(<ModerationMethods state={mockEmpty} />);
    expect(wrapper.find("WordListProfanityMethod").exists()).toBeFalsy();
    expect(wrapper.find("AutomaticProfanityMethod").exists()).toBeFalsy();
  });
});
