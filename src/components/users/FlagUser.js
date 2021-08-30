import React, { useState, useEffect } from "react";
import {
  DialogTitle,
  Dialog,
  Typography,
  IconButton,
  TextField,
  DialogActions,
  Button,
  CircularProgress,
  DialogContent,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useStyles } from "../../style/createModerationModal";
import { setUserMetadata } from "../../services/pubnub";
import SnackBar from "../core/SnackBar";
import { capitalizeFirstLetter, showError, selectedAccountsFromLS } from "../../utils/helpers";
import * as yup from "yup";
import { useFormik } from "formik";

const validationSchema = yup.object({
  reason: yup.string().required("Reason is required"),
});

export default function FlagUser(props) {
  const { pubnub, open, setOpen, uuid, isUpdated, action } = props;
  const [userID, setuserID] = useState("");
  const [flagAlert, setFlagAlert] = useState({
    success: { status: false, msg: "" },
    error: { status: false, msg: "" },
    loading: false,
  });
  const classes = useStyles();
  const selectedAcount = selectedAccountsFromLS();
  const updatedAt = new Date();
  const customMetaData = uuid.custom || {};

  useEffect(() => {
    setuserID(uuid.id);
  }, [uuid]);

  const handleClose = () => {
    formik.resetForm();
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      reason: "",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      flagUser(values);
    },
  });

  const flagUser = (values) => {
    setFlagAlert({
      ...flagAlert,
      success: { status: false, msg: "" },
      error: { status: false, msg: "" },
      loading: true,
    });
    customMetaData.reason = values.reason;
    customMetaData.flaggedBy = selectedAcount && selectedAcount.email;
    customMetaData.flaggedAt = updatedAt;
    customMetaData.flag = action === "flag" ? true : false;
    (async () => {
      try {
        const userResponse = await setUserMetadata(pubnub, userID, customMetaData);
        handleClose();
        setFlagAlert({
          ...flagAlert,
          success: {
            status: true,
            msg: `User ${capitalizeFirstLetter(action)}ged successfully.`,
          },
          error: { status: false, msg: "" },
          loading: false,
        });
        isUpdated(userResponse);
      } catch (e) {
        handleClose();
        setFlagAlert({
          ...flagAlert,
          success: { status: false, msg: "" },
          error: { status: true, msg: showError(e.status.errorData) },
          loading: false,
        });
      }
    })();
  };

  return (
    <>
      <Dialog
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className={classes.modalLayout}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose} disableTypography>
          <Typography variant="h6" className={classes.headingFont}>
            {capitalizeFirstLetter(action)} User
          </Typography>
          <IconButton aria-label="close" onClick={handleClose} className={classes.closeButton}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <Typography testid="reason" className={classes.subHeadingFont}>
              Reason
            </Typography>
            <TextField
              id="reason"
              name="reason"
              placeholder="Add Reason"
              variant="outlined"
              className={classes.inputBox}
              autoComplete="off"
              onChange={formik.handleChange}
              value={formik.values.reason}
              error={formik.touched.reason && Boolean(formik.errors.reason)}
              helperText={formik.touched.reason && formik.errors.reason}
            />

            <br />
          </DialogContent>
          <DialogActions>
            <Button id="cancel" autoFocus className={classes.cancelButton} onClick={handleClose}>
              CANCEL
            </Button>

            <Button
              id="submit"
              autoFocus
              className={classes.addButton}
              type="submit"
              color="primary"
              disabled={flagAlert.loading}
              startIcon={
                flagAlert.loading ? <CircularProgress className={classes.loader} size={30} /> : null
              }
            >
              <Typography className={classes.buttonText}>Submit</Typography>
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      {flagAlert.error.status && <SnackBar msg={flagAlert.error.msg} status={"info"} />}
      {flagAlert.success.status && <SnackBar msg={flagAlert.success.msg} status={"success"} />}
    </>
  );
}
