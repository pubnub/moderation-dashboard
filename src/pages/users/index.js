import React from "react";
import UsersListing from "../../components/users/UsersListing";
import DashboardLayout from "../../layouts/Dashboard";

const Users = () => {
  return (
    <>
      <DashboardLayout>
        <UsersListing />
      </DashboardLayout>
    </>
  );
};
export default Users;
