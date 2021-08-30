import React from "react";
import OverviewGrid from "../../components/overview/overviewGrid";
import DashboardLayout from "../../layouts/Dashboard";

const Overview = () => {
  return (
    <>
      <DashboardLayout>
        <OverviewGrid />
      </DashboardLayout>
    </>
  );
};
export default Overview;
