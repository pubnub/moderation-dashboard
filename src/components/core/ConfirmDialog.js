import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useStyles } from "../../style/confirmDialog";
import { Typography } from "@material-ui/core";

const ConfirmDialog = (props) => {
  const { title, children, open, setOpen, onConfirm } = props;
  const classes = useStyles();

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
      <DialogContent id="content">{children}</DialogContent>
      <DialogActions>
        <Button
          id="confirm"
          onClick={() => {
            setOpen(false);
            onConfirm();
          }}
          className={classes.confirmButton}
        >
          <Typography>{props.actionMessage}</Typography>
        </Button>

        <Button
          id="cancel"
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
export default ConfirmDialog;
