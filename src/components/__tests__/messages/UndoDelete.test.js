import React from "react";
import { shallow } from "enzyme";
import UndoDelete from "../../messages/UndoDelete";
import { deleteMessageAction } from "../../../services/pubnub";

const mockSetFn = jest.fn();
jest.mock("../../../services/pubnub", () => ({
  deleteMessageAction: jest.fn(),
}));

describe("Test Case For Undo Delete", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(
      <UndoDelete
        title="Are you sure?"
        children="You want to recover the message"
        open={true}
        setOpen={mockSetFn}
        channel="pro.one"
        message={[]}
      />
    );
  });

  test("Snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("check handleUndoClick", () => {
    deleteMessageAction.mockImplementationOnce(() => ({ data: [] }));
    wrapper.find("#undo").simulate("click");
    expect(deleteMessageAction).toHaveBeenCalledTimes(1);
  });

  test("check inline functions", () => {
    expect(mockSetFn).toHaveBeenCalledTimes(0);
    wrapper.find("#close").getElement().props.onClick();
    expect(mockSetFn).toHaveBeenCalledTimes(1);

    wrapper.find("#dialog").getElement().props.onClose();
    expect(mockSetFn).toHaveBeenCalledTimes(2);
  });
});
