import { shallow } from "enzyme";
import UserAction from "../../users/UserAction";
import { mockPubNubSelectedChannel } from "../../mockTest/mockPubnubAccounts";
import { Button } from "@material-ui/core";
import { setUserMetadata } from "../../../services/pubnub";
jest.mock("../../../services/pubnub", () => {
  return {
    setUserMetadata: jest.fn(),
  };
});
let props = {
  action: "mute",
  user: {
    custom: {
      mutedChannels: null,
      blockedChannels: [],
    },
  },
  id: 1,
  open: false,
  setOpen: jest.fn(),
  updated: jest.fn(),
};
localStorage.setItem("PubNubSelectedChannel", JSON.stringify(mockPubNubSelectedChannel));
describe("User action meta data Modal", () => {
  afterAll(() => {
    jest.resetAllMocks();
    localStorage.clear();
  });
  it("should render correctly with no props", () => {
    const component = shallow(<UserAction user={props} />);
    expect(component).toMatchSnapshot();
  });

  it("check for block, mute, unmute, unblock", () => {
    let wrapper = shallow(<UserAction {...props} />);
    // Check that the dialog is open.
    expect(wrapper.find('[testid="DialogId"]')).toBeTruthy();

    //close the dialog on exit event
    wrapper.find('[testid="DialogId"]').getElements()[0].props.onClose();
    expect(props.setOpen).toHaveBeenCalled();

    // handle mute Click
    // empty mutedChannels
    wrapper.find(Button).at(0).simulate("click");
    expect(setUserMetadata).toHaveBeenCalled();
    expect(setUserMetadata).toHaveBeenCalledTimes(1);

    // assign value mutedChannels
    props = {
      ...props,
      user: {
        custom: {
          mutedChannels: "pro,one",
        },
      },
    };
    wrapper = shallow(<UserAction {...props} />);
    wrapper.find(Button).at(0).simulate("click");
    expect(setUserMetadata).toHaveBeenCalledTimes(2);

    props = {
      ...props,
      user: {
        custom: {
          mutedChannels: "pro,one",
        },
      },
      action: "unmute",
    };
    wrapper = shallow(<UserAction {...props} />);
    wrapper.find(Button).at(0).simulate("click");
    expect(setUserMetadata).toHaveBeenCalledTimes(3);

    // block channel
    props = {
      ...props,
      user: {
        custom: {
          blockedChannels: "pro.one, block",
        },
      },
      action: "block",
    };
    wrapper = shallow(<UserAction {...props} />);
    wrapper.find(Button).at(0).simulate("click");
    expect(setUserMetadata).toHaveBeenCalledTimes(4);

    // empty blocked channel
    props = {
      ...props,
      user: {
        custom: {
          blockedChannels: null,
        },
      },
      action: "block",
    };
    wrapper = shallow(<UserAction {...props} />);
    wrapper.find(Button).at(0).simulate("click");
    expect(setUserMetadata).toHaveBeenCalledTimes(5);

    props = {
      ...props,
      user: {
        custom: {
          blockedChannels: "pro, block",
        },
      },
      action: "unblock",
    };
    wrapper = shallow(<UserAction {...props} />);
    wrapper.find(Button).at(0).simulate("click");
    expect(setUserMetadata).toHaveBeenCalledTimes(6);

    // error case for handle Ban Click
    setUserMetadata.mockImplementation(() => {
      return Promise.reject({
        status: {
          errorData: {
            message: "Forbidden",
          },
        },
      });
    });

    wrapper.find(Button).at(0).simulate("click");
    expect(setUserMetadata).toHaveBeenCalledTimes(7);

    // cancel button Click
    wrapper.find(Button).at(1).simulate("click");
    expect(props.setOpen).toHaveBeenCalled();
  });
});
