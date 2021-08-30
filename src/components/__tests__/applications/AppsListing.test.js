import React from "react";
import { shallow, mount } from "enzyme";
import AppsListing from "../../applications/AppsListing";
import { act } from "react-dom/test-utils";
import { mockPubNubApplications } from "../../mockTest/mockPubnubAccounts";

describe("Application Page Test Cases", () => {
  test("Correct Header Name", () => {
    const comp = shallow(<AppsListing />);
    const header = comp.find('[testid="AppListingHeader"]').props().children;
    expect(header).toBe("Applications");
  });

  test("Should render properly", () => {
    const comp = shallow(<AppsListing />);
    expect(comp).toMatchSnapshot();
  });

  test("Have Application Table", () => {
    const comp = shallow(<AppsListing />);
    const ApplicationTableExist = comp.find("ApplicationTable").exists();
    expect(ApplicationTableExist).toBe(true);
  });

  test("Initial Search Box Input", () => {
    const wrapper = shallow(<AppsListing />);
    const searchBox = wrapper.find("[testId='AppListingSearchText']");
    expect(searchBox.props().searched).toBe("");
  });

  test("Placeholder for Search Box", () => {
    const wrapper = shallow(<AppsListing />);
    const placeHolderText = wrapper.find("[testId='AppListingSearchText']");
    const originalPlaceHolder = "Search for publish or subscribe key";
    expect(placeHolderText.props().placeholder).toBe(originalPlaceHolder);
  });

  test("On changing Search Box Input", () => {
    const wrapper = mount(<AppsListing />);

    wrapper.find("input[type='text']").simulate("change", {
      target: { value: "newText" },
    });
    expect(wrapper.find("input[type='text']").getElement().props.value).toEqual("newText");
  });

  test("On call requestSearch & cancelSearch", () => {
    const wrapper = mount(<AppsListing />);
    localStorage.setItem("PubNubApplications", JSON.stringify(mockPubNubApplications));
    act(() => {
      expect(
        wrapper.find("[testId='AppListingSearchText']").getElements()[0].props.cancelSearch()
      ).toBeUndefined();
      expect(
        wrapper
          .find("[testId='AppListingSearchText']")
          .getElements()[0]
          .props.requestSearch("pub-c-f0639103-3343-448c-87fa-64dbe803a56b")
      ).toBeUndefined();
    });
  });
});
