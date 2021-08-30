import React from "react";
import { shallow } from "enzyme";
import AuthRoute from "../../../routes/AuthRoute";
import { isAuth } from "../../../services/localStorage";
import { mockUser } from "../../mockTest/services/mockServices";

jest.mock("../../../services/localStorage", () => {
  return {
    isAuth: jest.fn(),
  };
});

describe("Test Cases for Auth Route", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<AuthRoute />);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  test("Snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should render router", () => {
    expect(wrapper.find("Route")).toHaveLength(1);
  });

  test("check authentication", async () => {
    isAuth.mockImplementation(() => mockUser);
    await isAuth();
    expect(isAuth).toHaveBeenCalledTimes(1);
  });
});
