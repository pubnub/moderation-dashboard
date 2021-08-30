import React, { useState, useEffect } from "react";
import { DialogTitle, Dialog, Typography, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useStyles } from "../../style/createModerationModal";
import { editChannelMetadata } from "../../services/pubnub";
import SnackBar from "../core/SnackBar";
import { showError } from "../../utils/helpers";
import { useFormik } from "formik";
import AddChannelForm from "./AddChannelForm";
import { channelValidationSchema } from "./AddChannelMetadataModal";

export default function UpdateChannelMetadataModal(props) {
  const { pubnubObject, open, setOpen, data, channelUpdated } = props;
  const [name, setName] = useState("");
  const [description, setDescription] = useState(null);
  const [channelID, setChannelID] = useState("");
  const [updateChannelAlert, setUpdateChannelAlert] = useState({
    success: { status: false, msg: "" },
    error: { status: false, msg: "" },
    loading: false,
  });

  const classes = useStyles();

  useEffect(() => {
    setName(data.name);
    setDescription(data.description);
    setChannelID(data.id);
  }, [data]);

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      description: !description ? "" : description,
      name: name,
      id: channelID,
    },
    enableReinitialize: true,
    validationSchema: channelValidationSchema,
    onSubmit: (values) => {
      updateChannelMetadata(values);
    },
  });

  const updateChannelMetadata = (values) => {
    setUpdateChannelAlert({
      ...updateChannelAlert,
      success: { status: false, msg: "" },
      error: { status: false, msg: "" },
      loading: true,
    });
    (async () => {
      try {
        const channelResponse = await editChannelMetadata(
          pubnubObject,
          values.name,
          values.description,
          channelID
        );
        handleClose();
        setUpdateChannelAlert({
          ...updateChannelAlert,
          success: { status: true, msg: "Channel updated successfully." },
          error: { status: false, msg: "" },
          loading: false,
        });
        channelUpdated(channelResponse);
      } catch (e) {
        handleClose();
        setUpdateChannelAlert({
          ...updateChannelAlert,
          success: { status: false, msg: "" },
          error: { status: true, msg: showError(e.status.errorData) },
          loading: false,
        });
      }
    })();
  };

  return (
    <div>
      <Dialog
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className={classes.modalLayout}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose} disableTypography>
          <Typography testid="UpdateChannel" variant="h6" className={classes.headingFont}>
            Update Channel Metadata
          </Typography>
          {open ? (
            <IconButton
              testId="closeIcon"
              aria-label="close"
              onClick={handleClose}
              className={classes.closeButton}
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </DialogTitle>
        <AddChannelForm
          formik={formik}
          channelAlert={updateChannelAlert}
          handleClose={handleClose}
          buttonTitle={"UPDATE"}
          disabled={true}
        />
      </Dialog>
      {updateChannelAlert.error.status && (
        <SnackBar msg={updateChannelAlert.error.msg} status={"info"} />
      )}
      {updateChannelAlert.success.status && (
        <SnackBar msg={updateChannelAlert.success.msg} status={"success"} />
      )}
    </div>
  );
}
