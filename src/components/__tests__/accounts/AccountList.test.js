import React from "react";
import { shallow, mount } from "enzyme";
import AccountList from "../../accounts/AccountList";
import { mockAccounts } from "../../mockTest/mockAccounts";
import { mockPubNubApplications } from "../../mockTest/mockPubnubAccounts";
import { fetchAllApps } from "../../../services/pubnub";

jest.mock("../../../services/pubnub", () => {
  return {
    fetchAllApps: jest.fn(),
  };
});

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

const mockResponse = jest.fn();
Object.defineProperty(window, "location", {
  value: {
    hash: {
      endsWith: mockResponse,
      includes: mockResponse,
    },
    assign: mockResponse,
  },
  writable: true,
});

describe("Test Case For Account List", () => {
  afterAll(() => {
    jest.resetAllMocks();
  });

  test("Snapshot", () => {
    const wrapper = shallow(<AccountList accounts={mockAccounts} />);
    expect(wrapper).toMatchSnapshot();
  });

  test("should render router", () => {
    const wrapper = shallow(<AccountList accounts={mockAccounts} />);
    expect(wrapper.find("AccountListing")).toHaveLength(1);
  });

  test("check account data", async () => {
    const wrapper = mount(<AccountList accounts={mockAccounts} handleClick={jest.fn()} />);
    expect(wrapper.find("AccountCard").exists()).toBe(true);
    expect(wrapper.find('[testid="2"]').getElements().length).toBeGreaterThan(0);
    expect(wrapper.find('[testid="4"]').getElements().length).toBe(0);
    expect(wrapper.find('[testid="capitalChar"]').first().text()).toBe("Ab");
    expect(wrapper.find('[testid="capitalChar"]').last().text()).toBe("Te");
    expect(fetchAllApps).toHaveBeenCalledTimes(0);
    fetchAllApps.mockImplementationOnce(() => {
      throw new Error("Failed to fetch applications");
    });

    try {
      await wrapper.find("AccountCard").getElements()[0].props.handleClick(mockAccounts[0]);
    } catch (e) {
      expect(e.message).toBe("Error: Failed to fetch applications");
    }
    expect(fetchAllApps).toHaveBeenCalledTimes(1);

    fetchAllApps.mockImplementation(() => mockPubNubApplications[0]);

    await wrapper.find("AccountCard").getElements()[0].props.handleClick(mockAccounts[0]);
    expect(fetchAllApps).toHaveBeenCalledTimes(2);
  });
});
