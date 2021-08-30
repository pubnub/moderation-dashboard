import React from "react";
import ChannelsListing from "../../components/channels/ChannelsListing";
import DashboardLayout from "../../layouts/Dashboard";

const Channels = () => {
  return (
    <>
      <DashboardLayout>
        <ChannelsListing />
      </DashboardLayout>
    </>
  );
};
export default Channels;
