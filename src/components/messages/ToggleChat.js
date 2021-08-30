import React from "react";
import { Button } from "@material-ui/core";
import { useStyles } from "../../style/messages";

export default function ToggleChat(props) {
  const classes = useStyles();
  return (
    <>
      <Button
        id="chat"
        onClick={() => {
          props.setToggledVal("chat");
        }}
        className={props.toggledVal === "chat" ? classes.activeToggled : classes.disableToggled}
      >
        Chat
      </Button>
      <Button
        id="ban"
        onClick={() => {
          props.setToggledVal("banned");
        }}
        className={props.toggledVal === "banned" ? classes.activeToggled : classes.disableToggled}
      >
        Banned
      </Button>
    </>
  );
}
