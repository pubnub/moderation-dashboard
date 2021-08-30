import React from "react";
import { NavigateNext } from "@material-ui/icons";
import { Breadcrumbs, Link, Typography } from "@material-ui/core";
import { selectedAppFromLS } from "../../../utils/helpers";

export default function Breadcrumb(props) {
  const keySet = selectedAppFromLS();
  return (
    <div>
      <Breadcrumbs separator={<NavigateNext fontSize="small" />} aria-label="breadcrumb">
        <Link color="primary" href={process.env.PUBLIC_URL + "/dashboard"}>
          <Typography variant="body2">Applications</Typography>
        </Link>
        {props.currentPage ? (
          <Link color="primary" href={process.env.PUBLIC_URL + "/overview"}>
            <Typography color="primary" variant="body2">
              {keySet && keySet.name}
            </Typography>
          </Link>
        ) : (
          <Typography color="inherit" variant="body2">
            {keySet && keySet.name}
          </Typography>
        )}
        {props.currentPage ? (
          <Typography color="inherit" variant="body2">
            {props.currentPage}
          </Typography>
        ) : null}
      </Breadcrumbs>
    </div>
  );
}
