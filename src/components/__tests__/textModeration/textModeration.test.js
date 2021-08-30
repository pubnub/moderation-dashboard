import React from "react";
import { mount, shallow } from "enzyme";
import TextModeration from "../../textModeration";
import profanityFunctionForImage from "../../../utils/profanityFunctionForImage";
import { handleImageModerationSave } from "../../../utils/imageModeration";
import { act } from "react-dom/test-utils";

import {
  fetchWords,
  constantBoolean,
  getProfanityWordsByLanguage,
  selectedAppFromLS,
  filterFunction,
  filterEventHandler,
  combineLanguageWords,
  groupLanguageWords,
  filterImageFunction,
} from "../../../utils/helpers";

import { fetchPubNubFunction, updatePubNubEventHandler } from "../../../services/pubnub";

import { mockTextfunctionResponseListing } from "../../mockTest/mockTextPubnubFunctionResponse";
import { mockPubNubApplications } from "../../mockTest/mockPubnubAccounts";
import { mockTextModerationProps } from "../../mockTest/mockTextProfanity";

jest.mock("../../../utils/helpers", () => {
  return {
    fetchWords: jest.fn(),
    constantBoolean: jest.fn(),
    getProfanityWordsByLanguage: jest.fn(),
    selectedAppFromLS: jest.fn(),
    filterFunction: jest.fn(),
    filterEventHandler: jest.fn(),
    combineLanguageWords: jest.fn(),
    groupLanguageWords: jest.fn(),
    filterImageFunction: jest.fn(),
  };
});
getProfanityWordsByLanguage.mockImplementation(() => "shit");

jest.mock("../../../services/pubnub", () => {
  return {
    fetchPubNubFunction: jest.fn(),
    startPubNubFunction: jest.fn(),
    createPubNubEventHandler: jest.fn(),
    createPubNubFunction: jest.fn(),
    stopPubNubFunction: jest.fn(),
    updatePubNubEventHandler: jest.fn(),
  };
});

jest.mock("../../../utils/imageModeration", () => {
  return {
    handleImageModerationSave: jest.fn(),
  };
});

profanityFunctionForImage.functionToMock = jest.fn().mockReturnValue("run()");

const clickFn = jest.fn();
const handleClickFn = jest.fn();
const filterFunctionByName = () =>
  filterFunction.mockImplementation(() =>
    mockTextfunctionResponseListing.payload.filter((item) => item.name === `KEY-1042278`)
  );

describe("Text Moderation List Test Cases", () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount(
      <TextModeration
        state={mockTextModerationProps()}
        setState={jest.fn()}
        handleSave={clickFn}
        handleClick={handleClickFn}
        defaultWords={jest.fn()}
        theme={{}}
      />
    );
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  test("Text Moderation List Header", () => {
    expect(wrapper.find("[testid='title']").getElements()[0].props.children[0]).toBe(
      "Text Moderation"
    );
    expect(wrapper.find("[testid='sub_title']").getElements()[0].props.children).toBe(
      "Profanity detection method"
    );
  });

  test("Text Moderation Snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Have Header Tools and Table", () => {
    expect(wrapper.find("FilterCard").exists()).toBe(true);
    expect(wrapper.find("ModerationMethods").exists()).toBe(true);
  });

  test("check of defaultWords method", async () => {
    await act(async () => {
      getProfanityWordsByLanguage.mockImplementation(() => "shit");

      fetchWords.mockImplementation(() => ({
        status: 200,
      }));
      expect(fetchWords).toHaveBeenCalledTimes(0);

      expect(
        typeof (await wrapper
          .find("ModerationMethods")
          .getElements()[0]
          .props.defaultWords("English"))
      ).toBeTruthy();
      expect(fetchWords).toHaveBeenCalledTimes(1);
    });
  });

  test("check of event", async () => {
    wrapper = shallow(
      <TextModeration
        state={mockTextModerationProps()}
        setState={jest.fn()}
        handleSave={clickFn}
        handleClick={handleClickFn}
        defaultWords={jest.fn()}
        theme={{}}
      />
    );
    await act(async () => {
      try {
        getProfanityWordsByLanguage.mockImplementation(() => "shit");
        selectedAppFromLS.mockImplementation(() => mockPubNubApplications.result[0]);

        constantBoolean.mockImplementation(() => true);
        filterFunctionByName();
        filterEventHandler.mockImplementation(() => []);
        filterImageFunction.mockImplementation(() => []);
        combineLanguageWords.mockImplementation(() => "shit");
        groupLanguageWords.mockImplementation(() => "shit");

        // filter card event
        const handleWordFn = wrapper
          .find("FilterCard")
          .getElements()[0]
          .props.handleClick("wordListMethod")({ preventDefault: jest.fn() });
        expect(typeof handleWordFn).toBeTruthy();

        const handleAutoFn = wrapper
          .find("FilterCard")
          .getElements()[0]
          .props.handleClick("automaticMethod")({ preventDefault: jest.fn() });
        expect(typeof handleAutoFn).toBeTruthy();

        fetchPubNubFunction.mockImplementation(() => mockTextfunctionResponseListing);
        expect(fetchPubNubFunction).toHaveBeenCalledTimes(0);
        const result = await wrapper
          .find("ModerationMethods")
          .getElements()[0]
          .props.handleSave({ preventDefault: jest.fn() });
        expect(clickFn).toHaveBeenCalledTimes(0);
        expect(fetchPubNubFunction).toHaveBeenCalledTimes(1);
        expect(filterEventHandler).toHaveBeenCalledTimes(1);
        expect(typeof result).toBeTruthy();

        expect(updatePubNubEventHandler).toHaveBeenCalledTimes(0);
        filterEventHandler.mockImplementationOnce(() => [1]);
        handleImageModerationSave.mockImplementationOnce(() => true);
        await wrapper
          .find("ModerationMethods")
          .getElements()[0]
          .props.handleSave({ preventDefault: jest.fn() });
        expect(updatePubNubEventHandler).toHaveBeenCalledTimes(1);

        // first time create the function
        filterFunction.mockImplementation(() => []);
        await wrapper
          .find("ModerationMethods")
          .getElements()[0]
          .props.handleSave({ preventDefault: jest.fn() });
        expect(handleImageModerationSave).toHaveBeenCalledTimes(2);

        updatePubNubEventHandler.mockImplementation(() => {
          throw new Error();
        });
        filterEventHandler.mockImplementationOnce(() => [2]);
        filterFunctionByName();
        constantBoolean.mockImplementation(() => false);
        getProfanityWordsByLanguage.mockImplementation(() => "kutta");

        await wrapper
          .find("ModerationMethods")
          .getElements()[0]
          .props.handleSave({ preventDefault: jest.fn() });
        expect(updatePubNubEventHandler).toHaveBeenCalledTimes(1);
      } catch (e) {
        expect(e).toMatch("error");
      }
    });
  });
});
