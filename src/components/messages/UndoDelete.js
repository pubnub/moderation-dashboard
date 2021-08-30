import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useStyles } from "../../style/confirmDialog";
import { Typography } from "@material-ui/core";
import { deleteMessageAction } from "../../services/pubnub";

const UndoDelete = (props) => {
  const { title, children, open, setOpen, pubnub, channel, message } = props;
  const classes = useStyles();

  const handleUndoClick = () => {
    (async () => {
      try {
        await deleteMessageAction(pubnub, channel, message.timetoken, message.actionToken);
        props.updated(message.timetoken, message.actionToken, "undo");
      } catch (e) {}
    })();
  };

  return (
    <Dialog
      id="dialog"
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="confirm-dialog"
      fullWidth
      maxWidth="xs"
      className={classes.confirmDialog}
    >
      <DialogTitle id="confirm-dialog">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button
          id="undo"
          onClick={() => {
            setOpen(false);
            handleUndoClick();
          }}
          className={classes.confirmButton}
        >
          <Typography> Yes</Typography>
        </Button>

        <Button
          id="close"
          variant="contained"
          onClick={() => setOpen(false)}
          className={classes.cancelButton}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default UndoDelete;
