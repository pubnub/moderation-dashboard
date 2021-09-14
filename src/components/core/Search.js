import React from "react";
import { useStyles } from "../../style/textModeration";
import SearchBar from "material-ui-search-bar";

export default function Search(props) {
  const classes = useStyles();

  const handleChange = (searchVal) => {
    if (!searchVal) {
      props.cancelSearch();
    }
  };
  return (
    <SearchBar
      id="searchBar"
      value={props.searched}
      onRequestSearch={(searchVal) => props.requestSearch(searchVal)}
      onChange={(searchVal) => handleChange(searchVal)}
      onCancelSearch={() => props.cancelSearch()}
      placeholder={props.placeholder}
      className={classes.searchInput}
      searchIcon={
        <>
          <img src={process.env.PUBLIC_URL + "/images/search.svg"} alt="" />
        </>
      }
      disabled={props.disabled}
      autoComplete="off"
    />
  );
}
