import React, { useState } from "react";
import { DialogTitle, Button, Dialog, Typography, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useStyles } from "../../style/createModerationModal";
import { addUserMetadata, checkUserIDExistence } from "../../services/pubnub";
import SnackBar from "../core/SnackBar";
import { showError } from "../../utils/helpers";
import * as yup from "yup";
import { useFormik } from "formik";
import AddUserForm from "./AddUserForm";

export const userValidationSchema = yup.object({
  email: yup.string("Enter your email").email("Enter a valid email"),
  name: yup.string("Enter your name").required("User name is required"),
  user_id: yup
    .string("Enter your user ID")
    .required("User ID is required")
    .min(3, "Must be min 3 characters")
    .max(64, "Must be max 64 characters"),
  profile_url: yup.lazy((value) =>
    /^data/.test(value)
      ? yup
          .string()
          .matches(
            /^data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@/?%\s]*)$/i,
            "Must be a valid data URI"
          )
      : yup.string().url("Enter a valid URL")
  ),
});

export default function AddUserMetadataModal({ pubnubObject, isAdded }) {
  const [open, setOpen] = useState(false);
  const [addUserAlert, setAddUserAlert] = useState({
    success: { status: false, msg: "" },
    error: { status: false, msg: "" },
    loading: false,
  });
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      user_id: "",
      profile_url: "",
    },
    validationSchema: userValidationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      addNewUserMetadata(values);
    },
  });

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };

  const addNewUserMetadata = (values) => {
    setAddUserAlert({
      ...addUserAlert,
      success: { status: false, msg: "" },
      error: { status: false, msg: "" },
      loading: true,
    });
    (async () => {
      try {
        const user = await checkUserIDExistence(pubnubObject, values.user_id);
        if (user && user.length) {
          setAddUserAlert({
            ...addUserAlert,
            success: { status: false, msg: "" },
            error: { status: true, msg: "User ID already exists!" },
            loading: false,
          });
        } else {
          try {
            const userData = await addUserMetadata(
              pubnubObject,
              values.name,
              values.email,
              values.user_id,
              values.profile_url
            );
            handleClose();
            setAddUserAlert({
              ...addUserAlert,
              success: { status: true, msg: "User added successfully" },
              error: { status: false, msg: "" },
              loading: false,
            });
            isAdded(userData);
          } catch (e) {
            handleClose();
            setAddUserAlert({
              ...addUserAlert,
              success: { status: false, msg: "" },
              error: { status: true, msg: showError(e.status.errorData) },
              loading: false,
            });
          }
        }
      } catch (e) {
        setAddUserAlert({
          ...addUserAlert,
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
        testid="button_id"
        className={classes.joinChannelButton}
        startIcon={<img src={process.env.PUBLIC_URL + "/images/plus.svg"} alt="add" />}
        onClick={handleClickOpen}
      >
        <Typography testid="add_user" className={classes.buttonText}>
          Add user
        </Typography>
      </Button>
      <Dialog
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className={classes.modalLayout}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose} disableTypography>
          <Typography variant="h6" className={classes.headingFont}>
            Add User
          </Typography>
          {open ? (
            <IconButton aria-label="close" onClick={handleClose} className={classes.closeButton}>
              <CloseIcon />
            </IconButton>
          ) : null}
        </DialogTitle>
        <AddUserForm
          formik={formik}
          userAlert={addUserAlert}
          handleClose={handleClose}
          buttonTitle={"ADD"}
          disabled={false}
        />
      </Dialog>
      {addUserAlert.error.status && <SnackBar msg={addUserAlert.error.msg} status={"info"} />}
      {addUserAlert.success.status && (
        <SnackBar msg={addUserAlert.success.msg} status={"success"} />
      )}
    </div>
  );
}
