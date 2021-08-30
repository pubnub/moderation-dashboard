import * as React from "react";
import { shallow } from "enzyme";
import Search from "../../core/Search";

const cancelKeySearch = jest.fn();
const requestKeySearch = jest.fn();
const mockProps = {
  requestSearch: requestKeySearch,
  cancelSearch: cancelKeySearch,
  searched: "someText",
  placeholder: "Enter Text",
};

describe("Search Test Cases", () => {
  let comp;
  beforeAll(() => {
    comp = shallow(
      <Search
        requestSearch={requestKeySearch}
        cancelSearch={cancelKeySearch}
        searched="someText"
        placeholder="Enter Text"
      />
    );
  });

  it("Snapshot", () => {
    expect(comp).toMatchSnapshot();
  });

  test("check functions", () => {
    expect(cancelKeySearch).toHaveBeenCalledTimes(0);
    expect(requestKeySearch).toHaveBeenCalledTimes(0);

    comp.find("#searchBar").getElement().props.onCancelSearch();
    expect(cancelKeySearch).toHaveBeenCalledTimes(1);

    comp.find("#searchBar").getElement().props.onRequestSearch("abc");
    expect(requestKeySearch).toHaveBeenCalledTimes(1);

    comp.find("#searchBar").getElement().props.onChange("");
    expect(cancelKeySearch).toHaveBeenCalledTimes(2);
    expect(requestKeySearch).toHaveBeenCalledTimes(1);

    comp.find("#searchBar").getElement().props.onChange("ab");
    expect(cancelKeySearch).toHaveBeenCalledTimes(2);
    expect(requestKeySearch).toHaveBeenCalledTimes(1);
  });
});
