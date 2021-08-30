export const mockImageModerationOff = {
  imageModerationToggle: "false",
  toolForImageModeration: "sightengine",
  sightengineAPIUser: "236156667",
  sightengineAPIKey: "NSvtoAtDvv8kMDDANGqr",
  sightengineWorkflowId: "wfl_9UyHigiCRqMCDT5wVHLZT",
  sightengineRiskFactorThreshold: "0.25",
  reRouteMessages: "true",
  applyToAllChannelIds: "true",
};

export const mockImageModerationOn = {
  imageModerationToggle: "true",
  toolForImageModeration: "sightengine",
  sightengineAPIUser: "236156667",
  sightengineAPIKey: "NSvtoAtDvv8kMDDANGqr",
  sightengineWorkflowId: "wfl_9UyHigiCRqMCDT5wVHLZT",
  sightengineRiskFactorThreshold: "0.25",
  reRouteMessages: "false",
  applyToAllChannelIds: "true",
};

export const mockImageModerationReoute = {
  imageModerationToggle: "true",
  toolForImageModeration: "sightengine",
  sightengineAPIUser: "236156667",
  sightengineAPIKey: "NSvtoAtDvv8kMDDANGqr",
  sightengineWorkflowId: "wfl_9UyHigiCRqMCDT5wVHLZT",
  sightengineRiskFactorThreshold: "0.25",
  reRouteMessages: "true",
  applyToAllChannelIds: "true",
};

export const mockImageState = {
  applyToAllChannelIds: true,
  initialLoading: false,
  imageModerationToggle: true,
  channelId: "initialText",
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
};

export default null;
