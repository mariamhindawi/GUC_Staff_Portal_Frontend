/* eslint-disable no-use-before-define */
import jwt from "jsonwebtoken";
import axiosInstance from "./AxiosInstance";

const AuthTokenManager = () => {
  let authAccessToken;
  let decodedAuthAccessToken;
  let refreshTimeoutId;

  const getAuthAccessToken = () => authAccessToken;

  const getDecodedAuthAccessToken = () => decodedAuthAccessToken;

  const setAuthAccessToken = accessToken => {
    authAccessToken = accessToken;
    decodedAuthAccessToken = jwt.decode(authAccessToken);
    const delay = new Date(1000 * decodedAuthAccessToken.exp - 5000) - new Date();
    if (refreshTimeoutId) {
      clearTimeout(refreshTimeoutId);
    }
    refreshTimeoutId = setTimeout(refreshAccessToken, delay);
  };

  const removeAuthAccessToken = () => {
    authAccessToken = null;
    decodedAuthAccessToken = null;
    if (refreshTimeoutId) {
      clearTimeout(refreshTimeoutId);
      refreshTimeoutId = null;
    }
  };

  const refreshAccessToken = async () => {
    await axiosInstance({
      method: "get",
      url: "/staff/refresh-token",
    })
      .then(response => {
        setAuthAccessToken(response.headers["auth-access-token"]);
        window.dispatchEvent(new Event("set-user"));
      })
      .catch(error => {
        if (error.response) {
          if (error.response.data === "Invalid refresh token") {
            window.dispatchEvent(new Event("session-timeout"));
          }
        }
        else if (error.request) {
          console.log(error.request);
        }
        else {
          console.log(error.message);
        }
        removeAuthAccessToken();
      });
  };

  const initAuthAccessToken = async () => { await refreshAccessToken(); };

  return {
    initAuthAccessToken,
    getAuthAccessToken,
    getDecodedAuthAccessToken,
    setAuthAccessToken,
    removeAuthAccessToken,
  };
};

export default AuthTokenManager();
