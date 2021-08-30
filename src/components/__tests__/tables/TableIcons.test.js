import React from "react";
import { shallow, mount } from "enzyme";
import TableIcons from "../../tables/TableIcons";
import { IconButton } from "@material-ui/core";

let mockProps = {
  row: {
    custom: {
      flag: false,
      ban: false,
    },
    id: 1,
  },
  isUser: true,
  flagUser: jest.fn(),
  unFlagUser: jest.fn(),
  banUser: jest.fn(),
  unbanUser: jest.fn(),
  viewRow: jest.fn(),
  editRow: jest.fn(),
  setOver: jest.fn(),
  deleteRow: jest.fn(),
};
describe("Test Cases for Table Icons", () => {
  afterAll(() => {
    jest.resetAllMocks();
  });

  test("Snapshot", () => {
    const wrapper = mount(<TableIcons />);
    expect(wrapper).toMatchSnapshot();
  });

  test("check banuser and flaguser", () => {
    let wrapper = shallow(
      <TableIcons
        row={mockProps.row}
        isUser={mockProps.isUser}
        flagUser={mockProps.flagUser}
        unFlagUser={mockProps.unFlagUser}
        banUser={mockProps.banUser}
        unbanUser={mockProps.unbanUser}
        viewRow={mockProps.viewRow}
        editRow={mockProps.editRow}
        setOver={mockProps.setOver}
        deleteRow={mockProps.deleteRow}
      />
    );
    // flag user
    wrapper.find(IconButton).at(0).simulate("click");
    expect(mockProps.flagUser).toHaveBeenCalled();

    // banUser
    wrapper.find(IconButton).at(1).simulate("click");
    expect(mockProps.banUser).toHaveBeenCalled();

    // edit user
    wrapper.find(IconButton).at(2).simulate("click");
    expect(mockProps.editRow).toHaveBeenCalled();
    wrapper.find(IconButton).at(2).simulate("mouseOver");
    wrapper.find(IconButton).at(2).simulate("mouseOut");

    // delete user
    wrapper.find(IconButton).at(3).simulate("click");
    expect(mockProps.deleteRow).toHaveBeenCalled();
    wrapper.find(IconButton).at(3).simulate("mouseOver");
    wrapper.find(IconButton).at(3).simulate("mouseOut");
    expect(mockProps.setOver).toHaveBeenCalled();

    // unFlagUser
    mockProps = { ...mockProps, row: { custom: { flag: true } } };
    wrapper = shallow(
      <TableIcons row={mockProps.row} isUser={mockProps.isUser} unFlagUser={mockProps.unFlagUser} />
    );
    wrapper.find(IconButton).at(0).simulate("click");
    expect(mockProps.unFlagUser).toHaveBeenCalled();

    // unbanUser user
    mockProps = { ...mockProps, row: { custom: { ban: true } } };
    wrapper = shallow(
      <TableIcons row={mockProps.row} isUser={mockProps.isUser} unbanUser={mockProps.unbanUser} />
    );
    wrapper.find(IconButton).at(0).simulate("click");
    expect(mockProps.unbanUser).toHaveBeenCalled();

    // ban and flag user
    mockProps = { ...mockProps, isUser: false };
    wrapper = shallow(
      <TableIcons row={mockProps.row} isUser={mockProps.isUser} viewRow={mockProps.viewRow} />
    );
    wrapper.find(IconButton).at(0).simulate("click");
    expect(mockProps.viewRow).toHaveBeenCalled();
  });
});
