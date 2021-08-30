import React from "react";
import { shallow } from "enzyme";
import ConfirmDialog from "../../core/ConfirmDialog";

const setOpenFn = jest.fn();
const setConfirmFn = jest.fn();

describe("Test Cases for Confirm Dialog", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(
      <ConfirmDialog
        title="Are you sure?"
        children="You want to delete this user?"
        open={true}
        setOpen={setOpenFn}
        onConfirm={setConfirmFn}
      />
    );
  });

  test("Snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("initial Values", () => {
    expect(wrapper.find("#confirm-dialog").text()).toBe("Are you sure?");
    expect(wrapper.find("#content").text()).toBe("You want to delete this user?");
  });

  test("check functions", () => {
    expect(setOpenFn).toHaveBeenCalledTimes(0);
    expect(setConfirmFn).toHaveBeenCalledTimes(0);

    wrapper.find("#cancel").simulate("click");
    expect(setOpenFn).toHaveBeenCalledTimes(1);

    wrapper.find("#confirm").simulate("click");
    expect(setOpenFn).toHaveBeenCalledTimes(2);
    expect(setConfirmFn).toHaveBeenCalledTimes(1);

    wrapper.find("#dialog").getElement().props.onClose();
    expect(setOpenFn).toHaveBeenCalledTimes(3);
    expect(setConfirmFn).toHaveBeenCalledTimes(1);
  });
});
