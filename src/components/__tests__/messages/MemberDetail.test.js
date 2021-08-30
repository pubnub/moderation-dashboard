import React from "react";
import { shallow, mount } from "enzyme";
import { IconButton } from "@material-ui/core";
import MemberDetail from "../../messages/MemberDetail";

const mockData = {
  block: false,
  mute: false,
  uuid: {
    name: "John",
    profileUrl: "https://www.gravatar.com/avatar/c7b",
    id: "user_00505cca5b04465ca1",
  },
  actionsDisable: false,
  status: "online",
  updated: null,
};
const mockToggleFn = jest.fn();

describe("Test Case For Member Detail", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<MemberDetail member={mockData} toggleMemberDetails={mockToggleFn} />);
  });

  test("Snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("MemberDetail Renders", () => {
    expect(wrapper.exists()).toBe(true);
  });

  test("Member Details Card Headings", () => {
    expect(wrapper.find("[testid='nick_name']").text()).toBe("NICK NAME");
    expect(wrapper.find("[testid='created_at']").text()).toBe("CREATED DATE");
    expect(wrapper.find("[testid='email']").text()).toBe("EMAIL ADDRESS");
  });

  test("check functions", () => {
    wrapper = mount(<MemberDetail member={mockData} toggleMemberDetails={mockToggleFn} />);
    wrapper.find("UserAction").getElement().props.updated("", "");

    expect(mockToggleFn).toHaveBeenCalledTimes(0);
    wrapper.find(IconButton).at(0).simulate("click");
    expect(mockToggleFn).toHaveBeenCalledTimes(1);

    expect(wrapper.find("UserAction").getElement().props.action).toBe("");
    expect(wrapper.find("UserAction").getElement().props.open).toBeFalsy();
    wrapper.find(IconButton).at(1).simulate("click");
    expect(wrapper.find("UserAction").getElement().props.open).toBeTruthy();
    expect(wrapper.find("UserAction").getElement().props.action).toBe("mute");

    wrapper.find(IconButton).at(2).simulate("click");
    expect(wrapper.find("UserAction").getElement().props.action).toBe("block");

    wrapper = mount(
      <MemberDetail
        member={{ ...mockData, mute: true, block: true }}
        toggleMemberDetails={mockToggleFn}
      />
    );
    expect(wrapper.find("UserAction").getElement().props.action).toBe("");
    expect(wrapper.find("UserAction").getElement().props.open).toBeFalsy();
    wrapper.find(IconButton).at(1).simulate("click");
    expect(wrapper.find("UserAction").getElement().props.action).toBe("unmute");
    expect(wrapper.find("UserAction").getElement().props.open).toBeTruthy();

    wrapper.find(IconButton).at(2).simulate("click");
    expect(wrapper.find("UserAction").getElement().props.action).toBe("unblock");
  });
});
