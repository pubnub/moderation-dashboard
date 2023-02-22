import PubNub from "pubnub";
import { selectedAppFromLS, uuidFromLS } from "./helpers";
import { version } from "../../package.json";

const usePubNub = () => {
  const selectedApp = selectedAppFromLS();
  const uuid = uuidFromLS();

  if (selectedApp && uuid) {
    const pubnub = new PubNub({
      subscribeKey: selectedApp.subscribe_key,
      secretKey: selectedApp.secret_key,
      publishKey: selectedApp.publish_key,
      uuid: uuid,
    });

    pubnub._config._addPnsdkSuffix("moderation-dashboard", `MD/${version}`);

    return { pubnub };
  }
  return {};
};

export default usePubNub;
