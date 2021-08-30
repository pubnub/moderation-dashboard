/**
 * Displays overview page for a selected ketset
 */
import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import { Grid, Typography, Paper, Avatar, Box, Divider, IconButton } from "@material-ui/core";
import { useStyles } from "../../style/overview";
import { capitalizeNameInitials, selectedAppFromLS } from "../../utils/helpers";
import { RemoveRedEye, RemoveRedEyeOutlined } from "@material-ui/icons";

const OverviewGrid = () => {
  const classes = useStyles();
  const [application, setApplication] = useState([]);
  const [secretKeyIsMasked, setSecretKeyIsMasked] = useState(false);

  useEffect(() => {
    setApplication(selectedAppFromLS());
  }, []);

  /**
   * Handles secret key icon toggle action to view/hide secret key
   */
  const toggleSecretKeyMask = () => {
    setSecretKeyIsMasked((prev) => !prev);
  };

  return (
    <>
      <Helmet title="Overview" />
      <Grid justify="space-between" container>
        <Grid item>
          <Box pl={1}>
            <Typography testid="overview_Header" variant="h5">
              Overview
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <br />
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.gridOne}>
              <Grid justify="flex-start" container>
                <Box mr={1}>
                  <Avatar className={classes.avatar} variant="square">
                    {!application.name ? "" : capitalizeNameInitials(application.name)}
                  </Avatar>
                </Box>
                <Grid item sm={6} xs={12} md={6}>
                  <small className={classes.values}>
                    {!application.name ? "" : application.name}
                  </small>
                  <br />
                  <small className={classes.appName}>
                    {!application.appName ? "" : application.appName}
                  </small>
                </Grid>
              </Grid>
              <br />
              <Divider />
              <br />
              <Grid justify="space-between" container>
                <Grid item xs={12} sm={6}>
                  <Typography testid="modified_date" className={classes.headings}>
                    Modified Date
                  </Typography>
                  <Typography className={classes.values}>
                    {!application.modified ? "" : application.modified}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography testid="created_on" className={classes.headings}>
                    Created on
                  </Typography>
                  <Typography className={classes.values}>
                    {!application.created ? "" : application.created}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.gridTwo}>
              <Typography testid="pubnub_keys" variant="h6">
                PubNub Keys
              </Typography>
              <br />
              <Divider />
              <br />
              <Grid justify="space-between" container>
                <Grid item xs={12} sm={6}>
                  <Typography testid="publish_key" variant="h6" className={classes.headings}>
                    Publish Key
                  </Typography>
                  <Typography className={classes.values}>
                    {!application.publish_key ? "" : application.publish_key}
                  </Typography>
                  <br />
                  <Typography testid="secret_key" className={classes.headings}>
                    Secret Key
                    <IconButton
                      id="maskableIcon"
                      className={classes.headings}
                      onClick={toggleSecretKeyMask}
                    >
                      {secretKeyIsMasked ? <RemoveRedEyeOutlined /> : <RemoveRedEye />}
                    </IconButton>
                  </Typography>

                  <Typography id="maskableText" className={classes.values}>
                    {secretKeyIsMasked
                      ? application.secret_key
                      : application.secret_key && "*".repeat(application.secret_key.length)}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" testid="subsciber_key" className={classes.headings}>
                    Subscribe Key
                  </Typography>
                  <Typography className={classes.values}>
                    {!application.subscribe_key ? "" : application.subscribe_key}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default OverviewGrid;
