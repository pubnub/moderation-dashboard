import React from "react";
import { IconButton } from "@material-ui/core";
import { useStyles } from "../../style/listingTable";
import { LightTooltip } from "../../style/tooltip";

export default function TableIcons(props) {
  const { row } = props;
  const classes = useStyles();
  const isflagged = props.row && props.row.custom && props.row.custom.flag;
  const isBanned = props.row && props.row.custom && props.row.custom.ban;

  return (
    <div>
      {(() => {
        if (props.isUser && !isflagged && !isBanned) {
          return (
            <LightTooltip title="Flag">
              <IconButton
                edge="start"
                className={classes.icons}
                onClick={(event) => props.flagUser(event, row)}
              >
                <img src={process.env.PUBLIC_URL + "/images/flag.svg"} alt="flag" />
              </IconButton>
            </LightTooltip>
          );
        } else if (props.isUser && !isBanned) {
          return (
            <LightTooltip title="Unflag">
              <IconButton
                edge="start"
                className={classes.icons}
                onClick={(event) => props.unFlagUser(event, row)}
              >
                <img src={process.env.PUBLIC_URL + "/images/flag.svg"} alt="flag" />
              </IconButton>
            </LightTooltip>
          );
        }
      })()}

      {(() => {
        if (props.isUser && !isBanned) {
          return (
            <LightTooltip title="Ban">
              <IconButton
                edge="start"
                className={classes.icons}
                onClick={(event) => props.banUser(event, row)}
              >
                <img src={process.env.PUBLIC_URL + "/images/ban.svg"} alt="block" />
              </IconButton>
            </LightTooltip>
          );
        } else if (props.isUser) {
          return (
            <LightTooltip title="Unban">
              <IconButton
                edge="start"
                className={classes.icons}
                onClick={(event) => props.unbanUser(event, row)}
              >
                <img src={process.env.PUBLIC_URL + "/images/ban.svg"} alt="block" />
              </IconButton>
            </LightTooltip>
          );
        }
      })()}

      {!props.isUser ? (
        <LightTooltip title="View">
          <IconButton
            edge="start"
            label="view"
            className={classes.icons}
            onClick={(event) => props.viewRow(event, row.id)}
          >
            <img src={process.env.PUBLIC_URL + "/images/watch.svg"} alt="view" />
          </IconButton>
        </LightTooltip>
      ) : null}
      <LightTooltip title="Edit">
        <IconButton
          edge="start"
          className={classes.icons}
          onMouseOver={() => props.setOver(true)}
          onMouseOut={() => props.setOver(false)}
          onClick={(event) => props.editRow(event, row)}
        >
          <img src={process.env.PUBLIC_URL + "/images/edit.svg"} alt="edit" />
        </IconButton>
      </LightTooltip>
      <LightTooltip title="Delete">
        <IconButton
          edge="start"
          label="delete"
          className={classes.icons}
          onMouseOver={() => props.setOver(true)}
          onMouseOut={() => props.setOver(false)}
          onClick={(event) => props.deleteRow(event, row.id)}
        >
          <img src={process.env.PUBLIC_URL + "/images/delete.svg"} alt="delete" />
        </IconButton>
      </LightTooltip>
    </div>
  );
}
