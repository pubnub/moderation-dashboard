/**
 * Displays Message content of a message in a selected channel
 */
import React from "react";
import { useStyles } from "../../style/messages";
import { Box, Grid, Typography, IconButton, Avatar } from "@material-ui/core";
import { LightTooltip } from "../../style/tooltip";
import { getModeratedMessageTooltip, getModeratedReasonTooltip } from "../../utils/helpers";

const MessageContent = (props) => {
  const { message, confirmDelete, updateMessage, confirmUndo, index, toggledVal } = props;
  const classes = useStyles();
  return (
    <>
      {toggledVal === "chat" && (
        <Grid container className={classes.messageContainer}>
          {message.actions && (message.actions === "deleted" || message.actions.deleted) ? (
            <>
              <span
                className={classes.chat}
                style={{
                  backgroundColor: index % 2 !== 0 ? "#FFFFFF" : "#EEF3FF",
                }}
              >
                <Typography className={classes.deletedChat}>{message.text}</Typography>
              </span>
              <Box ml={2}>
                <LightTooltip title="Undo">
                  <IconButton
                    id="undoIcon"
                    edge="start"
                    onClick={(event) => confirmUndo(event, message)}
                  >
                    <img src={process.env.PUBLIC_URL + "/images/undo.svg"} alt="delete" />
                  </IconButton>
                </LightTooltip>
              </Box>
            </>
          ) : (
            <>
              <span
                className={classes.chat}
                style={{
                  backgroundColor: index % 2 !== 0 ? "#FFFFFF" : "#EEF3FF",
                }}
              >
                {message.text && (
                  <Typography className={classes.chatText}>{message.text}</Typography>
                )}
                {message.file && message.file.url && (
                  <>
                    <Avatar src={message.file.url} className={classes.image} />
                  </>
                )}
              </span>

              <Box ml={2}>
                <LightTooltip title="Edit">
                  <IconButton
                    id="updateIcon"
                    edge="start"
                    label="edit"
                    onClick={(event) => updateMessage(event, message)}
                  >
                    <img src={process.env.PUBLIC_URL + "/images/edit-message.svg"} alt="edit" />
                  </IconButton>
                </LightTooltip>
                <LightTooltip title="Delete">
                  <IconButton
                    id="deleteIcon"
                    edge="start"
                    label="delete"
                    onClick={(event) => confirmDelete(event, message)}
                  >
                    <img src={process.env.PUBLIC_URL + "/images/delete-message.svg"} alt="delete" />
                  </IconButton>
                </LightTooltip>
              </Box>
            </>
          )}
        </Grid>
      )}
      {toggledVal === "banned" && (
        <Grid container>
          <>
            <span
              className={classes.chat}
              style={{
                backgroundColor: index % 2 !== 0 ? "#FFFFFF" : "#EEF3FF",
              }}
            >
              <Typography className={classes.chatText}>
                <LightTooltip
                  title={
                    <>
                      <Typography>{getModeratedReasonTooltip(message.reason)}</Typography>
                      <br />
                      <Typography>
                        {getModeratedMessageTooltip(message.moderatedMessage)}
                      </Typography>
                    </>
                  }
                >
                  <Typography className={classes.chatText}>{message.originalMessage}</Typography>
                </LightTooltip>
              </Typography>
              {message.image && (
                <>
                  <IconButton className={classes.imageContainer}>
                    <img className={classes.image} src={message.image} alt="sentImage" />
                    {message.imageReason && (
                      <LightTooltip
                        title={
                          <>
                            <Typography>{`Reason: ${
                              message.imageReason[0] && message.imageReason[0].text
                            }`}</Typography>
                          </>
                        }
                        placement="right-start"
                      >
                        <img
                          src={process.env.PUBLIC_URL + "/images/info.svg"}
                          alt="profilePicture"
                          className={classes.imageIcon}
                        />
                      </LightTooltip>
                    )}
                  </IconButton>
                </>
              )}
            </span>
          </>
        </Grid>
      )}
    </>
  );
};

export default MessageContent;
