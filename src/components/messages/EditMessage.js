import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  InputAdornment,
  Box,
  Typography,
  IconButton,
  Grid,
} from "@material-ui/core";
import { addEditMessageAction, deleteMessageAction } from "../../services/pubnub";
import { useStyles } from "../../style/messages";
import SnackBar from "../core/SnackBar";

const EditMessage = (props) => {
  const { pubnub, channel, message } = props;
  const [text, setText] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [displayBox, setDisplayBox] = useState(false);
  const [actionToken, setActionToken] = useState("");
  const classes = useStyles();
  const [alertMessage, setAlertMessage] = useState({
    success: { status: false, msg: "" },
    error: { status: false, msg: "" },
  });

  useEffect(() => {
    if (message.text) {
      let token =
        message.actions &&
        message.actions.updated &&
        message.actions.updated[Object.keys(message.actions.updated)[0]];
      if (token) setActionToken(token[0].actionTimetoken);
      setText(message.text);
      setDisabled(false);
      setDisplayBox(true);
    }
  }, [message]);

  const updateMessage = () => {
    setAlertMessage({
      ...alertMessage,
      success: { status: false, msg: "" },
      error: { status: false, msg: "" },
    });
    (async () => {
      try {
        if (actionToken) {
          await deleteMessageAction(pubnub, channel, message.timetoken, actionToken);
        }
        const response = await addEditMessageAction(pubnub, channel, message.timetoken, text);
        setText("");
        setDisabled(true);
        setDisplayBox(false);
        props.updated(message.timetoken, message.actionToken, "updated", response);
      } catch (e) {
        setAlertMessage({
          ...alertMessage,
          success: { status: false, msg: "" },
          error: { status: true, msg: "Failed to edit message" },
        });
      }
    })();
  };

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const closeEditing = () => {
    setDisplayBox(false);
    setDisabled(true);
    setText("");
    props.updated(message.timetoken, message.actionToken, "updated", "");
  };
  return (
    <>
      {displayBox ? (
        <Box className={classes.messageBox}>
          <Grid justify="space-between" container>
            <Grid item>
              <Typography className={classes.editMessageHeader}>Edit Message</Typography>
              <Typography className={classes.editMessageFont}>{message.text}</Typography>
            </Grid>
            <Grid item>
              <IconButton id="close" onClick={closeEditing}>
                <img src={process.env.PUBLIC_URL + "/images/close.svg"} alt="close" />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      ) : null}
      {props.messagesLength ? (
        <TextField
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button onClick={updateMessage}>
                  <img src={process.env.PUBLIC_URL + "/images/send-button.svg"} alt="edit" />
                </Button>
              </InputAdornment>
            ),
          }}
          id="message"
          name="message"
          placeholder="Enter your message here"
          variant="outlined"
          fullWidth
          value={text}
          onChange={handleInputChange}
          autoComplete="off"
          disabled={disabled}
        />
      ) : null}
      {alertMessage.error.status && <SnackBar msg={alertMessage.error.msg} status={"info"} />}
    </>
  );
};
export default EditMessage;
