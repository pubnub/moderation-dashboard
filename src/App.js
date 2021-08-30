import React from "react";
import { create } from "jss";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";

import Routes from "./routes/Routes";
const jss = create({
  ...jssPreset(),
  insertionPoint: document.getElementById("jss-insertion-point"),
});

const App = () => {
  return (
    <>
      <StylesProvider jss={jss}>
        <Routes />
      </StylesProvider>
    </>
  );
};

export default App;
