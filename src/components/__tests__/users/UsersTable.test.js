import { mount } from "enzyme";
import UsersTable from "../../users/UsersTable";
import { mockPubNubUsers } from "../../mockTest/mockPubnubAccounts";
import { act } from "react-dom/test-utils";
import { getUsers } from "../../../services/pubnub";
jest.mock("../../../services/pubnub", () => {
  return {
    getUsers: jest.fn(() => Promise.resolve({ data: [] })),
  };
});
const waitForComponentToPaint = async (wrapper) => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve));
    wrapper.update();
  });
};

describe("User table meta data Modal", () => {
  afterAll(() => {
    jest.resetAllMocks();
  });

  test("Snapshot", async () => {
    const component = mount(
      <UsersTable
        searchResult={[]}
        setSearchableData={jest.fn()}
        deleteUser={jest.fn()}
        data={[]}
        filterBy=""
      />
    );
    await waitForComponentToPaint(component);

    expect(component).toMatchSnapshot();
  });

  test("check for user action", async () => {
    expect(getUsers).toHaveBeenCalledTimes(0);
    const wrapper = mount(
      <UsersTable
        searchResult={mockPubNubUsers}
        setSearchableData={jest.fn()}
        deleteUser={jest.fn()}
        data={[]}
        filterBy=""
      />
    );
    expect(getUsers).toHaveBeenCalledTimes(1);
    await waitForComponentToPaint(wrapper);
    await act(async () => {
      expect(wrapper.find("FlagUser").getElements()[0].props.isUpdated("all")).toBeUndefined();

      // confirm Delete
      expect(
        wrapper
          .find("ConfirmDialog")
          .getElements()[0]
          .props.onConfirm({ preventDefault: jest.fn() }, 1)
      ).toBeUndefined();

      // ban user
      expect(
        wrapper
          .find("ListingTable")
          .getElements()[0]
          .props.banUser({ preventDefault: jest.fn() }, 1)
      ).toBeUndefined();

      // unbaned user
      expect(
        wrapper
          .find("ListingTable")
          .getElements()[0]
          .props.unbanUser({ preventDefault: jest.fn() }, 1)
      ).toBeUndefined();

      // flag user
      expect(
        wrapper
          .find("ListingTable")
          .getElements()[0]
          .props.flagUser({ preventDefault: jest.fn() }, 1)
      ).toBeUndefined();

      // unflag user
      expect(
        wrapper
          .find("ListingTable")
          .getElements()[0]
          .props.unFlagUser({ preventDefault: jest.fn() }, 1)
      ).toBeUndefined();

      // delete row user
      expect(
        wrapper
          .find("ListingTable")
          .getElements()[0]
          .props.deleteRow({ preventDefault: jest.fn() }, 1)
      ).toBeUndefined();

      // edit row user
      expect(
        wrapper
          .find("ListingTable")
          .getElements()[0]
          .props.editRow({ preventDefault: jest.fn() }, 1)
      ).toBeUndefined();

      // page number is exist
      getUsers.mockImplementation(() => ({ data: [] }));
      wrapper.find("ListingTable").getElements()[0].props.getNewPage(1);
      expect(getUsers).toHaveBeenCalledTimes(2);

      // page number is not exist
      getUsers.mockImplementation(() => ({ data: [{ update: "15/08/2021" }] }));
      wrapper.find("ListingTable").getElements()[0].props.getNewPage(0);
      expect(getUsers).toHaveBeenCalledTimes(3);
    });
  }, 30000);
});
