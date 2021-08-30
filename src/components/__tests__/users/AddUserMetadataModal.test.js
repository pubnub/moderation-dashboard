import { shallow } from "enzyme";
import React from "react";
import AddUserMetadataModal from "../../users/AddUserMetadataModal";
import PubNub from "pubnub";
import { mockPubNubApplications } from "../../mockTest/mockPubnubAccounts";
const selectedApp = mockPubNubApplications.result[2].keys[0];

const pubnubObj = new PubNub({
  subscribeKey: selectedApp.subscribe_key,
  secretKey: selectedApp.secret_key,
  publishKey: selectedApp.publish_key,
  uuid: 1,
});

const userInfo = [
  {
    status: 200,
    data: {
      id: "uuid-1",
      name: "John Doe",
      externalId: null,
      profileUrl: "http://example.com/",
      email: "johndoe@pubnub.com",
      userId: "MDcyQ0REOTUtNEVBOC00QkY2LTgwOUUtNDkwQzI4",
      updated: "2019-02-20T23:11:20.893755",
      eTag: "MDcyQ0REOTUtNEVBOC00QkY2LTgwOUUtNDkwQzI4MjgzMTcwCg==",
    },
  },
];

const clickFn = jest.fn();

describe("Add User meta data Modal", () => {
  it("should render correctly with no props", () => {
    const component = shallow(<AddUserMetadataModal />);
    expect(component).toMatchSnapshot();
  });
  it("should render pubnub and userinfo object correctly with given strings", () => {
    const component = shallow(<AddUserMetadataModal pubnubObject={pubnubObj} isAdded={userInfo} />);
    expect(component).toMatchSnapshot();
  });
  it("should be possible to click button with Spacebar", () => {
    const component = shallow(<AddUserMetadataModal onClick={clickFn} />);
    expect(component.find("[testid='add_user']").text()).toBe("Add user");
    component.find("[testid='button_id']").simulate("click");
    clickFn(true);
    expect(clickFn.mock.calls.length).toEqual(1);
  });

  it("should check the Add User Form", () => {
    const component = shallow(<AddUserMetadataModal isAdded={userInfo} />);
    component
      .find("AddUserForm")
      .getElements()[0]
      .props.formik.setFieldValue("name", userInfo[0].data.name);
    component
      .find("AddUserForm")
      .getElements()[0]
      .props.formik.setFieldValue("email", userInfo[0].data.email);
    component
      .find("AddUserForm")
      .getElements()[0]
      .props.formik.setFieldValue("user_id", userInfo[0].data.userId);
    component
      .find("AddUserForm")
      .getElements()[0]
      .props.formik.setFieldValue("profile_url", userInfo[0].data.profileUrl);
    expect(component.find("AddUserForm").getElements()[0].props.handleClose()).toBeUndefined();
  });
});
