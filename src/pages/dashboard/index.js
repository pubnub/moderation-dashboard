import React from "react";
import Header from "../../components/core/header/Header";
import { CssBaseline } from "@material-ui/core";

import AppsListing from "../../components/applications/AppsListing";

const Dashboard = () => {
  return (
    <>
      <CssBaseline />
      <Header />
      <AppsListing />
    </>
  );
};
export default Dashboard;
