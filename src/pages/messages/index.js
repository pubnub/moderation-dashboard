import React from "react";
import Messages from "../../components/messages/Messages";
import DashboardLayout from "../../layouts/Dashboard";

const Overview = () => {
  return (
    <>
      <DashboardLayout>
        <Messages />
      </DashboardLayout>
    </>
  );
};
export default Overview;
