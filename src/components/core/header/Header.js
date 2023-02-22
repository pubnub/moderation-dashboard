import React, { useState, useEffect } from "react";
import { useHistory, Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Grid,
  Breadcrumbs,
  Typography,
  Link,
} from "@material-ui/core";
import MyAccountDropdown from "./MyAccountDropdown";
import { useStyles } from "../../../style/header";
import { accountsFromLS, selectedAppFromLS, selectedChannelFromLS } from "../../../utils/helpers";
import Breadcrumb from "./Breadcrumb";
import { NavigateNext } from "@material-ui/icons";

export default function Header() {
  const classes = useStyles();
  const history = useHistory();
  const [accounts, setAccounts] = useState([]);
  const keySet = selectedAppFromLS();
  const channelName = selectedChannelFromLS();

  useEffect(() => {
    setAccounts(accountsFromLS());
  }, []);

  const showBreadcrumbs = () => {
    if (history.location.pathname === "/dashboard") {
      return (
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="inherit" variant="body2">
            Applications
          </Typography>
        </Breadcrumbs>
      );
    } else if (history.location.pathname === "/channels") {
      return <Breadcrumb currentPage={"Channels"} />;
    } else if (history.location.pathname === "/overview") {
      return <Breadcrumb currentPage={""} />;
    } else if (history.location.pathname === "/users") {
      return <Breadcrumb currentPage={"Users"} />;
    } else if (history.location.pathname === "/text-moderation") {
      return <Breadcrumb currentPage={"Text Moderation"} />;
    } else if (history.location.pathname === "/image-moderation") {
      return <Breadcrumb currentPage={"Image Moderation"} />;
    } else if (history.location.pathname === "/channels/messages") {
      return (
        <Breadcrumbs separator={<NavigateNext fontSize="small" />} aria-label="breadcrumb">
          <Link color="primary" component={RouterLink} to="/dashboard">
            <Typography variant="body2">Applications</Typography>
          </Link>
          <Link color="primary" component={RouterLink} to="/overview">
            <Typography color="primary" variant="body2">
              {keySet && keySet.name}
            </Typography>
          </Link>
          <Link color="primary" component={RouterLink} to="/channels">
            <Typography color="primary" variant="body2">
              Channels
            </Typography>
          </Link>
          <Typography color="inherit" variant="body2">
            {channelName}
          </Typography>
        </Breadcrumbs>
      );
    }
  };

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <IconButton
            id="toDashboard"
            edge="start"
            onClick={() => history.push("/dashboard")}
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <img src={process.env.PUBLIC_URL + "/images/Pubnub logo.svg"} width={90} alt="" />
          </IconButton>
          <div className={classes.verticalLine} />
          {showBreadcrumbs()}
          <div className={classes.grow} />
          <Grid item className={classes.headerMenu}>
            <MyAccountDropdown accounts={accounts} />
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
