import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useStyles } from "../../style/confirmDialog";
import { Typography } from "@material-ui/core";
import { setUserMetadata } from "../../services/pubnub";
import SnackBar from "../core/SnackBar";
import { capitalizeFirstLetter, selectedChannelFromLS } from "../../utils/helpers";

const UserAction = (props) => {
  const classes = useStyles();
  const [muteAlert, setMuteAlert] = useState({
    success: { status: false, msg: "" },
    error: { status: false, msg: "" },
  });
  const selectedChannel = selectedChannelFromLS();
  const customMetaData = props.user.custom || {};
  let mutedChannels = props.user.custom && props.user.custom.mutedChannels;
  let blockedChannels = props.user.custom && props.user.custom.blockedChannels;

  const getMutedChannels = () => {
    if (!mutedChannels) {
      mutedChannels = selectedChannel;
    } else {
      let channels = mutedChannels.split(",");
      if (props.action === "mute") channels.push(selectedChannel);
      else channels = channels.filter((item) => item !== selectedChannel);
      mutedChannels = channels.join(",");
    }
    return mutedChannels;
  };

  const getBlockedChannels = () => {
    if (!blockedChannels) {
      blockedChannels = selectedChannel;
    } else {
      let channels = blockedChannels.split(",");
      if (props.action === "block") channels.push(selectedChannel);
      else channels = channels.filter((item) => item !== selectedChannel);
      blockedChannels = channels.join(",");
    }
    return blockedChannels;
  };

  const handleMuteClick = () => {
    setMuteAlert({
      ...muteAlert,
      success: { status: false, msg: "" },
      error: { status: false, msg: "" },
    });
    if (props.action === "mute" || props.action === "unmute") {
      let channels = getMutedChannels();
      customMetaData.mutedChannels = channels;
    }
    if (props.action === "block" || props.action === "unblock") {
      let channels = getBlockedChannels();
      customMetaData.blockedChannels = channels;
    }
    (async () => {
      try {
        const response = await setUserMetadata(props.pubnub, props.user.id, customMetaData);
        props.updated(response, props.action);
        setMuteAlert({
          ...muteAlert,
          success: {
            status: true,
            msg: "Successfully updated",
          },
          error: { status: false, msg: "" },
        });
      } catch (e) {
        setMuteAlert({
          ...muteAlert,
          success: { status: false, msg: "" },
          error: { status: true, msg: "Failed to add metadata" },
        });
      }
    })();
  };

  return (
    <>
      <Dialog
        testid="DialogId"
        open={props.open}
        onClose={() => props.setOpen(false)}
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
              props.setOpen(false);
              handleMuteClick();
            }}
            className={classes.confirmButton}
          >
            <Typography>Yes, {capitalizeFirstLetter(props.action)} them</Typography>
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
      {muteAlert.error.status && <SnackBar msg={muteAlert.error.msg} status={"info"} />}
      {muteAlert.success.status && <SnackBar msg={muteAlert.success.msg} status={"success"} />}
    </>
  );
};
export default UserAction;
