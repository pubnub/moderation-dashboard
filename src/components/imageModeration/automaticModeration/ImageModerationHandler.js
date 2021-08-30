export const handleChange =
  ({ setState, state, name }) =>
  (e, value) => {
    if (e.target.name === "channelId") {
      setState({ ...state, channelOnChange: true, channelId: e.target.value });
    } else if (e.target.name === "toolForImageModeration") {
      setState({ ...state, toolForImageModeration: e.target.value });
    } else if (e.target.name === "sightengineAPIUser") {
      setState({
        ...state,
        sightengineAPIUser: e.target.value,
        sightengineAPIUserError: false,
      });
    } else if (e.target.name === "sightengineAPIKey") {
      setState({
        ...state,
        sightengineAPIKey: e.target.value,
        sightengineAPIKeyError: false,
      });
    } else if (e.target.name === "sightengineWorkflowId") {
      setState({
        ...state,
        sightengineWorkflowId: e.target.value,
        sightengineWorkflowIdError: false,
      });
    } else if (e.target.name === "reRouteMessages") {
      setState({ ...state, reRouteMessages: e.target.checked });
    } else if (name === "sightengineRiskFactorThreshold") {
      setState({ ...state, sightengineRiskFactorThreshold: value });
    } else if (e.target.name === "imageModerationToggle") {
      setState({ ...state, imageModerationToggle: e.target.value });
    } else if (name === "applyToAllChannelIds") {
      if (e.target.checked) {
        setState((preValue) => ({
          ...preValue,
          applyToAllChannelIds: e.target.checked,
          channelId: "*",
        }));
      } else {
        setState({ ...state, applyToAllChannelIds: e.target.checked });
      }
    }
  };
