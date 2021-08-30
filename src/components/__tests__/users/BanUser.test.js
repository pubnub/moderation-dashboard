import { mount } from "enzyme";
import BanUser from "../../users/BanUser";
import { Button } from "@material-ui/core";
import { setUserMetadata } from "../../../services/pubnub";
import { act } from "react-dom/test-utils";

let props = {
  uuid: {
    custom: {
      id: 1,
      flag: [],
    },
  },
  id: 1,
  open: true,
  title: "Ban User",
  setOpen: jest.fn(),
  action: "ban",
};

jest.mock("../../../services/pubnub", () => {
  return {
    setUserMetadata: jest.fn(),
  };
});
describe("Ban User meta data Modal", () => {
  let wrapper;
  beforeAll(async () => {
    wrapper = mount(<BanUser {...props} />);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it("Snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("initial title", () => {
    expect(wrapper.find("#confirm-dialog").getElements()[0].props.children).toBe("Ban User");
  });

  it("check for onClose and handleBanClick", async () => {
    props = { ...props, action: "unbaned", uuid: {} };
    wrapper = mount(<BanUser {...props} />);
    await act(async () => {
      // Check that the dialog is open.
      expect(wrapper.find('[testid="DialogId"]')).toBeTruthy();

      //close the dialog on exit event
      wrapper.find('[testid="DialogId"]').getElements()[0].props.onClose();
      expect(props.setOpen).toHaveBeenCalled();

      // handle Ban Click
      wrapper.find(Button).at(0).simulate("click");
      expect(setUserMetadata).toHaveBeenCalled();

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

      // cancel button Click
      wrapper.find(Button).at(1).simulate("click");
      expect(props.setOpen).toHaveBeenCalled();
    });
  });
});
