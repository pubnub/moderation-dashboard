import React, { useState, useEffect } from "react";
import {
  DialogTitle,
  Dialog,
  Typography,
  DialogActions,
  Button,
  DialogContent,
} from "@material-ui/core";
import { useStyles } from "../../style/confirmDialog";
import SnackBar from "../core/SnackBar";
import { capitalizeFirstLetter, showError } from "../../utils/helpers";
import { setUserMetadata } from "../../services/pubnub";
export default function BanUser(props) {
  const { pubnubObject, open, setOpen, uuid, action } = props;
  const [UUID, setUUID] = useState("");
  const [banAlert, setBanAlert] = useState({
    success: { status: false, msg: "" },
    error: { status: false, msg: "" },
  });
  const classes = useStyles();
  const customMetaData = uuid.custom || {};

  useEffect(() => {
    setUUID(uuid.id);
  }, [uuid]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleBanClick = (values) => {
    customMetaData.ban = action === "ban" ? true : false;

    setBanAlert({
      ...banAlert,
      success: { status: false, msg: "" },
      error: { status: false, msg: "" },
    });
    (async () => {
      try {
        await setUserMetadata(pubnubObject, UUID, customMetaData);
        handleClose();
        setBanAlert({
          ...banAlert,
          success: {
            status: true,
            msg: `User ${capitalizeFirstLetter(action)}ned successfully`,
          },
          error: { status: false, msg: "" },
        });
      } catch (e) {
        handleClose();
        setBanAlert({
          ...banAlert,
          success: { status: false, msg: "" },
          error: { status: true, msg: showError(e.status.errorData) },
        });
      }
    })();
  };

  return (
    <>
      <Dialog
        testid="DialogId"
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="confirm-dialog"
        fullWidth
        maxWidth="xs"
        className={classes.confirmDialog}
      >
        <DialogTitle id="confirm-dialog">{props.title}</DialogTitle>
        <DialogContent>{props.children}</DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
              handleBanClick();
            }}
            className={classes.confirmButton}
          >
            <Typography> Yes</Typography>
          </Button>

          <Button
            variant="contained"
            onClick={() => props.setOpen(false)}
            className={classes.cancelButton}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      {banAlert.error.status && <SnackBar msg={banAlert.error.msg} status={"info"} />}
      {banAlert.success.status && <SnackBar msg={banAlert.success.msg} status={"success"} />}
    </>
  );
}
