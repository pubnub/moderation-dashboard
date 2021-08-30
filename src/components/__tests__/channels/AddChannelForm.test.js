import React from "react";
import { shallow } from "enzyme";
import AddChannelForm from "../../channels/AddChannelForm";

const props = {
  formik: {
    handleSubmit: jest.fn(),
    disabled: false,
    values: {
      id: 3,
    },
    touched: {
      id: false,
    },
  },
  channelAlert: {
    loading: false,
  },
};

describe("Add User Test Cases", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<AddChannelForm formik={props.formik} channelAlert={props.channelAlert} />);
  });

  test("Snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Labels and initial Values", () => {
    expect(wrapper.find("[testid='Channel_Id']").text()).toBe("Channel ID");
    expect(wrapper.find("[testid='Display_Name']").text()).toBe("Display Name");
    expect(wrapper.find("[testid='Description']").text()).toBe("Description");
    expect(wrapper.find("[id='id']").text()).toBe("");
    expect(wrapper.find("[id='name']").text()).toBe("");
    expect(wrapper.find("[id='description']").text()).toBe("");
  });

  test("check placeholder", () => {
    expect(wrapper.find("[id='id']").getElement().props.placeholder).toBe("Enter Channel ID");
    expect(wrapper.find("[id='name']").getElement().props.placeholder).toBe("Enter Display Name");
    expect(wrapper.find("[id='description']").getElement().props.placeholder).toBe(
      "Enter Channel Description"
    );
  });
});
