import { mount, shallow } from "enzyme";
import OverviewGrid from "../../overview/overviewGrid";
import { render } from "@testing-library/react";
import { mockPubNubApplications } from "../../mockTest/mockPubnubAccounts";

localStorage.setItem("PubNubSelectedApp", JSON.stringify(mockPubNubApplications.result[0]));

describe("This suit will test the rendering of overview page", () => {
  afterAll(() => {
    jest.resetAllMocks();
    localStorage.removeItem("PubNubSelectedApp");
  });

  test("Snapshot of the overview", () => {
    const { asFragment } = render(<OverviewGrid />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("Overview renders", () => {
    const wrapper = mount(<OverviewGrid />);
    expect(wrapper.exists()).toBe(true);
  });

  test("Overview Page Headings", () => {
    const wrapper = shallow(<OverviewGrid />);
    expect(wrapper.find("[testid='overview_Header']").text()).toBe("Overview");
    expect(wrapper.find("[testid='modified_date']").text()).toBe("Modified Date");
    expect(wrapper.find("[testid='created_on']").text()).toBe("Created on");
    expect(wrapper.find("[testid='pubnub_keys']").text()).toBe("PubNub Keys");
    expect(wrapper.find("[testid='publish_key']").text()).toBe("Publish Key");
    expect(wrapper.find("[testid='subsciber_key']").text()).toBe("Subscribe Key");
    expect(wrapper.find("[testid='secret_key']").text()).toBe("Secret Key");
  });

  test("Overview Page Headings", () => {
    const wrapper = shallow(<OverviewGrid />);
    expect(
      wrapper.find("#maskableIcon").getElement().props.children.type.type.render.displayName
    ).toBe("RemoveRedEyeIcon");
    wrapper.find("#maskableIcon").simulate("click");
    expect(
      wrapper.find("#maskableIcon").getElement().props.children.type.type.render.displayName
    ).toBe("RemoveRedEyeOutlinedIcon");
  });
});
