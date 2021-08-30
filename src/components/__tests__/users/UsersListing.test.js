import React from "react";
import { shallow, mount } from "enzyme";
import UsersListing from "../../users/UsersListing";
import { act } from "react-dom/test-utils";
import { deleteUserMetadata, getUserByName } from "../../../services/pubnub";
jest.mock("../../../services/pubnub", () => {
  return {
    deleteUserMetadata: jest.fn(),
    getUserByName: jest.fn(),
  };
});
const waitForComponentToPaint = async (wrapper) => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve));
    wrapper.update();
  });
};
const failPromise = {
  status: {
    errorData: {
      message: "Forbidden",
    },
  },
};
describe("User List Test Cases", () => {
  afterAll(() => {
    jest.resetAllMocks();
  });
  test("User List Header", () => {
    const wrapper = shallow(<UsersListing />);
    expect(wrapper.find("[testid='title']").text()).toBe("Users");
  });

  test("User Snapshot", () => {
    const wrapper = shallow(<UsersListing />);
    expect(wrapper).toMatchSnapshot();
  });

  test("Have Header Tools and User Table", () => {
    const wrapper = shallow(<UsersListing />);
    expect(wrapper.find("Search").exists()).toBe(true);
    expect(wrapper.find("FilterUsers").exists()).toBe(true);
    expect(wrapper.find("AddUserMetadataModal").exists()).toBe(true);
    expect(wrapper.find("UsersTable").exists()).toBe(true);
  });

  test("Search Box Input Change", async () => {
    const wrapper = mount(<UsersListing />);

    // before the state updated
    await waitForComponentToPaint(wrapper);
    // after the state updated

    const searchBox = wrapper.find("input[type='text']").getElement().props;
    expect(searchBox.value).toBe("");
    expect(searchBox.placeholder).toBe("Search for user name");

    wrapper.find("input[type='text']").simulate("change", {
      target: { value: "newText" },
    });
    const newSearchBox = wrapper.find("input[type='text']").getElement().props;
    expect(newSearchBox.value).toBe("newText");
  });

  test("delete user event", async () => {
    const wrapper = mount(<UsersListing />);
    // before the state updated
    await waitForComponentToPaint(wrapper);
    await act(async () => {
      // filter user
      expect(wrapper.find("FilterUsers").getElements()[0].props.isFiltered("all")).toBeUndefined();
      expect(wrapper.find("FilterUsers").getElements()[0].props.isFiltered("one")).toBeUndefined();
      // added user
      expect(wrapper.find("AddUserMetadataModal").getElements()[0].props.isAdded()).toBeUndefined();
      // delete user
      wrapper.find("UsersTable").getElements()[0].props.deleteUser("1");
      expect(deleteUserMetadata).toHaveBeenCalledTimes(1);
      wrapper.find("UsersTable").getElements()[0].props.deleteUser();
      // error case for delete user
      deleteUserMetadata.mockImplementation(() => Promise.reject(failPromise));
      wrapper.find("UsersTable").getElements()[0].props.deleteUser("1");
      expect(deleteUserMetadata).toHaveBeenCalledTimes(2);

      // reset and cancel search
      expect(getUserByName).toHaveBeenCalledTimes(0);
      wrapper.find("Search").getElements()[0].props.requestSearch();
      expect(getUserByName).toHaveBeenCalledTimes(1);
      getUserByName.mockImplementation(() => [{ update: "15/08/2021" }]);
      wrapper.find("Search").getElements()[0].props.requestSearch();
      expect(getUserByName).toHaveBeenCalledTimes(2);
      wrapper.find("Search").getElements()[0].props.cancelSearch();

      // fail searching
      getUserByName.mockImplementation(() => failPromise);
      wrapper.find("Search").getElements()[0].props.requestSearch();
      expect(getUserByName).toHaveBeenCalledTimes(3);
    });
  });
});
