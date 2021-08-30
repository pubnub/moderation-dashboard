import React from "react";
import { useStyles } from "../../style/createModerationModal";
import {
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
  CircularProgress,
} from "@material-ui/core";

export default function AddUserForm(props) {
  const classes = useStyles();
  return (
    <form onSubmit={props.formik.handleSubmit}>
      <DialogContent>
        <Typography testid="User_Id" className={classes.subHeadingFont}>
          User ID
        </Typography>
        <TextField
          id="user_id"
          name="user_id"
          placeholder="Enter user ID"
          variant="outlined"
          disabled={props.disabled}
          className={classes.inputBox}
          autoComplete="off"
          onChange={props.formik.handleChange}
          value={props.formik.values.user_id}
          error={props.formik.touched.user_id && Boolean(props.formik.errors.user_id)}
          helperText={props.formik.touched.user_id && props.formik.errors.user_id}
        />
        <Typography testid="User_Name" className={classes.subHeadingFont}>
          User Name
        </Typography>
        <TextField
          id="name"
          name="name"
          placeholder="Enter user name"
          variant="outlined"
          className={classes.inputBox}
          autoComplete="off"
          onChange={props.formik.handleChange}
          value={props.formik.values.name}
          error={props.formik.touched.name && Boolean(props.formik.errors.name)}
          helperText={props.formik.touched.name && props.formik.errors.name}
        />
        <Typography testid="Email" className={classes.subHeadingFont}>
          Email Address
        </Typography>
        <TextField
          id="email"
          name="email"
          placeholder="Enter email address"
          variant="outlined"
          className={classes.inputBox}
          autoComplete="off"
          onChange={props.formik.handleChange}
          value={props.formik.values.email}
          error={props.formik.touched.email && Boolean(props.formik.errors.email)}
          helperText={props.formik.touched.email && props.formik.errors.email}
        />
        <Typography testid="Profile_Url" className={classes.subHeadingFont}>
          Profile URL
        </Typography>
        <TextField
          id="profile_url"
          name="profile_url"
          placeholder="Enter Profile URL"
          variant="outlined"
          className={classes.inputBox}
          autoComplete="off"
          onChange={props.formik.handleChange}
          value={props.formik.values.profile_url}
          error={props.formik.touched.profile_url && Boolean(props.formik.errors.profile_url)}
          helperText={props.formik.touched.profile_url && props.formik.errors.profile_url}
        />
        <br />
      </DialogContent>
      <DialogActions>
        <Button autoFocus className={classes.cancelButton} onClick={props.handleClose}>
          CANCEL
        </Button>

        <Button
          autoFocus
          className={classes.addButton}
          type="submit"
          color="primary"
          disabled={props.userAlert.loading}
          startIcon={
            props.userAlert.loading ? (
              <CircularProgress className={classes.loader} size={30} />
            ) : null
          }
        >
          <Typography className={classes.buttonText}>{props.buttonTitle}</Typography>
        </Button>
      </DialogActions>
    </form>
  );
}
