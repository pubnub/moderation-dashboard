import React, { useState, useEffect } from "react";
import { Typography, Grid, CircularProgress } from "@material-ui/core";
import { useStyles } from "../../style/imageModeration.js";
import SwitchButton from "../core/SwitchButton";
import SnackBar from "../core/SnackBar";
import FilterCard from "./FilterCard";
import AutomaticImageModeration from "./automaticModeration/AutomaticImageModeration";
import { getCookie } from "../../services/localStorage";
import { selectedAppFromLS, constantBoolean, pnFunctionFilterStatus } from "../../utils/helpers";

import {
  imageModerationCode,
  handleImageModerationSave,
  textModerationCode,
} from "../../utils/imageModeration";

import { fetchPubNubFunction } from "../../services/pubnub";
const ImageModeration = () => {
  const classes = useStyles();
  const [state, setState] = useState({
    applyToAllChannelIds: true,
    initialLoading: true,
    imageModerationToggle: "",
    channelId: "*",
    channelIdError: false,
    sightengineAPIUserError: false,
    sightengineAPIKeyError: false,
    sightengineWorkflowIdError: false,
    channelOnChange: false,
    toolForImageModeration: "sightengine",
    sightengineAPIUser: "",
    sightengineAPIKey: "",
    sightengineWorkflowId: "",
    sightengineRiskFactorThreshold: "",
    reRouteMessages: "",
    error: {
      status: false,
      msg: "",
    },
    successMsg: "",
    errorMsg: "",
    successStatus: false,
    errorStatus: false,
    saveLoading: false,
    channelIdDisabled: false,
  });
  const checkForToggleSwitch = constantBoolean(state.imageModerationToggle);
  const handleChange = (e) => {
    setState({
      ...state,
      imageModerationToggle: e.target.checked,
    });
  };

  useEffect(() => {
    const selectedApp = selectedAppFromLS();
    const headerToken = getCookie("token");
    (async () => {
      if (selectedApp) {
        try {
          const fetchFunctionsResponse = await fetchPubNubFunction(
            selectedApp.id,
            headerToken,
            true
          );
          const textModeration = textModerationCode(selectedApp, fetchFunctionsResponse);

          const { findImageFunction, eventHandler } = imageModerationCode(
            selectedApp,
            fetchFunctionsResponse
          );

          if (findImageFunction.length && eventHandler.length > 0) {
            const data = pnFunctionFilterStatus(eventHandler[0].code);
            const {
              imageModerationToggle,
              toolForImageModeration,
              sightengineAPIUser,
              sightengineAPIKey,
              applyToAllChannelIds,
              sightengineWorkflowId,
              sightengineRiskFactorThreshold,
              reRouteMessages,
            } = data;
            setState((prevState) => ({
              imageModerationToggle,
              initialLoading: false,
              channelId: eventHandler[0].channels,
              toolForImageModeration,
              applyToAllChannelIds,
              sightengineAPIUser,
              sightengineAPIKey,
              sightengineWorkflowId,
              sightengineRiskFactorThreshold,
              reRouteMessages,
              channelIdDisabled: textModeration.textModerationToggle,
            }));
          } else {
            setState({
              ...state,
              initialLoading: false,
              channelIdDisabled: textModeration.textModerationToggle,
            });
          }
          if (
            textModeration.textModerationToggle &&
            textModeration.textChannelId &&
            textModeration.textChannelId !== state.channelId
          ) {
            setState((previousState) => ({
              ...previousState,
              channelId: textModeration.textChannelId,
              channelIdDisabled: textModeration.textModerationToggle,
            }));
          }
        } catch (error) {
          setState((prevState) => ({
            initialLoading: false,
          }));
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (state.channelOnChange) {
      if (state.channelId.length === 0) {
        setState((previousValue) => ({
          ...previousValue,
          errorStatus: true,
          saveLoading: false,
          channelIdError: true,
          errorMsg: "Channel name is required",
          successMsg: "",
          successStatus: false,
        }));
      } else {
        setState((preValue) => ({
          ...preValue,
          errorStatus: false,
          saveLoading: false,
          errorMsg: "",
          successMsg: "",
          channelIdError: false,
          successStatus: false,
        }));
      }
    }
  }, [state.channelId, state.applyToAllChannelIds, state.channelOnChange]);
  const handleSave = async (e) => {
    e.preventDefault();
    if (state.errorStatus) {
      return;
    }
    if (state.channelId.length === 0) {
      return setState({
        ...state,
        errorStatus: true,
        channelIdError: true,
        errorMsg: "Channel Id is required.",
        successStatus: false,
        successMsg: "",
      });
    }
    if (!state.sightengineAPIUser.trim().length) {
      return setState({
        ...state,
        sightengineAPIUserError: true,
      });
    }
    if (!state.sightengineAPIKey.trim().length) {
      return setState({
        ...state,
        sightengineAPIKeyError: true,
      });
    }
    if (!state.sightengineWorkflowId.trim().length) {
      return setState({
        ...state,
        sightengineWorkflowIdError: true,
      });
    }
    setState((prevState) => ({
      ...prevState,
      saveLoading: true,
    }));
    const token = getCookie("token");
    const app = selectedAppFromLS();
    if (app) {
      try {
        await handleImageModerationSave(app, token, { state, setState });
      } catch (error) {
        setState({
          ...state,
          errorStatus: true,
          saveLoading: false,
          errorMsg: error.message,
          successMsg: "",
          successStatus: false,
        });
      }
    }
  };
  return (
    <>
      {state.successStatus && <SnackBar status="success" msg={state.successMsg} />}
      {state.errorStatus && <SnackBar status="error" msg={state.errorMsg} />}
      <Typography testid="title" variant="h6" className={classes.title}>
        Image Moderation
        <SwitchButton checked={checkForToggleSwitch} onChange={handleChange} />
      </Typography>
      <br />
      <Typography testid="subTitle" className={classes.subTitle}>
        Profanity detection method
      </Typography>
      <FilterCard state={state} />
      {state.initialLoading && (
        <Grid container justify="center">
          <CircularProgress
            size={65}
            thickness={4}
            color="primary"
            className={classes.loaderLoading}
          />
        </Grid>
      )}
      <br />
      <AutomaticImageModeration state={state} handleSave={handleSave} setState={setState} />
      <br />
    </>
  );
};
export default ImageModeration;
