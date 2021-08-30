import axios from "../utils/axios";

export async function signIn(credentials) {
  const signInResponse = await axios.post("/me", credentials);
  if (signInResponse.status === 200) {
    return signInResponse.data;
  }
  throw new Error(signInResponse.data.error || "Something went wrong");
}
