import React from "react";
import { shallow } from "enzyme";
import PrivateRoute from "../../../routes/PrivateRoute";

describe("Test Cases for Private Route", () => {
  test("Snapshot", () => {
    const wrapper = shallow(<PrivateRoute />);
    expect(wrapper).toMatchSnapshot();
  });
});
