import { mount } from "enzyme";
import LoginForm from "../../login/LoginForm.js";
import { render } from "@testing-library/react";
import { signIn } from "../../../services/auth";
import { mockSignInData } from "../../mockTest/services/mockSignInData";
import { act } from "react-dom/test-utils";
import { fetchAllAccounts, fetchAllApps } from "../../../services/pubnub";
import { mockAllAccounts, mockAllApps } from "../../mockTest/services/mockPubnubServices";

const mockPush = jest.fn();

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: mockPush,
  }),
}));

jest.mock("../../../services/auth", () => {
  return {
    signIn: jest.fn(),
  };
});

jest.mock("../../../services/pubnub", () => {
  return {
    fetchAllAccounts: jest.fn(),
    fetchAllApps: jest.fn(),
  };
});

describe("This suit will test the login functionality", () => {
  test("Snapshot of the LoginForm", () => {
    const { asFragment } = render(<LoginForm />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("Email check", () => {
    const wrapper = mount(<LoginForm />);
    wrapper.find("input[type='text']").simulate("change", {
      target: { name: "email", value: "test@pubnub.com" },
    });
    expect(wrapper.find("input[type='text']").getElement().props.value).toEqual("test@pubnub.com");
  });

  test("Password check", () => {
    const wrapper = mount(<LoginForm />);
    wrapper.find('input[type="password"]').simulate("change", {
      target: { name: "password", value: "pubnub@123" },
    });
    expect(wrapper.find("input[type='password']").getElement().props.value).toEqual("pubnub@123");
  });

  test("on submit form", async () => {
    const wrapper = mount(<LoginForm />);
    await act(async () => {
      signIn.mockImplementationOnce(() => mockSignInData.data);
      expect(signIn).toHaveBeenCalledTimes(0);

      fetchAllAccounts.mockImplementationOnce(() => mockAllAccounts.data);
      fetchAllApps.mockImplementationOnce(() => mockAllApps.data);
      wrapper.find("form").simulate("submit", { preventDefault: jest.fn() });
      expect(signIn).toHaveBeenCalledTimes(1);
    });
  });

  test("on error submit form", async () => {
    const wrapper = mount(<LoginForm />);
    await act(async () => {
      signIn.mockImplementationOnce(() => {
        throw new Error("Failed to signin");
      });
      expect(signIn).toHaveBeenCalledTimes(0);

      fetchAllAccounts.mockImplementationOnce(() => mockAllAccounts.data);

      fetchAllApps.mockImplementationOnce(() => mockAllApps.data);
      wrapper.find("form").simulate("submit", { preventDefault: jest.fn() });
      expect(signIn).toHaveBeenCalledTimes(1);
    });
  });
});
