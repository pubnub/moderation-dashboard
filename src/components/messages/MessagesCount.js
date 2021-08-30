import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import { getMessagesCount } from "../../services/pubnub";
import { useStyles } from "../../style/messages";
import SnackBar from "../core/SnackBar";
import { lastMidnightHours } from "../../utils/helpers";

export default function MessagesCount(props) {
  const classes = useStyles();
  const [count, setCount] = useState(0);
  const [alert, setAlert] = useState({
    success: { status: false, msg: "" },
    error: { status: false, msg: "" },
  });
  const midnightTimeToken = lastMidnightHours();

  useEffect(() => {
    setAlert({
      ...alert,
      success: { status: false, msg: "" },
      error: { status: false, msg: "" },
    });
    (async () => {
      try {
        const messagesCount = await getMessagesCount(
          props.pubnub,
          props.channelName,
          midnightTimeToken
        );
        setCount(messagesCount);
      } catch (e) {
        setAlert({
          ...alert,
          success: { status: false, msg: "" },
          error: { status: true, msg: e.message },
        });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.channelName]);

  return (
    <>
      <Typography className={classes.messagesCountFont}>Today({count})</Typography>
      {alert.error.status && <SnackBar msg={alert.error.msg} status={"info"} />}
    </>
  );
}
