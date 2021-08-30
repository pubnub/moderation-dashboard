import React from "react";
import { shallow } from "enzyme";
import Breadcrumb from "../../../core/header/Breadcrumb";

describe("Test Cases for Breadcrumb", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<Breadcrumb currentPage={1} />);
  });

  test("Snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
