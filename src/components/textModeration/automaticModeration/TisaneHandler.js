export const handleTisaneChange =
  ({ setState, state, name }) =>
  (e, value) => {
    if (e.target.name === "tisaneApiKey") {
      setState({
        ...state,
        automaticDetection: {
          ...state.automaticDetection,
          tisaneApiKey: e.target.value,
        },
      });
    } else if (e.target.name === "tisaneLanguage") {
      setState({
        ...state,
        automaticDetection: {
          ...state.automaticDetection,
          tisaneLanguage: e.target.value,
        },
      });
    } else if (name === "riskFactorThresholdForBigotry") {
      setState({
        ...state,
        channelOnChange: true,
        automaticDetection: {
          ...state.automaticDetection,
          tisaneRiskFactorThresholdBigotry: value,
        },
      });
    } else if (name === "riskFactorThresholdForCyberBullying") {
      setState({
        ...state,
        automaticDetection: {
          ...state.automaticDetection,
          tisaneRiskFactorThresholdCyberBullying: value,
        },
      });
    } else if (name === "riskFactorThresholdForCriminalActivity") {
      setState({
        ...state,
        automaticDetection: {
          ...state.automaticDetection,
          tisaneRiskFactorThresholdCriminalActivity: value,
        },
      });
    } else if (name === "riskFactorThresholdForSexualAdvances") {
      setState({
        ...state,
        automaticDetection: {
          ...state.automaticDetection,
          tisaneRiskFactorThresholdSexualAdvances: value,
        },
      });
    } else if (name === "riskFactorThresholdForProfanity") {
      setState({
        ...state,
        automaticDetection: {
          ...state.automaticDetection,
          tisaneRiskFactorThresholdProfanity: value,
        },
      });
    }
  };
