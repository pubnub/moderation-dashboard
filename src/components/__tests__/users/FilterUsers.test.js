import React from "react";
import { shallow } from "enzyme";
import FilterUsers from "../../users/FilterUsers";

describe("Filter User meta data Modal", () => {
  let component;
  beforeAll(() => {
    component = shallow(<FilterUsers isFiltered={jest.fn()} />);
  });

  test("Snapshhot", () => {
    expect(component).toMatchSnapshot();
  });

  test("Has Label", () => {
    expect(component.find('[testid="UserType"]').text()).toBe("User Type");
    expect(component.find('[testid="bannedUsers"]').text()).toBe("Banned Users");
    expect(component.find('[testid="flaggedUsers"]').text()).toBe("Flagged Users");
  });

  test("initial Values", () => {
    expect(component.find("#banCheck").getElement().props.checked).toBeFalsy();
    expect(component.find("#flagCheck").getElement().props.checked).toBeFalsy();
    expect(component.find('input[type="checkbox"][checked="checked"]')).toHaveLength(0);
  });

  test("handle Drawer", () => {
    const drawerOpen = component.find("#openDrawer").simulate("click");
    expect(drawerOpen).toBeTruthy();

    const drawerClose = component.find("#drawer").simulate("click");
    expect(drawerClose).toBeTruthy();
  });

  test("check handleChange Function", () => {
    component.find('[testid="banButton"]').simulate("click");
    expect(component.find("#banCheck").getElement().props.checked).toBe(true);
    expect(component.find("#flagCheck").getElement().props.checked).toBe(false);

    component.find('[testid="flagButton"]').simulate("click");
    expect(component.find("#flagCheck").getElement().props.checked).toBe(true);
    expect(component.find("#banCheck").getElement().props.checked).toBe(false);

    component.find('[testid="flagButton"]').simulate("click");
    expect(component.find("#flagCheck").getElement().props.checked).toBe(false);
    expect(component.find("#banCheck").getElement().props.checked).toBe(false);
  });
});
