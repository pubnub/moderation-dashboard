import React from "react";
import DashboardLayout from "../../layouts/Dashboard";
import ImageModeration from "../../components/imageModeration/index";

const ImageModerationPage = () => {
  return (
    <>
      <DashboardLayout>
        <ImageModeration />
      </DashboardLayout>
    </>
  );
};

export default ImageModerationPage;
