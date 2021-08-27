import React from "react";
import { Typography } from "@material-ui/core";
import { LightTooltip } from "../../style/tooltip";
import { formatDate } from "../../utils/helpers";

export default function Markers(props) {
  const isflagged = props.row && props.row.custom && props.row.custom.flag;
  const isBanned = props.row && props.row.custom && props.row.custom.ban;
  return (
    <>
      {props.isUser && isflagged ? (
        <LightTooltip
          title={
            <>
              <Typography>{`Reason: ${props.row.custom.reason}`}</Typography>
              <br />
              <Typography>{`Flagged By: ${props.row.custom.flaggedBy}`}</Typography>
              <br />
              <Typography>{`Flagged At: ${formatDate(props.row.custom.flaggedAt)}`}</Typography>
            </>
          }
        >
          <img src={process.env.PUBLIC_URL + "/images/flagged.svg"} alt="flagged" />
        </LightTooltip>
      ) : null}
      {props.isUser && isBanned ? (
        <img src={process.env.PUBLIC_URL + "/images/banned.svg"} alt="banned" />
      ) : null}
    </>
  );
}
