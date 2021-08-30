import React from "react";
import { shallow } from "enzyme";
import UpdateChannelMetadataModal from "../../channels/UpdateChannelMetadataModal";

const mockSetOpenFn = jest.fn();
const mockData = {
  id: "one",
  name: "one",
  description: "",
  updated: "July 5th 2021, 4:18 pm",
  eTag: "AbWi2NmBocqbfg",
};

describe("Test Case For UpdateChannelMetadataModal", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(
      <UpdateChannelMetadataModal
        open={true}
        data={mockData}
        setOpen={mockSetOpenFn}
        channelUpdated={jest.fn()}
      />
    );
  });

  test("Snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should render router", () => {
    expect(wrapper.find("AddChannelForm")).toHaveLength(1);
    expect(wrapper.find('[testid="UpdateChannel"]').getElements()[0].props.children).toBe(
      "Update Channel Metadata"
    );
  });

  test("check handleClose", () => {
    expect(mockSetOpenFn).toHaveBeenCalledTimes(0);
    wrapper.find('[testId="closeIcon"]').simulate("click");
    expect(mockSetOpenFn).toHaveBeenCalledTimes(1);
  });
});
