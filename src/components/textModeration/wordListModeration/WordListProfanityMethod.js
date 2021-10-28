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
import { getProfanityWordsByLanguage, constantBoolean } from "../../../utils/helpers";
import { useStyles } from "../../../style/textModeration.js";
import { handleChange } from "./WordListHandler";
import { LightTooltip } from "../../../style/tooltip";

const WordListProfanityMethod = ({
  handleSave,
  defaultWords,
  state,
  setState,
  profanityList,
  setProfanityList,
}) => {
  const classes = useStyles();
  const languageList = ["English", "Hindi", "Spanish", "Portugese", "French"];

  const {
    wordListChannel,
    wordListLanguage,
    wordListModType,
    wordsListPatternError,
    wordListReRouteMessages,
    wordsListMaskCharError,
    wordsListChannelError,
    applyToAllChannelIdsWordlist,
    wordListCharacterToMaskWith,
  } = state.wordList;

  const checkboxForReroute = constantBoolean(wordListReRouteMessages);
  const checkForApplyToAllChannelIds = constantBoolean(applyToAllChannelIdsWordlist);

  return (
    <>
      <Card className={classes.profanityCardRoot}>
        <Grid container>
          <Grid item>
            <label testId="Channel_Id" className={classes.labelStyle}>
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
            placeholder="Channel"
            name="wordListChannel"
            disabled={checkForApplyToAllChannelIds}
            error={wordsListChannelError}
            variant="outlined"
            size="small"
            fullWidth
            value={wordListChannel}
            onChange={handleChange({
              setState,
              state,
              profanityList,
              setProfanityList,
            })}
          />
        </Box>
        <Grid item>
          <Grid container justify="flex-start">
            <Grid item>
              <Checkbox
                id="allChannelIdcheckBox"
                checked={checkForApplyToAllChannelIds}
                onChange={handleChange({
                  setState,
                  state,
                  name: "applyToAllChannelIdsWordlist",
                })}
              />
            </Grid>
            <Grid item>
              <Box pt={1}>
                <Typography testid="allChannelIdText" variant="body1">
                  Apply to All Channel IDs
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <br />
        <Grid container justify="flex-start">
          <Grid item sm={5}>
            <label testId="language" className={classes.labelStyle}>
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
                  id="wordListLanguage"
                  variant="outlined"
                  MenuProps={{
                    anchorOrigin: {
                      vertical: "bottom",
                      horizontal: "left",
                    },
                    getContentAnchorEl: null,
                  }}
                  name="wordListLanguage"
                  value={wordListLanguage}
                  onChange={handleChange({
                    setState,
                    state,
                    profanityList,
                    setProfanityList,
                  })}
                  inputProps={{ "aria-label": "Without label" }}
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
        <Grid container justify="space-between">
          <Grid item>
            <Grid container>
              <Grid item>
                <label testId="WordList" className={classes.labelStyle}>
                  Word List
                </label>
              </Grid>
              <Grid item>
                <Box className={classes.infoIcon}>
                  <LightTooltip title="Note: Please add comma after a every word. No spaces are allowed">
                    <img
                      src={process.env.PUBLIC_URL + "/images/info-circle.svg"}
                      alt="info-circle"
                    />
                  </LightTooltip>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography
              testid="defaultWordsLabel"
              align="right"
              className={classes.defaultText}
              onClick={() => defaultWords(wordListLanguage)}
            >
              Use Default words
            </Typography>
          </Grid>
        </Grid>
        <Box pt={1} mb={2}>
          <TextField
            id="defaultWordsBox"
            placeholder="comma,separated,list,of,words"
            className={classes.languageWords}
            multiline
            error={wordsListPatternError}
            rowsMax={6}
            name="wordListLanguageWords"
            value={getProfanityWordsByLanguage(profanityList, wordListLanguage)}
            onChange={handleChange({
              setState,
              state,
              profanityList,
              setProfanityList,
            })}
            fullWidth
            variant="outlined"
          />
        </Box>
        <br />
        <br />
        <Grid container justify="flex-start" spacing={6}>
          <Grid item sm={6} md={6}>
            <label testId="MaskOrBlock" className={classes.labelStyle}>
              When Profanity is detected
            </label>
            <Box pt={1} mb={2}>
              <FormControl className={classes.formControl} size="small" fullWidth>
                <Select
                  id="MaskOrBlockOption"
                  variant="outlined"
                  MenuProps={{
                    anchorOrigin: {
                      vertical: "bottom",
                      horizontal: "left",
                    },
                    getContentAnchorEl: null,
                  }}
                  name="wordListModtype"
                  onChange={handleChange({
                    setState,
                    state,
                    profanityList,
                    setProfanityList,
                  })}
                  value={wordListModType}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="Mask-word">Mask Word</MenuItem>
                  <MenuItem value="Block-message">Block Message</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item sm={6} md={6}>
            {wordListModType === "Mask-word" && (
              <>
                <Grid container>
                  <Grid item>
                    <label testId="maskLabel" className={classes.label}>
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
                    id="maskChar"
                    size="small"
                    placeholder="Set"
                    inputProps={{ maxLength: 1 }}
                    error={wordsListMaskCharError}
                    className={classes.languageWords}
                    value={wordListCharacterToMaskWith}
                    onChange={handleChange({
                      setState,
                      state,
                      profanityList,
                      setProfanityList,
                    })}
                    fullWidth
                    name="wordListCharacterToMaskWith"
                    variant="outlined"
                  />
                </Box>
              </>
            )}
          </Grid>
        </Grid>
        <br />
        <Grid container justify="flex-start">
          <Grid item>
            <Grid container>
              <Grid item>
                <Checkbox
                  id="reRouteCheckBox"
                  name="wordListRerouteMessage"
                  onChange={handleChange({
                    setState,
                    state,
                    profanityList,
                    setProfanityList,
                  })}
                  checked={checkboxForReroute}
                />
              </Grid>
              <Grid item>
                <Box pt={1}>
                  <Typography testid="ReRouteLabel" variant="body1">
                    Route messages to
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Box>
              <Chip className={classes.reroute} label={"banned." + wordListChannel} />
            </Box>
          </Grid>
        </Grid>

        <br />
        <Grid container justify="space-between" spacing={2}>
          <Grid item></Grid>
          <Grid item>
            <Button
              id="save"
              disabled={state.saveLoading}
              className={classes.saveButton}
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
};

export default WordListProfanityMethod;
