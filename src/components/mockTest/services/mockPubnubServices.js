import { mockAccounts } from "../mockAccounts";
import { mockPermissions } from "../mockPermissions";
import { mockPubNubApplications } from "../mockPubnubAccounts";

const commonkeyValuePairs = {
  status: 200,
  statusText: "OK",
  headers: {
    "cache-control": "no-cache, private",
    "content-type": "application/json",
    expires: "Thu, 29 Jul 2021 15:37:05 GMT",
    pragma: "private",
  },
  config: {
    url: "/apps?owner_id=572238",
    method: "get",
    headers: {
      Accept: "application/json, text/plain, */*",
      "X-Session-Token": "rAL18qRqj8rhtxkJwzQ2dmRi5UrhH-vFbqUaLknxshs",
    },
    baseURL: "https://admin.pubnub.com/api",
    transformRequest: [null],
    transformResponse: [null],
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
  },
  request: {},
};

export const mockAllAccounts = {
  data: {
    result: {
      accounts: mockAccounts,
      permissions: mockPermissions,
    },
  },
  ...commonkeyValuePairs,
};

export const mockAllApps = {
  data: mockPubNubApplications,
  ...commonkeyValuePairs,
};

export default null;
