import React from "react";
import { CssBaseline } from "@material-ui/core";
import Header from "../components/core/header/Header";
import Sidebar from "../components/core/Sidebar";

const Dashboard = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <Header />
      <Sidebar content={children} />
    </>
  );
};

export default Dashboard;
