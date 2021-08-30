import React from "react";
import { shallow } from "enzyme";
import Sidebar from "../../core/Sidebar";

jest.mock("react-router-dom", () => ({
  useHistory: jest.fn().mockReturnValue({
    length: 8,
    action: "PUSH",
    location: {
      pathname: "/overview",
      search: "",
      hash: "",
      key: "t2wbs9",
    },
  }),
}));

describe("Test Cases for Sidebar", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<Sidebar />);
  });

  test("Snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
