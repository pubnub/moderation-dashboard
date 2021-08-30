import React from "react";
import { shallow } from "enzyme";
import MyAccountDropdown from "../../../core/header/MyAccountDropdown";
import { mockPubnubAccounts } from "../../../mockTest/mockPubnubAccounts";

localStorage.setItem("PubNubSelectedAccount", JSON.stringify(mockPubnubAccounts[1]));

describe("Test Cases for MyAccount Dropdown", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<MyAccountDropdown accounts={mockPubnubAccounts} />);
  });

  test("Snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
