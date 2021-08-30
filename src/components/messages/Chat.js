/**
 * Displays Messages in a selected channel
 */
import React, { useState, useEffect, useRef } from "react";
import { Avatar, Box, Grid, Typography, CircularProgress } from "@material-ui/core";
import { useStyles } from "../../style/messages";
import Alert from "@material-ui/lab/Alert";
import { formatUserName, formatProfileImageUrl } from "../../utils/helpers";
import ConfirmDialog from "../core/ConfirmDialog";
import { softDeleteMessage } from "../../services/pubnub";
import UndoDelete from "./UndoDelete";
import EditMessage from "./EditMessage";
import MessageContent from "./MessageContent";

export default function Chat(props) {
  const classes = useStyles();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState([]);
  const [messages, setMessages] = useState([]);
  const [undoConfirmOpen, setUndoConfirmOpen] = useState(false);

  /**
   * Handles delete icon click to confirm delete message action
   */
  const confirmDelete = (event, message) => {
    setConfirmOpen(true);
    setSelectedMessage(message);
  };

  /**
   * Handles soft deleting a message in a channel
   */
  const deleteMessage = () => {
    (async () => {
      try {
        const response = await softDeleteMessage(
          props.pubnub,
          props.channel,
          selectedMessage.timetoken
        );
        props.updated(selectedMessage.timetoken, response.actionTimetoken);
      } catch (e) {}
    })();
  };

  /**
   * Handles undo icon click to confirm recovering a message
   */
  const confirmUndo = (event, message) => {
    setUndoConfirmOpen(true);
    setSelectedMessage(message);
  };

  /**
   * Handles edit icon click to edit a message
   */
  const updateMessage = (event, message) => {
    props.setMessageToEdit(message);
  };

  const messagesEndRef = useRef(null);
  useEffect(() => {
    setMessages(props.messages);
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView();
    }, 100);
  }, [props.messages]);

  return (
    <>
      {messages.length || props.isLoading ? (
        <Grid item className={classes.messages}>
          {messages.map((message, n) => {
            return (
              <div key={n}>
                {props.toggledVal === "chat" && (
                  <>
                    <Grid container>
                      <Box>
                        <Avatar variant="square" src={formatProfileImageUrl(message.profileUrl)} />
                      </Box>
                      <Typography className={classes.user}>
                        {formatUserName(message.name)}
                      </Typography>
                    </Grid>
                    <MessageContent
                      id="messageContent"
                      message={message}
                      confirmDelete={confirmDelete}
                      updateMessage={updateMessage}
                      confirmUndo={confirmUndo}
                      index={n}
                      toggledVal={props.toggledVal}
                    />
                    <Typography className={classes.timeField}>{message.time}</Typography>
                  </>
                )}
                {props.toggledVal === "banned" && (
                  <>
                    <Grid container>
                      <Box>
                        <Avatar variant="square" src={formatProfileImageUrl(message.profileUrl)} />
                      </Box>
                      <Typography className={classes.user}>
                        {formatUserName(message.name)}
                      </Typography>
                    </Grid>
                    <MessageContent message={message} toggledVal={props.toggledVal} index={n} />
                    <Typography className={classes.timeField}>{message.time}</Typography>
                  </>
                )}
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </Grid>
      ) : (
        <Alert severity={"info"} className={classes.alertMessage}>
          No recent messages found
        </Alert>
      )}

      <ConfirmDialog
        id="delete"
        title="Are you sure?"
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={deleteMessage}
        actionMessage={"Yes, Delete it"}
      >
        You can always undo this action
      </ConfirmDialog>
      <UndoDelete
        title="Are you sure?"
        open={undoConfirmOpen}
        setOpen={setUndoConfirmOpen}
        channel={props.channel}
        pubnub={props.pubnub}
        message={selectedMessage}
        updated={props.updated}
      >
        You want to recover the message
      </UndoDelete>
      {props.isLoading ? (
        <Grid justify="center" container>
          <Box pt={3}>
            <CircularProgress />
          </Box>
        </Grid>
      ) : null}
      <EditMessage
        message={props.messageToEdit}
        channel={props.channel}
        pubnub={props.pubnub}
        updated={props.updated}
        messagesLength={messages.length}
      />
    </>
  );
}
