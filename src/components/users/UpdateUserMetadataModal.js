import React, { useState, useEffect } from "react";
import { DialogTitle, Dialog, Typography, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useStyles } from "../../style/createModerationModal";
import { editUserMetadata } from "../../services/pubnub";
import SnackBar from "../core/SnackBar";
import { showError } from "../../utils/helpers";
import { useFormik } from "formik";
import AddUserForm from "./AddUserForm";
import { userValidationSchema } from "./AddUserMetadataModal";

export default function UpdateUserMetadataModal(props) {
  const { pubnubObject, open, setOpen, data, isUpdated } = props;
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState(null);
  const [UUID, setUUID] = useState("");
  const [profileUrl, setProfileUrl] = useState(null);
  const [updateUserAlert, setUpdateUserAlert] = useState({
    success: { status: false, msg: "" },
    error: { status: false, msg: "" },
    loading: false,
  });
  const classes = useStyles();

  useEffect(() => {
    setUserName(data.name);
    setEmail(data.email);
    setUUID(data.id);
    setProfileUrl(data.profileUrl);
  }, [data]);

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      email: !email ? "" : email,
      name: userName,
      user_id: UUID,
      profile_url: !profileUrl ? "" : profileUrl,
    },
    enableReinitialize: true,
    validationSchema: userValidationSchema,
    onSubmit: (values) => {
      updateUserMetadata(values);
    },
  });

  const updateUserMetadata = (values) => {
    setUpdateUserAlert({
      ...updateUserAlert,
      success: { status: false, msg: "" },
      error: { status: false, msg: "" },
      loading: true,
    });
    (async () => {
      try {
        const userResponse = await editUserMetadata(
          pubnubObject,
          values.name,
          values.email,
          values.user_id,
          values.profile_url
        );
        handleClose();
        setUpdateUserAlert({
          ...updateUserAlert,
          success: { status: true, msg: "User updated successfully" },
          error: { status: false, msg: "" },
          loading: false,
        });
        isUpdated(userResponse);
      } catch (e) {
        handleClose();
        setUpdateUserAlert({
          ...updateUserAlert,
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
          <Typography variant="h6" className={classes.headingFont}>
            Update User Metadata
          </Typography>
          {open ? (
            <IconButton aria-label="close" onClick={handleClose} className={classes.closeButton}>
              <CloseIcon />
            </IconButton>
          ) : null}
        </DialogTitle>
        <AddUserForm
          formik={formik}
          userAlert={updateUserAlert}
          handleClose={handleClose}
          buttonTitle={"UPDATE"}
          disabled={true}
        />
      </Dialog>
      {updateUserAlert.error.status && <SnackBar msg={updateUserAlert.error.msg} status={"info"} />}
      {updateUserAlert.success.status && (
        <SnackBar msg={updateUserAlert.success.msg} status={"success"} />
      )}
    </div>
  );
}
