import React from "react";
import { CssBaseline } from "@material-ui/core";

const Auth = ({ children }) => {
  return (
    <>
      <CssBaseline />
      {children}
    </>
  );
};

export default Auth;
