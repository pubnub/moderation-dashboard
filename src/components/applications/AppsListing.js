import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import { Grid, Typography, Box } from "@material-ui/core";
import ApplicationTable from "./ApplicationTable";
import { applicationsWithKeyFromLS } from "../../utils/helpers";
import Search from "../core/Search";
import SnackBar from "../core/SnackBar";

function AppsListing() {
  const [searchResult, setSearchResult] = useState([]);
  const [searched, setSearched] = useState("");
  const [appsAlert, setAppsAlert] = useState({
    success: { status: false, msg: "" },
    error: { status: false, msg: "" },
  });

  const requestKeySearch = (searchedVal) => {
    setAppsAlert({
      ...appsAlert,
      success: { status: false, msg: "" },
      error: { status: false, msg: "" },
    });
    const filteredRows = applicationsWithKeyFromLS().filter((row) => {
      return (
        row.publish_key.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.subscribe_key.toLowerCase().includes(searchedVal.toLowerCase())
      );
    });
    if (!filteredRows.length) {
      setAppsAlert({
        ...appsAlert,
        success: { status: false, msg: "" },
        error: { status: true, msg: "No applications found" },
      });
    }
    setSearchResult(filteredRows);
  };
  const cancelKeySearch = () => {
    setSearched("");
    requestKeySearch(searched);
  };

  useEffect(() => {
    setSearchResult(applicationsWithKeyFromLS());
  }, []);

  return (
    <React.Fragment>
      <Helmet title="Applications" />
      <Grid justify="center" container>
        <Grid item sm={11} md={11} lg={11}>
          <Grid justify="space-between" container spacing={0}>
            <Grid item sm={8} md={8} xs={12}>
              <Box pl={1} pt={4} pb={2}>
                <Typography testid="AppListingHeader" variant="h5">
                  Applications
                </Typography>
              </Box>
            </Grid>
            <Grid item sm={4} md={4} xs={12}>
              <Box pl={8} pt={4} pb={2}>
                <Search
                  testId="AppListingSearchText"
                  searched={searched}
                  requestSearch={requestKeySearch}
                  cancelSearch={cancelKeySearch}
                  placeholder={"Search for publish or subscribe key"}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={0} justify="center">
        <Grid item xs={12} sm={11} md={11} lg={11}>
          <ApplicationTable searchResult={searchResult} />
        </Grid>
      </Grid>
      {appsAlert.error.status && <SnackBar msg={appsAlert.error.msg} status={"info"} />}
      {appsAlert.success.status && <SnackBar msg={appsAlert.success.msg} status={"success"} />}
    </React.Fragment>
  );
}

export default AppsListing;
