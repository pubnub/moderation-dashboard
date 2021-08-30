import React from "react";
import { useStyles } from "../../style/createModerationModal";
import {
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
  CircularProgress,
  Box,
} from "@material-ui/core";

export default function AddChannelForm(props) {
  const classes = useStyles();
  return (
    <form onSubmit={props.formik.handleSubmit}>
      <DialogContent>
        <Typography testid="Channel_Id" className={classes.subHeadingFont}>
          Channel ID
        </Typography>
        <TextField
          name="id"
          id="id"
          disabled={props.disabled}
          placeholder="Enter Channel ID"
          variant="outlined"
          className={classes.inputBox}
          autoComplete="off"
          onChange={props.formik.handleChange}
          value={props.formik.values.id}
          error={props.formik.touched.id && Boolean(props.formik.errors.id)}
          helperText={props.formik.touched.id && props.formik.errors.id}
        />
        <Box pt={1}>
          <Typography testid="Display_Name" className={classes.subHeadingFont}>
            Display Name
          </Typography>
          <TextField
            id="name"
            name="name"
            placeholder="Enter Display Name"
            variant="outlined"
            className={classes.inputBox}
            autoComplete="off"
            onChange={props.formik.handleChange}
            value={props.formik.values.name}
            error={props.formik.touched.name && Boolean(props.formik.errors.name)}
            helperText={props.formik.touched.name && props.formik.errors.name}
          />
        </Box>
        <Box pt={1}>
          <Typography testid="Description" className={classes.subHeadingFont}>
            Description
          </Typography>
          <TextField
            id="description"
            name="description"
            placeholder="Enter Channel Description"
            variant="outlined"
            className={classes.inputBox}
            multiline
            rows={3}
            autoComplete="off"
            onChange={props.formik.handleChange}
            value={props.formik.values.description}
            error={props.formik.touched.description && Boolean(props.formik.errors.description)}
            helperText={props.formik.touched.description && props.formik.errors.description}
          />
        </Box>
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
          disabled={props.channelAlert.loading}
          startIcon={
            props.channelAlert.loading ? (
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
