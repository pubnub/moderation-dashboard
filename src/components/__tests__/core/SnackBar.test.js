import React from "react";
import { shallow } from "enzyme";
import SnackBar from "../../core/SnackBar";

describe("Test Cases for SnackBar", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<SnackBar status="info" msg="No applications found" />);
  });

  test("Snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("check handleClose", () => {
    expect(wrapper.find("#snackBar").getElement().props.open).toBeTruthy();

    wrapper.find("#snackBar").getElement().props.onClose("", "clickaway");
    expect(wrapper.find("#snackBar").getElement().props.open).toBeTruthy();

    wrapper.find("#snackBar").getElement().props.onClose("", "");
    expect(wrapper.find("#snackBar").getElement().props.open).toBeFalsy();
  });
});
