import React from "react";
import { shallow } from "enzyme";
import WordListProfanityMethod from "../../../textModeration/wordListModeration/WordListProfanityMethod";

const mockProps = {
  wordList: {
    wordListChannel: "initialText",
    applyToAllChannelIdsWordlist: true,
    wordsListPatternError: false,
    wordListLanguage: "Hindi",
    wordListModType: "Mask-word",
    wordListReRouteMessages: false,
    wordsListMaskCharError: false,
    wordsListChannelError: false,
    wordListCharacterToMaskWith: "*",
  },
  textModerationToggle: false,
  wordListProfanity: false,
  automaticProfanity: false,
  channelOnChange: false,
  saveLoading: false,
  initialLoading: true,
  errorStatus: false,
  successStatus: false,
  errorMsg: "",
  successMsg: "",
};
const mockProfanityList = {
  English: "",
  Hindi: "Bakwaas, Chutiye",
  French: "",
  Portugese: "",
  Spanish: "",
};

describe("Word List Text Moderation", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(
      <WordListProfanityMethod
        state={mockProps}
        profanityList={mockProfanityList}
        setState={jest.fn()}
        setProfanityList={jest.fn()}
      />
    );
  });

  test("Snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Contains Labels", () => {
    expect(wrapper.find("[testId='Channel_Id']").text()).toBe("Channel ID");
    expect(wrapper.find('[testid="allChannelIdText"]').text()).toBe("Apply to All Channel IDs");
    expect(wrapper.find('[testId="language"]').text()).toBe("Language");
    expect(wrapper.find('[testId="WordList"]').text()).toBe("Word List");
    expect(wrapper.find('[testid="defaultWordsLabel"]').text()).toBe("Use Default words");
    expect(wrapper.find('[testId="MaskOrBlock"]').text()).toBe("When Profanity is detected");
    expect(wrapper.find('[testId="maskLabel"]').text()).toBe("Set a masking character");
    expect(wrapper.find('[testid="ReRouteLabel"]').text()).toBe("Route messages to");
  });

  test("Check initial Values", () => {
    expect(wrapper.find("#channelId").getElement().props.value).toBe("initialText");
    expect(wrapper.find("#wordListLanguage").getElement().props.value).toBe("Hindi");
    expect(wrapper.find("#defaultWordsBox").getElement().props.value).toBe("Bakwaas, Chutiye");
    expect(wrapper.find("#MaskOrBlockOption").getElement().props.value).toBe("Mask-word");
    expect(wrapper.find("#maskChar").getElement().props.value).toBe("*");

    expect(wrapper.find("#channelId").getElement().props.placeholder).toBe("Channel");
    expect(wrapper.find("#defaultWordsBox").getElement().props.placeholder).toBe(
      "comma,separated,list,of,words"
    );

    expect(wrapper.find("#maskChar").getElement().props.placeholder).toBe("Set");
  });

  test("Check CheckBoxes", () => {
    expect(wrapper.find("#allChannelIdcheckBox").getElement().props.checked).toBe(true);
    expect(wrapper.find("#reRouteCheckBox").getElement().props.checked).toBe(false);
  });

  test("Word Handler", () => {
    const ChannelChange = wrapper.find("#channelId").simulate("change", {
      target: { name: "wordListChannel", value: "initialText" },
    });
    expect(ChannelChange).toBeTruthy();

    const LangChange = wrapper.find("#wordListLanguage").simulate("change", {
      target: { name: "wordListLanguage", value: "Hindi" },
    });
    expect(LangChange).toBeTruthy();

    const WordChange = wrapper.find("#defaultWordsBox").simulate("change", {
      target: { name: "wordListLanguageWords", value: "Hindi" },
    });
    expect(WordChange).toBeTruthy();

    const WordListChange = wrapper.find("#MaskOrBlockOption").simulate("change", {
      target: { name: "wordListModtype", value: "Mask-word" },
    });
    expect(WordListChange).toBeTruthy();

    const MaskCharChange = wrapper.find("#maskChar").simulate("change", {
      target: { name: "wordListCharacterToMaskWith", value: "*" },
    });
    expect(MaskCharChange).toBeTruthy();

    const ReRouteChange = wrapper.find("#reRouteCheckBox").simulate("change", {
      target: { name: "wordListRerouteMessage", checked: true },
    });
    expect(ReRouteChange).toBeTruthy();

    const AllChannelTrue = wrapper.find("#allChannelIdcheckBox").simulate("change", {
      target: { checked: true },
    });
    expect(AllChannelTrue).toBeTruthy();

    const AllChannelFalse = wrapper.find("#allChannelIdcheckBox").simulate("change", {
      target: { checked: false },
    });
    expect(AllChannelFalse).toBeTruthy();
  });

  test("Check Save Button", () => {
    expect(wrapper.find("#save").text()).toBe("Save");
  });
});
