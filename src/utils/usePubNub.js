import PubNub from "pubnub";
import { selectedAppFromLS, uuidFromLS } from "./helpers";

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
    return { pubnub };
  }
  return {};
};

export default usePubNub;
