import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-social/bootstrap-social.css";
import "./css/app.css";
import "./others/FontawesomeIcons";
import AuthTokenManager from "./others/AuthTokenManager";
import { useSetUserContext } from "./contexts/UserContext";
import Login from "./components/general_staff_components/Login";
import StaffHome from "./components/home_components/StaffHome";
import PageNotFound from "./components/error_components/PageNotFound";

function App() {
  const [isLoading, setLoading] = useState(true);
  const setUser = useSetUserContext();
  const history = useHistory();

  const initUser = () => {
    const decodedAuthAccessToken = AuthTokenManager.getDecodedAuthAccessToken();
    let rolePath;
    switch (decodedAuthAccessToken.role) {
      case "HR": rolePath = "hr"; break;
      case "Head of Department": rolePath = "hod"; break;
      case "Course Instructor": rolePath = "ci"; break;
      case "Course Coordinator": rolePath = "cc"; break;
      case "Teaching Assistant": rolePath = "ta"; break;
      default: rolePath = "";
    }
    const user = {
      id: decodedAuthAccessToken.id,
      name: decodedAuthAccessToken.name,
      email: decodedAuthAccessToken.email,
      role: decodedAuthAccessToken.role,
      rolePath,
      loggedIn: decodedAuthAccessToken.loggedIn,
    };
    setUser(user);
  };
  const initAuthToken = async () => {
    setLoading(true);
    await AuthTokenManager.initAuthAccessToken();
    const authAccessToken = AuthTokenManager.getAuthAccessToken();
    if (authAccessToken) {
      initUser();
    }
    setLoading(false);
  };
  const handleLogin = () => {
    initUser();
    history.push("/staff");
  };
  const handleTimeout = () => {
    alert("Session expired. Please sign in again");
    AuthTokenManager.removeAuthAccessToken();
    history.push("/login");
  };
  const syncTabs = async event => {
    if (event.key === "login") {
      // alert("Session expired. Please sign in again");
      await initAuthToken();
      history.push("/staff");
    }
    else if (event.key === "reset-password") {
      // alert("Session expired. Please sign in again");
      AuthTokenManager.removeAuthAccessToken();
      history.push("/login");
    }
    else if (event.key === "logout") {
      // alert("Logged out");
      AuthTokenManager.removeAuthAccessToken();
      history.push("/login");
    }
    else if (event.key === "session-timeout") {
      // alert("Session expired. Please sign in again");
      AuthTokenManager.removeAuthAccessToken();
      history.push("/login");
    }
  };
  const setupEventListeners = () => {
    window.addEventListener("login", handleLogin);
    window.addEventListener("session-timeout", handleTimeout);
    window.addEventListener("storage", syncTabs);
    return () => {
      window.removeEventListener("login", handleLogin);
      window.removeEventListener("session-timeout", handleTimeout);
      window.removeEventListener("storage", syncTabs);
    };
  };

  useEffect(initAuthToken, []);
  useEffect(setupEventListeners, []);

  if (isLoading) {
    return <div />;
  }
  return (
    <Switch>
      <Route exact path="/"><Redirect to={AuthTokenManager.getAuthAccessToken() ? "/staff" : "/login"} /></Route>
      <Route exact path="/login"><Login /></Route>
      <Route path="/staff"><StaffHome /></Route>
      <Route exact path="/404"><PageNotFound /></Route>
      <Route path="/"><Redirect to="/404" /></Route>
    </Switch>
  );
}

export default App;
