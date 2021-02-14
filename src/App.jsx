import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-social/bootstrap-social.css";
import "./css/App.css";
import "./others/FontawesomeIcons";
import AuthTokenManager from "./others/AuthTokenManager";
import { useSetUserContext } from "./contexts/UserContext";
import Login from "./components/general_staff_components/Login";
import StaffHome from "./components/home_components/StaffHome";
import PageNotFound from "./components/error_components/PageNotFound";
import AlertModal from "./components/helper_components/AlertModal";

function App() {
  const [isLoading, setLoading] = useState(true);
  const [alertModalIsOpen, setAlertModalOpen] = useState(false);
  const [alertModalMessage, setAlertModalMessage] = useState("");
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
    localStorage.setItem("login", Date.now());
  };
  const handleLogout = () => {
    AuthTokenManager.removeAuthAccessToken();
    history.push("/login");
    setAlertModalMessage("Logged out successfully");
    setAlertModalOpen(true);
    localStorage.setItem("logout", Date.now());
  };
  const handleTimeout = () => {
    AuthTokenManager.removeAuthAccessToken();
    history.push("/login");
    setAlertModalMessage("Session expired. Please log in again");
    setAlertModalOpen(true);
    localStorage.setItem("session-timeout", Date.now());
  };
  const handleResetPassword = () => {
    AuthTokenManager.removeAuthAccessToken();
    history.push("/login");
    setAlertModalMessage("Password reset successfully. Please log in again");
    setAlertModalOpen(true);
    localStorage.setItem("reset-password", Date.now());
  };
  const syncTabs = async event => {
    if (event.key === "login") {
      setAlertModalOpen(false);
      setAlertModalMessage("");
      await initAuthToken();
      history.push("/staff");
    }
    else if (event.key === "logout") {
      AuthTokenManager.removeAuthAccessToken();
      history.push("/login");
      setAlertModalMessage("Logged out successfully");
      setAlertModalOpen(true);
    }
    else if (event.key === "session-timeout") {
      AuthTokenManager.removeAuthAccessToken();
      history.push("/login");
      setAlertModalMessage("Session expired. Please log in again");
      setAlertModalOpen(true);
    }
    else if (event.key === "reset-password") {
      AuthTokenManager.removeAuthAccessToken();
      history.push("/login");
      setAlertModalMessage("Password reset successfully. Please log in again");
      setAlertModalOpen(true);
    }
  };
  const setupEventListeners = () => {
    window.addEventListener("login", handleLogin);
    window.addEventListener("logout", handleLogout);
    window.addEventListener("session-timeout", handleTimeout);
    window.addEventListener("reset-password", handleResetPassword);
    window.addEventListener("storage", syncTabs);
    return () => {
      window.removeEventListener("login", handleLogin);
      window.removeEventListener("logout", handleLogout);
      window.removeEventListener("session-timeout", handleTimeout);
      window.removeEventListener("reset-password", handleResetPassword);
      window.removeEventListener("storage", syncTabs);
    };
  };
  useEffect(initAuthToken, []);
  useEffect(setupEventListeners, []);

  const toggleAlertModal = () => { setAlertModalOpen(prevState => !prevState); };
  const resetAlertModal = () => { setAlertModalMessage(""); };

  if (isLoading) {
    return <div />;
  }
  return (
    <>
      <Switch>
        <Route exact path="/"><Redirect to={AuthTokenManager.getAuthAccessToken() ? "/staff" : "/login"} /></Route>
        <Route exact path="/login"><Login /></Route>
        <Route path="/staff"><StaffHome /></Route>
        <Route exact path="/404"><PageNotFound /></Route>
        <Route path="/"><Redirect to="/404" /></Route>
      </Switch>

      <AlertModal
        isOpen={alertModalIsOpen}
        variant="primary"
        toggle={toggleAlertModal}
        reset={resetAlertModal}
      >
        {alertModalMessage}
      </AlertModal>
    </>
  );
}

export default App;
