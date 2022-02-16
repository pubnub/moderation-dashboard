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
import { useStyles } from "../../../style/automaticProfanityMethod";
import Slider from "../../core/SliderComponent";
import { constantBoolean } from "../../../utils/helpers";
import { LightTooltip } from "../../../style/tooltip";
import { handleChange } from "./AutomaticHandler";
import { handleTisaneChange } from "./TisaneHandler";

const AutomaticProfanityMethod = ({ state, setState, handleSave }) => {
  const {
    toolForAutomaticDetection,
    siftNinjaRiskFactorThresholdVulgar,
    siftNinjaRiskFactorThresholdSexting,
    siftNinjaRiskFactorThresholdRacism,
    siftNinjaAccountName,
    siftNinjaChannelName,
    siftNinjaApiKey,
    automaticMaskCharError,
    automaticChannelError,
    automaticDetectionChannel,
    automaticDetectionReRouteMessages,
    automaticDetectionModType,
    applyToAllChannelIdsAutomatic,
    automaticDetectionCharacterToMaskWith,
    tisaneRiskFactorThresholdBigotry,
    tisaneRiskFactorThresholdCyberBullying,
    tisaneRiskFactorThresholdCriminalActivity,
    tisaneRiskFactorThresholdSexualAdvances,
    tisaneRiskFactorThresholdProfanity,
    tisaneApiKey,
    tisaneLanguage,
  } = state.automaticDetection;

  const classes = useStyles();
  const checkboxForReroute = constantBoolean(automaticDetectionReRouteMessages);
  const checkForApplyToAllChannelIds = constantBoolean(applyToAllChannelIdsAutomatic);

  const TooltipText = (
    <>
      <span>Sign up with </span>
      <a
        style={{ fontWeight: 600, color: "black", textDecorationLine: "none" }}
        href="https://tisane.ai/signup/"
      >
        Tisane.ai
      </a>
      <span> locate your key under your </span>
      <a
        style={{ fontWeight: 600, color: "black", textDecorationLine: "none" }}
        href="https://tisane.ai/developer/"
      >
        Developer Profile.
      </a>
      <span> Use primary or secondary key. </span>
    </>
  );

  const languageList = ["Autodetect", "English", "Spanish", "Portugese", "French"];

  return (
    <>
      <Card className={classes.cardRoot}>
        <Box>
          <Grid container>
            <Grid item>
              <label testId="Channel_Id" className={classes.label}>
                Channel ID
              </label>
            </Grid>
            <Grid item>
              <Box className={classes.infoIcon}>
                <LightTooltip title="Note: Please add a Channel ID or a Channel pattern. eg. channel.* OR pubNub. Channel ID pattern applies to BOTH text & image moderation if both are enabled.">
                  <img src={process.env.PUBLIC_URL + "/images/info-circle.svg"} alt="info-circle" />
                </LightTooltip>
              </Box>
            </Grid>
          </Grid>

          <Box pt={1} mb={2}>
            <TextField
              id="channelId"
              variant="outlined"
              placeholder="Enter channel or channel pattern here Under18.*, Under18"
              size="small"
              fullWidth
              disabled={checkForApplyToAllChannelIds}
              error={automaticChannelError}
              name="automaticDetectionChannel"
              value={automaticDetectionChannel}
              onChange={handleChange({ setState, state })}
            />
          </Box>
        </Box>
        <Grid item>
          <Grid container justify="flex-start">
            <Grid item>
              <Checkbox
                id="applyAll"
                checked={checkForApplyToAllChannelIds}
                onChange={handleChange({
                  setState,
                  state,
                  name: "applyToAllChannelIdsAutomatic",
                })}
              />
            </Grid>
            <Grid item>
              <Box pt={1} pl={1}>
                <Typography testId="applyAll_channel" variant="body1">
                  Apply to All Channel IDs
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <br />
        <Grid container justify="flex-start">
          <Grid item sm={12}>
            <label testId="SelectToolLabel" className={classes.label}>
              Select third party tool for Automatic Detection
            </label>
            <Box pt={1} mb={2}>
              <FormControl size="small" fullWidth>
                <Select
                  id="selectTool"
                  variant="outlined"
                  name="toolForAutomaticDetection"
                  value={toolForAutomaticDetection}
                  onChange={handleChange({ setState, state })}
                  MenuProps={{
                    anchorOrigin: {
                      vertical: "bottom",
                      horizontal: "left",
                    },
                    getContentAnchorEl: null,
                  }}
                >
                  <MenuItem value="tisane">Tisane.ai</MenuItem>
                  <MenuItem value="siftninja">SiftNinja</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
        <br />
        {toolForAutomaticDetection === "siftninja" && (
          <>
            <Box pt={1}>
              <Grid container>
                <Grid item>
                  <label testid="accountName" className={classes.label}>
                    SiftNinja Account Name
                  </label>
                </Grid>
                <Grid item>
                  <Box className={classes.infoIcon}>
                    <LightTooltip title="This option is only available for users who have an existing SiftNinja account">
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
                  id="siftAccountName"
                  variant="outlined"
                  size="small"
                  placeholder="SiftNinja Account Name"
                  fullWidth
                  name="siftNinjaAccountName"
                  value={siftNinjaAccountName}
                  onChange={handleChange({ setState, state })}
                />
              </Box>
            </Box>
            <br />
            <Box pt={1}>
              <Grid container>
                <Grid item>
                  <label testId="siftChannelName" className={classes.label}>
                    SiftNinja Channel Name
                  </label>
                </Grid>
                <Grid item>
                  <Box className={classes.infoIcon}>
                    <LightTooltip title="This option is only available for users who have an existing SiftNinja account">
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
                  id="siftChannelName"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="siftNinjaChannelName"
                  placeholder="SiftNinja Channel Name"
                  value={siftNinjaChannelName}
                  onChange={handleChange({ setState, state })}
                />
              </Box>
            </Box>
            <br />
            <Box pt={1}>
              <Grid container>
                <Grid item>
                  <label testid="siftApiKey" className={classes.label}>
                    SiftNinja API Key
                  </label>
                </Grid>
                <Grid item>
                  <Box className={classes.infoIcon}>
                    <LightTooltip title="This option is only available for users who have an existing SiftNinja account">
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
                  id="siftApiKey"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="siftNinjaApiKey"
                  placeholder="SiftNinja API key"
                  value={siftNinjaApiKey}
                  onChange={handleChange({ setState, state })}
                />
                <Typography testid="connectivity" align="right" className={classes.testText}>
                  Test Conectivity
                </Typography>
              </Box>
            </Box>
            <br />
            <Grid container justify="space-between" spacing={6}>
              <Grid item sm={6} xs={12} md={6} lg={6}>
                <Box>
                  <label testid="vulgarRiskFactor" className={classes.label}>
                    SiftNinja Risk Factor Threshold For Vulgarity
                  </label>
                  <Box pt={1}>
                    <Slider
                      id="vulgarRiskFactor"
                      name={toolForAutomaticDetection}
                      value={siftNinjaRiskFactorThresholdVulgar}
                      onChange={handleChange({
                        setState,
                        state,
                        name: "riskFactorThresholdForVulgar",
                      })}
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item sm={6} xs={6} md={6} lg={6}>
                <Box>
                  <label testId="SextingRisk" className={classes.label}>
                    SiftNinja Risk Factor Threshold For Sexting
                  </label>
                  <Box pt={1}>
                    <Slider
                      id="SextingRisk"
                      name={toolForAutomaticDetection}
                      value={siftNinjaRiskFactorThresholdSexting}
                      onChange={handleChange({
                        setState,
                        state,
                        name: "riskFactorThresholdForSexting",
                      })}
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item sm={6} xs={6} md={6} lg={6}>
                <Box>
                  <label testid="racismRisk" className={classes.label}>
                    SiftNinja Risk Factor Threshold For Racism
                  </label>
                  <Box pt={1}>
                    <Slider
                      id="racismRisk"
                      name={toolForAutomaticDetection}
                      value={siftNinjaRiskFactorThresholdRacism}
                      onChange={handleChange({
                        setState,
                        state,
                        name: "riskFactorThresholdForRacism",
                      })}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </>
        )}
        {toolForAutomaticDetection === "tisane" && (
          <>
            <Box pt={1}>
              <Grid container>
                <Grid item>
                  <label testid="tisaneApiKey" className={classes.label}>
                    Tisane.ai API Key
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
                  id="tisaneApiKey"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="tisaneApiKey"
                  value={tisaneApiKey}
                  placeholder="Tisane.ai API key"
                  onChange={handleTisaneChange({ setState, state })}
                />
              </Box>
            </Box>
            <br />
            <Grid container justify="flex-start">
              <Grid item sm={5}>
                <label testid="lang" className={classes.labelStyle}>
                  Language
                </label>
                <Box pt={1} mb={2}>
                  <FormControl
                    className={classes.formControl}
                    size="small"
                    placeholder="Langauge"
                    fullWidth
                  >
                    <Select
                      id="lang"
                      variant="outlined"
                      MenuProps={{
                        anchorOrigin: {
                          vertical: "bottom",
                          horizontal: "left",
                        },
                        getContentAnchorEl: null,
                      }}
                      value={tisaneLanguage}
                      name="tisaneLanguage"
                      inputProps={{ "aria-label": "Without label" }}
                      onChange={handleTisaneChange({ setState, state })}
                    >
                      {languageList.map((language, index) => {
                        return (
                          <MenuItem value={language} key={index}>
                            {language}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
            </Grid>
            <br />
            <Grid container justify="space-between" spacing={6}>
              <Grid item sm={6} xs={12} md={6} lg={6}>
                <Box pl={1}>
                  <label testid="BigotryLevel" className={classes.label}>
                    Filter Level For Bigotry (Hate Speech)
                  </label>
                  <Box pt={1}>
                    <Slider
                      id="BigotryLevel"
                      value={tisaneRiskFactorThresholdBigotry}
                      name={toolForAutomaticDetection}
                      onChange={handleTisaneChange({
                        setState,
                        state,
                        name: "riskFactorThresholdForBigotry",
                      })}
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item sm={6} xs={6} md={6} lg={6}>
                <Box pl={1}>
                  <label testid="CyberBullying" className={classes.label}>
                    Filter Level For Personal Attacks (Cyberbullying)
                  </label>
                  <Box pt={1}>
                    <Slider
                      id="CyberBullying"
                      value={tisaneRiskFactorThresholdCyberBullying}
                      name={toolForAutomaticDetection}
                      onChange={handleTisaneChange({
                        setState,
                        state,
                        name: "riskFactorThresholdForCyberBullying",
                      })}
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item sm={6} xs={12} md={6} lg={6}>
                <Box pl={1}>
                  <label testid="criminalLevel" className={classes.label}>
                    Filter Level For Criminal Activity
                  </label>
                  <Box pt={1}>
                    <Slider
                      id="criminalLevel"
                      value={tisaneRiskFactorThresholdCriminalActivity}
                      name={toolForAutomaticDetection}
                      onChange={handleTisaneChange({
                        setState,
                        state,
                        name: "riskFactorThresholdForCriminalActivity",
                      })}
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item sm={6} xs={6} md={6} lg={6}>
                <Box pl={1}>
                  <label testid="sexualLevel" className={classes.label}>
                    Filter Level For Sexual Advances
                  </label>
                  <Box pt={1}>
                    <Slider
                      id="sexualLevel"
                      value={tisaneRiskFactorThresholdSexualAdvances}
                      name={toolForAutomaticDetection}
                      onChange={handleTisaneChange({
                        setState,
                        state,
                        name: "riskFactorThresholdForSexualAdvances",
                      })}
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item sm={6} xs={12} md={6} lg={6}>
                <Box pl={1}>
                  <label testid="ProfanityLevel" className={classes.label}>
                    Filter Level For Profanity
                  </label>
                  <Box pt={1}>
                    <Slider
                      id="ProfanityLevel"
                      value={tisaneRiskFactorThresholdProfanity}
                      name={toolForAutomaticDetection}
                      onChange={handleTisaneChange({
                        setState,
                        state,
                        name: "riskFactorThresholdForProfanity",
                      })}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </>
        )}

        <Grid container justify="flex-start" spacing={6}>
          <Grid item sm={6} md={6}>
            <label testid="blockOrMask" className={classes.label}>
              When profanity is detected
            </label>
            <Box pt={1} mb={2}>
              <FormControl size="small" fullWidth>
                <Select
                  id="blockOrMask"
                  variant="outlined"
                  value={automaticDetectionModType}
                  name="automaticDetectionModType"
                  onChange={handleChange({ setState, state })}
                  MenuProps={{
                    anchorOrigin: {
                      vertical: "bottom",
                      horizontal: "left",
                    },
                    getContentAnchorEl: null,
                  }}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="mask-message">Mask Message</MenuItem>
                  <MenuItem value="block-message">Block Message</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item sm={6} md={6}>
            {automaticDetectionModType === "mask-message" && (
              <>
                <Grid container>
                  <Grid item>
                    <label testid="setChar" className={classes.label}>
                      Set a masking character
                    </label>
                  </Grid>
                  <Grid item>
                    <Box className={classes.infoIcon}>
                      <LightTooltip title="Note: Default value will be *">
                        <img
                          src={process.env.PUBLIC_URL + "/images/info-circle.svg"}
                          alt="info-circle"
                        />
                      </LightTooltip>
                    </Box>
                  </Grid>
                </Grid>
                <Box pt={1}>
                  <TextField
                    id="setChar"
                    size="small"
                    placeholder="Set"
                    error={automaticMaskCharError}
                    inputProps={{ maxLength: 1 }}
                    className={classes.languageWords}
                    value={automaticDetectionCharacterToMaskWith}
                    name="automaticDetectionCharacterToMaskWith"
                    onChange={handleChange({ setState, state })}
                    fullWidth
                    variant="outlined"
                  />
                </Box>
              </>
            )}
          </Grid>
        </Grid>
        <br />
        <Grid container>
          <Grid item>
            <Grid container justify="flex-start">
              <Grid item>
                <Checkbox
                  id="reRoute"
                  name="automaticDetectionReRouteMessages"
                  onChange={handleChange({ setState, state })}
                  checked={checkboxForReroute}
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
              <Chip className={classes.reroute} label={"banned." + automaticDetectionChannel} />
            </Box>
          </Grid>
        </Grid>
        <br />
        <Grid container justify="space-between" spacing={3}>
          <Grid item></Grid>
          <Grid item>
            <Button
              id="save"
              disabled={state.saveLoading}
              className={classes.saveButtonStyle}
              onClick={handleSave}
              variant="contained"
            >
              {state.saveLoading ? (
                <CircularProgress
                  size={25}
                  thickness={4}
                  color="primary"
                  className={classes.loaderStyle}
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
};

export default AutomaticProfanityMethod;
