import React, { useEffect } from "react";

import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

function SnackBar({ status, msg }) {
  const [open, setOpen] = React.useState(true);
  useEffect(() => {
    setOpen(true);
  }, [status]);

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  }

  return (
    <Snackbar
      id="snackBar"
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={open}
      autoHideDuration={9000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={status}>
        {msg}
      </Alert>
    </Snackbar>
  );
}
export default SnackBar;
