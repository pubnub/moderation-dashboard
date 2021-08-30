import axios from "axios";

export default axios.create({
  baseURL: "https://admin.pubnub.com/api",
  validateStatus: (status) => status < 500,
});
