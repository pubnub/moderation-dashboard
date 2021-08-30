import React from "react";
import { shallow } from "enzyme";
import AddUserForm from "../../users/AddUserForm";

const props = {
  formik: {
    handleSubmit: jest.fn(),
    disabled: false,
    values: {
      user_id: 128,
      name: "test name",
      email: "email@example.com",
      profile_url: "http://example.com",
    },
    touched: {
      user_id: true,
      name: true,
      email: true,
      profile_url: true,
    },
    errors: {
      user_id: true,
      name: true,
      email: true,
      profile_url: true,
    },
  },
  userAlert: {
    loading: true,
  },
};

describe("Add User Test Cases", () => {
  test("Snapshot", () => {
    const wrapper = shallow(<AddUserForm formik={props.formik} userAlert={props.userAlert} />);
    expect(wrapper).toMatchSnapshot();
  });

  test("Labels and initial Values", () => {
    const wrapper = shallow(<AddUserForm formik={props.formik} userAlert={props.userAlert} />);
    expect(wrapper.find("[testid='User_Id']").text()).toBe("User ID");
    expect(wrapper.find("[testid='User_Name']").text()).toBe("User Name");
    expect(wrapper.find("[testid='Email']").text()).toBe("Email Address");
    expect(wrapper.find("[testid='Profile_Url']").text()).toBe("Profile URL");
    expect(wrapper.find("[id='user_id']").text()).toBe("");
    expect(wrapper.find("[id='name']").text()).toBe("");
    expect(wrapper.find("[id='email']").text()).toBe("");
    expect(wrapper.find("[id='profile_url']").text()).toBe("");
    expect(wrapper.find("[id='user_id']").getElement().props.placeholder).toBe("Enter user ID");
    expect(wrapper.find("[id='name']").getElement().props.placeholder).toBe("Enter user name");
    expect(wrapper.find("[id='email']").getElement().props.placeholder).toBe("Enter email address");
    expect(wrapper.find("[id='profile_url']").getElement().props.placeholder).toBe(
      "Enter Profile URL"
    );
  });
});
