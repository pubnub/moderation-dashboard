import cookie from "js-cookie";

export const setCookie = (key, value) => {
  cookie.set(key, value, {
    expires: 1,
  });
};

export const removeCookie = (key) => {
  cookie.remove(key, {
    expires: 1,
  });
};

export const getCookie = (key) => {
  return cookie.get(key);
};

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeLocalStorage = (key) => {
  localStorage.removeItem(key);
};

export const authenticate = (data, next) => {
  setCookie("token", data.token);
  setLocalStorage("user", data.user);
  next();
};

export const signout = (next) => {
  localStorage.clear();
  next();
};

export const isAuth = () => {
  const cookieChecked = getCookie("token");
  if (cookieChecked) {
    if (localStorage.getItem("user")) {
      return JSON.parse(localStorage.getItem("user"));
    } else {
      return false;
    }
  }
};
