import React, { useState } from "react";
import Helmet from "react-helmet";
import { Grid, Typography, Box } from "@material-ui/core";
import { formatDate, showError, usersFromLS } from "../../utils/helpers";
import Search from "../core/Search";
import UsersTable from "./UsersTable";
import AddUserMetadataModal from "./AddUserMetadataModal";
import usePubNub from "../../utils/usePubNub";
import { deleteUserMetadata, getUserByName } from "../../services/pubnub";
import FilterUsers from "./FilterUsers";
import SnackBar from "../core/SnackBar";

function UsersListing() {
  const [searchResult, setSearchResult] = useState([]);
  const [dataAdded, setDataAdded] = useState([]);
  const { pubnub } = usePubNub();
  const [searched] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [userAlert, setUserAlert] = useState({
    success: { status: false, msg: "" },
    error: { status: false, msg: "" },
  });

  const requestUserSearch = (searchedVal) => {
    setUserAlert({
      ...userAlert,
      success: { status: false, msg: "" },
      error: { status: false, msg: "" },
    });
    (async () => {
      setUserAlert({
        ...userAlert,
        success: { status: false, msg: "" },
        error: { status: false, msg: "" },
      });
      try {
        const filteredRows = await getUserByName(pubnub, searchedVal);
        const usersList = [];
        let selectedUser = {};
        if (!filteredRows.length) {
          setUserAlert({
            ...userAlert,
            success: { status: false, msg: "" },
            error: { status: true, msg: "No users found" },
          });
        }
        filteredRows.map((user, index) => {
          selectedUser = user;
          selectedUser.updated = formatDate(user.updated);
          usersList.push(selectedUser);
          return false;
        });
        setSearchResult(usersList);
      } catch (e) {
        setUserAlert({
          ...userAlert,
          success: { status: false, msg: "" },
          error: { status: true, msg: "Failed to filter user" },
        });
      }
    })();
  };
  const cancelUserSearch = () => {
    setSearchResult(usersFromLS());
  };

  const setSearchableData = (usersData) => {
    setSearchResult(usersData);
  };

  const deleteUser = (UUID) => {
    if (UUID) {
      (async () => {
        try {
          await deleteUserMetadata(pubnub, UUID);
          setDataAdded([]);
          setUserAlert({
            ...userAlert,
            success: { status: true, msg: "User deleted successfully" },
            error: { status: false, msg: "" },
          });
        } catch (e) {
          setUserAlert({
            ...userAlert,
            success: { status: false, msg: "" },
            error: { status: true, msg: showError(e.status.errorData) },
          });
        }
      })();
    }
  };

  const userAdded = (data) => {
    setDataAdded(data);
  };

  const handleFilterChange = (value) => {
    let filter = "";
    if (value !== "all") {
      filter = `custom.${value} == true`;
    }
    setFilterBy(filter);
  };

  return (
    <>
      <Helmet title="Users" />
      <Grid justify="space-between" container>
        <Grid item sm={4}>
          <Box pl={1}>
            <Typography testid="title" variant="h5">
              Users
            </Typography>
          </Box>
        </Grid>
        <Grid item sm={8}>
          <Box display="flex" justifyContent="flex-end">
            <Box ml={2}>
              <Search
                searched={searched}
                requestSearch={requestUserSearch}
                cancelSearch={cancelUserSearch}
                placeholder={"Search for user name"}
              />
            </Box>
            <Box ml={2}>
              <FilterUsers isFiltered={handleFilterChange} />
            </Box>
            <Box ml={2}>
              <AddUserMetadataModal pubnubObject={pubnub} isAdded={userAdded} />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <UsersTable
            searchResult={searchResult}
            setSearchableData={setSearchableData}
            deleteUser={deleteUser}
            data={dataAdded}
            pubnub={pubnub}
            filterBy={filterBy}
          />
        </Grid>
      </Grid>
      {userAlert.error.status && <SnackBar msg={userAlert.error.msg} status={"info"} />}
      {userAlert.success.status && <SnackBar msg={userAlert.success.msg} status={"success"} />}
    </>
  );
}

export default UsersListing;
