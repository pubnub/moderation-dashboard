import React from "react";
import { shallow } from "enzyme";
import FlagUser from "../../users/FlagUser";

const mockProp = {
  open: false,
  setOpen: jest.fn(),
  uuid: "",
  pubnub: {},
  action: "",
  //   children: ['You want to ', '', ' this user?'],
  isUpdated: jest.fn(),
};

describe("Test Cases for Flag User", () => {
  let component;
  beforeAll(() => {
    component = shallow(
      <FlagUser
        open={mockProp.open}
        setOpen={mockProp.setOpen}
        uuid={mockProp.uuid}
        isUpdated={mockProp.isUpdated}
        pubnub={mockProp.pubnub}
        action={mockProp.action}
      />
    );
  });

  test("Snapshhot", () => {
    expect(component).toMatchSnapshot();
  });

  test("initial Values", () => {
    expect(component.find('[testid="reason"]').text()).toBe("Reason");
    expect(component.find("#submit").text()).toBe("Submit");
    expect(component.find("#cancel").text()).toBe("CANCEL");
  });
});
