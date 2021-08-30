import React from "react";
import { shallow } from "enzyme";
import MessageContent from "../../messages/MessageContent";

const mockMsg = (text) => ({
  actions: text,
  text: "Delete it",
  file: {
    url: "https://abc.com",
  },
  reason: "Any Reason",
  moderatedMessage: "****",
  originalMessage: "shit",
  image: "",
  imageReason: ["Some Reason", "Other Reason"],
});
const mockDeleteFn = jest.fn();
const mockUpdateFn = jest.fn();
const mockUndoFn = jest.fn();

describe("Test Case For Message Content", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(
      <MessageContent
        message={mockMsg("deleted")}
        toggledVal="chat"
        confirmDelete={mockDeleteFn}
        updateMessage={mockUpdateFn}
        confirmUndo={mockUndoFn}
        index={1}
      />
    );
  });

  test("Snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('check Functions with actions as "deleted"', () => {
    expect(mockUndoFn).toHaveBeenCalledTimes(0);
    wrapper.find("#undoIcon").simulate("click");
    expect(mockUndoFn).toHaveBeenCalledTimes(1);
  });

  test("check Functions with actions as empty", () => {
    wrapper = shallow(
      <MessageContent
        message={mockMsg("")}
        toggledVal="chat"
        confirmDelete={mockDeleteFn}
        updateMessage={mockUpdateFn}
        confirmUndo={mockUndoFn}
        index={1}
      />
    );

    expect(mockUpdateFn).toHaveBeenCalledTimes(0);
    wrapper.find("#updateIcon").simulate("click");
    expect(mockUpdateFn).toHaveBeenCalledTimes(1);

    expect(mockDeleteFn).toHaveBeenCalledTimes(0);
    wrapper.find("#deleteIcon").simulate("click");
    expect(mockDeleteFn).toHaveBeenCalledTimes(1);
  });
});
