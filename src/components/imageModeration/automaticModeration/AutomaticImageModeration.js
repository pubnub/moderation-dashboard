import React from "react";
import {
  Grid,
  Button,
  Box,
  Card,
  Chip,
  Typography,
  TextField,
  Select,
  Checkbox,
  CircularProgress,
  FormControl,
  MenuItem,
} from "@material-ui/core";
import { useStyles } from "../../../style/imageModeration";
import Slider from "../../core/SliderComponent";
import { LightTooltip } from "../../../style/tooltip";
import { handleChange } from "./ImageModerationHandler";
import { constantBoolean } from "../../../utils/helpers";

const TooltipText = (
  <>
    <span>Please follow steps listed </span>
    <a
      style={{ fontWeight: 600, color: "black", textDecorationLine: "none" }}
      href="https://sightengine.com/docs/image-moderation-workflows"
    >
      here
    </a>
    <span> and input values</span>
  </>
);

const AutomaticImageModeration = ({ state, setState, handleSave }) => {
  const classes = useStyles();
  const checkForApplyToAllChannelIds = constantBoolean(state.applyToAllChannelIds);
  const checkboxForReroute = constantBoolean(state.reRouteMessages);

  if (!state.initialLoading) {
    return (
      <>
        <Card className={classes.card}>
          <Box>
            <Grid container>
              <Grid item>
                <label testid="Channel_ID" className={classes.labelText}>
                  Channel ID
                </label>
              </Grid>
              <Grid item>
                <Box className={classes.infoIcon}>
                  <LightTooltip title="Note: Please add a Channel ID or a Channel pattern. eg. channel.* OR pubNub. Channel ID pattern applies to BOTH text & image moderation if both are enabled.">
                    <img
                      src={process.env.PUBLIC_URL + "/images/info-circle.svg"}
                      alt="info-circle"
                    />
                  </LightTooltip>
                </Box>
              </Grid>
            </Grid>

            <Box pt={1} mb={2}>
              <TextField
                id="channelId"
                variant="outlined"
                name="channelId"
                error={state.channelIdError}
                disabled={checkForApplyToAllChannelIds || state.channelIdDisabled}
                placeholder="channel ID"
                value={state.channelId}
                onChange={handleChange({ setState, state })}
                size="small"
                fullWidth
              />
            </Box>
          </Box>
          <Grid item>
            <Grid container justify="flex-start">
              <Grid item>
                <Checkbox
                  id="checkBox"
                  checked={checkForApplyToAllChannelIds}
                  onChange={handleChange({
                    setState,
                    state,
                    name: "applyToAllChannelIds",
                  })}
                  disabled={state.channelIdDisabled}
                />
              </Grid>
              <Grid item>
                <Box pt={1} pl={1}>
                  <Typography testid="Apply_All" variant="body1">
                    Apply to All Channel IDs
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <br />
          <Grid container justify="flex-start">
            <Grid item sm={12}>
              <label id="SelectTool" className={classes.labelText}>
                Select third party tool for Automatic Detection
              </label>
              <Box pt={1} mb={2}>
                <FormControl size="small" fullWidth>
                  <Select
                    id="ImageModerationTool"
                    variant="outlined"
                    value={state.toolForImageModeration}
                    name="toolForImageModeration"
                    onChange={handleChange({ setState, state })}
                    MenuProps={{
                      anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left",
                      },
                      getContentAnchorEl: null,
                    }}
                  >
                    <MenuItem value="sightengine">SightEngine</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          </Grid>
          <br />
          <Box pt={1}>
            <Grid container>
              <Grid item>
                <label testId="ApiUser" className={classes.labelText}>
                  Sightengine API User
                </label>
              </Grid>
              <Grid item>
                <Box className={classes.infoIcon}>
                  <LightTooltip title={TooltipText} interactive>
                    <img
                      src={process.env.PUBLIC_URL + "/images/info-circle.svg"}
                      alt="info-circle"
                    />
                  </LightTooltip>
                </Box>
              </Grid>
            </Grid>
            <Box pt={1} mb={2}>
              <TextField
                id="sightEngineAPIUser"
                variant="outlined"
                name="sightengineAPIUser"
                error={state.sightengineAPIUserError}
                helperText={state.sightengineAPIUserError && "Sightengine API User is required"}
                value={state.sightengineAPIUser}
                onChange={handleChange({ setState, state })}
                size="small"
                placeholder="Sightengine API User"
                fullWidth
              />
            </Box>
          </Box>
          <br />
          <Box pt={1}>
            <Grid container>
              <Grid item>
                <label testId="Api_Key" className={classes.labelText}>
                  Sightengine API Key
                </label>
              </Grid>
              <Grid item>
                <Box className={classes.infoIcon}>
                  <LightTooltip title={TooltipText} interactive>
                    <img
                      src={process.env.PUBLIC_URL + "/images/info-circle.svg"}
                      alt="info-circle"
                    />
                  </LightTooltip>
                </Box>
              </Grid>
            </Grid>
            <Box pt={1} mb={2}>
              <TextField
                id="apiKey"
                variant="outlined"
                name="sightengineAPIKey"
                error={state.sightengineAPIKeyError}
                helperText={state.sightengineAPIKeyError && "Sightengine API Key is required"}
                value={state.sightengineAPIKey}
                onChange={handleChange({ setState, state })}
                size="small"
                fullWidth
                placeholder="Sightengine API Key"
              />
            </Box>
          </Box>
          <br />
          <Box pt={1}>
            <Grid container>
              <Grid item>
                <label testId="workFlowId" className={classes.labelText}>
                  Sightengine Workflow ID
                </label>
              </Grid>
              <Grid item>
                <Box className={classes.infoIcon}>
                  <LightTooltip title={TooltipText} interactive>
                    <img
                      src={process.env.PUBLIC_URL + "/images/info-circle.svg"}
                      alt="info-circle"
                    />
                  </LightTooltip>
                </Box>
              </Grid>
            </Grid>

            <Box pt={1} mb={2}>
              <TextField
                id="sightEngineWorkflowId"
                name="sightengineWorkflowId"
                variant="outlined"
                size="small"
                error={state.sightengineWorkflowIdError}
                helperText={
                  state.sightengineWorkflowIdError && "Sightengine Workflow ID is required"
                }
                value={state.sightengineWorkflowId}
                onChange={handleChange({ setState, state })}
                fullWidth
                placeholder="Sightengine Workflow ID"
              />
            </Box>
          </Box>
          <br />
          <Grid container justify="space-between" spacing={6}>
            <Grid item sm={6} xs={12} md={6} lg={6}>
              <Box>
                <label testId="riskFactor" className={classes.labelText}>
                  Sightengine Risk Factor
                </label>
                <Box pt={1}>
                  <Slider
                    id="riskFactorSlider"
                    value={state.sightengineRiskFactorThreshold}
                    onChange={handleChange({
                      setState,
                      state,
                      name: "sightengineRiskFactorThreshold",
                    })}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
          <br />
          <Grid container>
            <Grid item>
              <Grid container justify="flex-start">
                <Grid item>
                  <Checkbox
                    id="reRouteCheckBox"
                    name="reRouteMessages"
                    checked={checkboxForReroute}
                    onChange={handleChange({ setState, state })}
                  />
                </Grid>
                <Grid item>
                  <Box pt={1} pl={1}>
                    <Typography testid="reRouteMsg" variant="body1">
                      Route messages to
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Box>
                <Chip className={classes.reroute} label={"banned." + state.channelId} />
              </Box>
            </Grid>
          </Grid>
          <br />
          <Grid container justify="space-between" spacing={3}>
            <Grid item></Grid>
            <Grid item>
              <Button
                id="save"
                className={classes.save}
                disabled={state.saveLoading}
                onClick={handleSave}
                variant="contained"
              >
                {state.saveLoading ? (
                  <CircularProgress
                    size={25}
                    thickness={4}
                    color="primary"
                    className={classes.loader}
                  />
                ) : (
                  <></>
                )}
                Save
              </Button>
            </Grid>
          </Grid>
        </Card>
      </>
    );
  } else {
    return <></>;
  }
};

export default AutomaticImageModeration;
