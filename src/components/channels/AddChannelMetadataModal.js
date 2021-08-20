import React, { useState } from "react";
import { DialogTitle, Dialog, Typography, IconButton, Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useStyles } from "../../style/createModerationModal";
import { addChannelMetadata, checkChannelExistence } from "../../services/pubnub";
import SnackBar from "../core/SnackBar";
import { checkValidChannelName, showError } from "../../utils/helpers";
import * as yup from "yup";
import { useFormik } from "formik";
import AddChannelForm from "./AddChannelForm";

export const channelValidationSchema = yup.object({
  id: yup
    .string("Enter channel name")
    .strict(true)
    .matches(/^\S*$/, "Channel ID must not contain spaces")
    .test("Channel ID not valid", "Channel ID not valid", (value) => !checkValidChannelName(value))
    .required("Channe ID is required"),
  name: yup.string("Enter display name").required("Display name is required"),
});

export default function AddChannelMetadataModal({ pubnubObject, isAdded }) {
  const [open, setOpen] = useState(false);
  const [addChannelAlert, setAddChannelAlert] = useState({
    success: { status: false, msg: "" },
    error: { status: false, msg: "" },
    loading: false,
  });

  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      description: "",
      name: "",
      id: "",
    },
    validationSchema: channelValidationSchema,
    onSubmit: (values) => {
      addNewChannelMetadata(values);
    },
  });

  const addNewChannelMetadata = (values) => {
    setAddChannelAlert({
      ...addChannelAlert,
      success: { status: false, msg: "" },
      error: { status: false, msg: "" },
      loading: true,
    });
    (async () => {
      try {
        const channel = await checkChannelExistence(pubnubObject, values.id);
        if (channel && channel.length) {
          setAddChannelAlert({
            ...addChannelAlert,
            success: { status: false, msg: "" },
            error: { status: true, msg: "Channel already exists!" },
            loading: false,
          });
        } else {
          try {
            const channelResponse = await addChannelMetadata(
              pubnubObject,
              values.name,
              values.description,
              values.id
            );
            handleClose();
            setAddChannelAlert({
              ...addChannelAlert,
              success: { status: true, msg: "Channel added successfully." },
              error: { status: false, msg: "" },
              loading: false,
            });
            isAdded(channelResponse);
          } catch (e) {
            handleClose();
            setAddChannelAlert({
              ...addChannelAlert,
              success: { status: false, msg: "" },
              error: { status: true, msg: showError(e.status.errorData) },
              loading: false,
            });
          }
        }
      } catch (e) {
        setAddChannelAlert({
          ...addChannelAlert,
          success: { status: false, msg: "" },
          error: { status: true, msg: e.message },
          loading: false,
        });
      }
    })();
  };

  return (
    <div>
      <Button
        id="addChannel"
        startIcon={<img src={process.env.PUBLIC_URL + "/images/add-channel.svg"} alt="add" />}
        onClick={handleClickOpen}
        className={classes.addChannelButton}
      >
        <Typography className={classes.addChannelButtonFont}>Add Channel</Typography>
      </Button>
      <Dialog
        id="dialog"
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className={classes.modalLayout}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose} disableTypography>
          <Typography variant="h6" className={classes.headingFont}>
            Add Channel
          </Typography>
          {open ? (
            <IconButton
              id="closeButton"
              aria-label="close"
              onClick={handleClose}
              className={classes.closeButton}
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </DialogTitle>
        <AddChannelForm
          id="add"
          formik={formik}
          channelAlert={addChannelAlert}
          handleClose={handleClose}
          buttonTitle={"ADD"}
          disabled={false}
        />
      </Dialog>
      {addChannelAlert.error.status && <SnackBar msg={addChannelAlert.error.msg} status={"info"} />}
      {addChannelAlert.success.status && (
        <SnackBar msg={addChannelAlert.success.msg} status={"success"} />
      )}
    </div>
  );
}
