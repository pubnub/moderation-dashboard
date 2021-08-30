import axios from "../../../utils/axios";
import { signIn } from "../../../services/auth";
import { mockSignInData } from "../../mockTest/services/mockSignInData";

const mockPassword = "abc123";

jest.mock("axios", () => ({
  create: jest.fn(() => ({
    get: jest.fn(() => Promise.resolve({ data: {} })),
    post: jest.fn(() => Promise.resolve({ data: {} })),
  })),
}));

describe("Test Cases for Sign In", () => {
  afterAll(() => {
    jest.resetAllMocks();
  });

  test("On successful Sign In", async () => {
    axios.post.mockResolvedValue(mockSignInData);
    const result = await signIn({
      email: "abc@gmail.com",
      password: mockPassword,
    });
    expect(result.result.user_id).toBeGreaterThan(0);
    expect(axios.get).toHaveBeenCalledTimes(0);
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith("/me", {
      email: "abc@gmail.com",
      password: mockPassword,
    });
  });

  test("On failed Sign In", async () => {
    const failedData = {
      data: { result: null, error: "Sign In Failed" },
      status: 404,
    };
    axios.post.mockImplementationOnce(() => Promise.reject(failedData));
    await expect(
      signIn({
        email: "xyz@gmail.com",
        password: mockPassword,
      })
    ).rejects.toBe(failedData);
    expect(axios.get).toHaveBeenCalledTimes(0);
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith("/me", {
      email: "xyz@gmail.com",
      password: mockPassword,
    });
  });
});
