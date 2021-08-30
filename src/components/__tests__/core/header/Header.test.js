import React from "react";
import { shallow } from "enzyme";
import Header from "../../../core/header/Header";

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

describe("Test Cases for Header", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<Header />);
  });

  test("Snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
