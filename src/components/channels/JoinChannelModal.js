import React, { useState } from "react";
import {
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
  Dialog,
  Typography,
  IconButton,
  TextField,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useStyles } from "../../style/createModerationModal";
import { LightTooltip } from "../../style/tooltip";
import { useHistory } from "react-router";

export function JoinChannelModal() {
  const [open, setOpen] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [error, setError] = useState(false);

  const history = useHistory();

  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setError(false);
    setOpen(false);
  };

  const joinChannel = () => {
    if (!channelName) {
      setError(true);
      return false;
    }
    history.push({
      pathname: "/channels/messages",
      state: { channel: channelName },
    });
  };

  return (
    <div>
      <LightTooltip title="If you have a channel ID, you can directly join in this by clicking on this button and entering the channel ID">
        <Button
          id="joinChannelButton"
          onClick={handleClickOpen}
          className={classes.joinChannelButton}
          startIcon={<img src={process.env.PUBLIC_URL + "/images/link.svg"} alt="" />}
        >
          <Typography className={classes.buttonText}>Join Channel</Typography>
        </Button>
      </LightTooltip>
      <Dialog
        id="dialog"
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose} disableTypography>
          <Typography variant="h6" className={classes.headingFont}>
            Join Channel
          </Typography>
          {open ? (
            <IconButton aria-label="close" onClick={handleClose} className={classes.closeButton}>
              <CloseIcon />
            </IconButton>
          ) : null}
        </DialogTitle>
        <DialogContent>
          <Typography testid="channelId" className={classes.subHeadingFont}>
            Channel ID
          </Typography>
          <TextField
            id="channelId"
            placeholder="Enter Channel ID"
            variant="outlined"
            className={classes.inputBox}
            onChange={(e) => setChannelName(e.target.value)}
            error={error}
            helperText={error ? "Channel is Required" : ""}
            autoComplete="off"
          />
        </DialogContent>
        <DialogActions>
          <Button id="cancelButton" onClick={handleClose} className={classes.cancelButton}>
            Cancel
          </Button>
          <Button
            id="joinButton"
            className={classes.addButton}
            onClick={joinChannel}
            color="primary"
          >
            <Typography className={classes.buttonText}>Join Channel</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
