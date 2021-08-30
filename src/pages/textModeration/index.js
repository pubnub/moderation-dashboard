import React from "react";
import DashboardLayout from "../../layouts/Dashboard";
import TextModeration from "../../components/textModeration/index";

const TextModerationPage = () => {
  return (
    <>
      <DashboardLayout>
        <TextModeration />
      </DashboardLayout>
    </>
  );
};

export default TextModerationPage;
