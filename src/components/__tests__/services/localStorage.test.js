import {
  isAuth,
  setCookie,
  getCookie,
  authenticate,
  setLocalStorage,
  removeLocalStorage,
  removeCookie,
  signout,
} from "../../../services/localStorage";
import { mockUser } from "../../mockTest/services/mockServices";

describe("Test cases for services", () => {
  test("Check for isAuth fn", () => {
    const result = isAuth();
    expect(result).toBeUndefined();

    setCookie("token", "testString");
    const result1 = isAuth();
    expect(result1).toBeFalsy();

    localStorage.setItem("user", JSON.stringify(mockUser));
    const result2 = isAuth();
    expect(result2).toMatchObject(mockUser);
  });

  test("Check for authentication", () => {
    authenticate({ token: "abc", user: "test user" }, jest.fn());
    expect(getCookie("token")).toBe("abc");
    expect(JSON.parse(localStorage.getItem("user"))).toBe("test user");
  });

  test("Check Local Storage Function", () => {
    expect(JSON.parse(localStorage.getItem("key1"))).toBeNull();

    setLocalStorage("key1", "value1");
    expect(JSON.parse(localStorage.getItem("key1"))).toBe("value1");

    removeLocalStorage("key1");
    expect(JSON.parse(localStorage.getItem("key1"))).toBeNull();
  });

  test("Check cookie Functions", () => {
    expect(getCookie("key1")).toBeUndefined();

    setCookie("key1", "value1");
    expect(getCookie("key1")).toBe("value1");

    removeCookie("key1");
    expect(getCookie("key1")).toBeUndefined();
  });

  test("Check for Sign Out", () => {
    setLocalStorage("key1", "value1");
    setLocalStorage("key2", "value2");
    setLocalStorage("key3", "value3");

    const mockFn = jest.fn();
    signout(mockFn);

    expect(JSON.parse(localStorage.getItem("key1"))).toBeNull();
    expect(JSON.parse(localStorage.getItem("key2"))).toBeNull();
    expect(JSON.parse(localStorage.getItem("key3"))).toBeNull();
    expect(Object.keys(localStorage).length).toBe(0);
  });
});
