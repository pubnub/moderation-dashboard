import React from "react";
import { shallow } from "enzyme";
import Routes from "../../../routes/Routes";

describe("Test Cases for Routes", () => {
  test("Snapshot", () => {
    const wrapper = shallow(<Routes />);
    expect(wrapper).toMatchSnapshot();
  });
});
