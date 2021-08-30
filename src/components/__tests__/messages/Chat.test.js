import React from "react";
import { mount } from "enzyme";
import Chat from "../../messages/Chat";
import { mockMessages } from "../../mockTest/mockMessages";
import { softDeleteMessage } from "../../../services/pubnub";
import { act } from "react-dom/test-utils";

const mockEditFn = jest.fn();
const mockUpdateFn = jest.fn();
jest.mock("../../../services/pubnub", () => ({
  softDeleteMessage: jest.fn(),
}));
window.HTMLElement.prototype.scrollIntoView = jest.fn();

describe("Test Case For Chat", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(
      <Chat
        channel="pro.one"
        isLoading={true}
        messageToEdit={[]}
        messages={mockMessages}
        toggledVal="chat"
        setMessageToEdit={mockEditFn}
        updated={mockUpdateFn}
      />
    );
  });

  test("Sanpshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should render router", () => {
    expect(wrapper.find("ConfirmDialog")).toHaveLength(1);
    expect(wrapper.find("UndoDelete")).toHaveLength(1);
    expect(wrapper.find("EditMessage")).toHaveLength(1);
  });

  test("check functions", async () => {
    softDeleteMessage.mockImplementationOnce(() => ({
      actionTimetoken: 123,
    }));

    expect(mockUpdateFn).toHaveBeenCalledTimes(0);
    await wrapper.find("#delete").getElement().props.onConfirm();
    expect(mockUpdateFn).toHaveBeenCalledTimes(1);
    await act(async () => {
      expect(
        wrapper
          .find("MessageContent")
          .getElements()[0]
          .props.confirmDelete({ preventDefault: jest.fn() }, mockMessages)
      ).toBeUndefined();
      expect(
        wrapper
          .find("MessageContent")
          .getElements()[0]
          .props.updateMessage({ preventDefault: jest.fn() }, mockMessages)
      ).toBeUndefined();
      expect(
        wrapper
          .find("MessageContent")
          .getElements()[0]
          .props.confirmUndo({ preventDefault: jest.fn() }, mockMessages)
      ).toBeUndefined();
    });
  });
});
