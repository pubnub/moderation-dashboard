import React from "react";
import { shallow } from "enzyme";
import AccountCard from "../../accounts/AccountCard";
import { mockAccounts } from "../../mockTest/mockAccounts";

const clickFn = jest.fn();

describe("Account Card Test Cases", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(
      <AccountCard account={mockAccounts[1]} index={1} onClick={clickFn} handleClick={clickFn} />
    );
  });

  test("Snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Check Value", () => {
    expect(wrapper.find('[testid="capitalChar"]').getElements()[0].props.children).toBe("Xy");
    expect(wrapper.find('[testid="email"]').getElements()[0].props.children).toBe(
      "xyz@sourcefuse.com"
    );
  });

  test("on click", () => {
    wrapper.find('[testid="1"]').getElements()[0].props.onClick(clickFn);
    expect(clickFn).toHaveBeenCalledTimes(1);
    expect(wrapper.find('[testid="capitalChar"]').getElements()[0].props.children).toBe("Xy");
  });
});
