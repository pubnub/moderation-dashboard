import { shallow } from "enzyme";
import UpdateUserMetadataModal from "../../users/UpdateUserMetadataModal";
describe("update User meta data Modal", () => {
  it("should render correctly with no props", () => {
    const component = shallow(<UpdateUserMetadataModal />);
    expect(component).toMatchSnapshot();
  });
});
