import React from "react";
import { shallow, mount } from "enzyme";
import EditMessage from "../../messages/EditMessage";
import { IconButton, TextField } from "@material-ui/core";
import { addEditMessageAction, deleteMessageAction } from "../../../services/pubnub";

const mockUpdateFn = jest.fn();
jest.mock("../../../services/pubnub", () => ({
  addEditMessageAction: jest.fn(),
  deleteMessageAction: jest.fn(),
}));

describe("Test Case For Chat", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(
      <EditMessage
        channel="pro.one"
        message={{
          text: "abc",
          timetoken: 123,
        }}
        updated={mockUpdateFn}
        messagesLength={30}
        pubnub=""
      />
    );
  });

  test("Snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("check handleInputChange", async () => {
    expect(wrapper.find("#message").getElement().props.value).toBe("");
    await wrapper.find("#message").simulate("change", { target: { value: "newText" } });
    expect(wrapper.find(TextField).getElement().props.value).toBe("newText");

    deleteMessageAction.mockImplementationOnce(() => [{}]);
    addEditMessageAction.mockImplementationOnce(() => [{}]);
    wrapper
      .find("#message")
      .getElement()
      .props.InputProps.endAdornment.props.children.props.onClick();
    expect(addEditMessageAction).toHaveBeenCalledTimes(1);
  });

  test("check functions", async () => {
    wrapper = mount(
      <EditMessage
        channel="pro.one"
        message={{
          text: "abc",
          timetoken: 123,
        }}
        updated={mockUpdateFn}
        messagesLength={30}
        pubnub=""
      />
    );

    expect(mockUpdateFn).toHaveBeenCalledTimes(0);
    wrapper.find(IconButton).at(0).simulate("click");
    expect(mockUpdateFn).toHaveBeenCalledTimes(1);
  });
});
