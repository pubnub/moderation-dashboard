import React from "react";
import { Waypoint } from "react-waypoint";
import { Grid, CircularProgress } from "@material-ui/core";

export default function MembersLoader(props) {
  return (
    <>
      {props.membersLength > 99 && props.membersLength < props.totalCount ? (
        <Waypoint onEnter={props.fetchChannelsMembersOnScroll} />
      ) : null}
      {props.loading ? (
        <Grid justify="center" container>
          <CircularProgress />
        </Grid>
      ) : null}
    </>
  );
}
