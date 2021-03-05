import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";
import "./others/FontawesomeIcons";
import AuthTokenManager from "./others/AuthTokenManager";
import { useSetUserContext } from "./contexts/UserContext";
import Login from "./components/staff_components/general_staff_components/Login";
import StaffHome from "./components/staff_components/general_staff_components/StaffHome";
import PageNotFound from "./components/error_components/PageNotFound";
import ForbiddenAccess from "./components/error_components/ForbiddenAccess";
import AlertModal from "./components/helper_components/AlertModal";

function App() {
  const [isLoading, setLoading] = useState(true);
  const [alertModalIsOpen, setAlertModalOpen] = useState(false);
  const [alertModalMessage, setAlertModalMessage] = useState("");
  const setUserContext = useSetUserContext();
  const history = useHistory();

  const initAuthToken = async () => {
    setLoading(true);
    await AuthTokenManager.initAuthAccessToken();
    setLoading(false);
  };
  const setUser = () => {
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
    setUserContext(user);
  };
  const updateToken = (e, syncTabs) => {
    if (syncTabs) {
      setTimeout(() => { AuthTokenManager.initAuthAccessToken(); }, 1000);
    }
    else {
      AuthTokenManager.initAuthAccessToken();
    }
  };
  const handleLogin = async (e, syncTabs) => {
    if (!syncTabs) {
      setUser();
      localStorage.setItem("login", Date.now());
    }
    else {
      await initAuthToken();
    }
    history.push("/staff");
  };
  const handleLogout = (e, syncTabs) => {
    AuthTokenManager.removeAuthAccessToken();
    history.push("/login");
    setAlertModalMessage("Logged out successfully");
    setAlertModalOpen(true);
    setUserContext({});
    if (!syncTabs) {
      localStorage.setItem("logout", Date.now());
    }
  };
  const handleTimeout = (e, syncTabs) => {
    AuthTokenManager.removeAuthAccessToken();
    history.push("/login");
    setAlertModalMessage("Session expired. Please log in again");
    setAlertModalOpen(true);
    setUserContext({});
    if (!syncTabs) {
      localStorage.setItem("session-timeout", Date.now());
    }
  };
  const handleResetPassword = (e, syncTabs) => {
    AuthTokenManager.removeAuthAccessToken();
    history.push("/login");
    setAlertModalMessage("Password reset successfully. Please log in again");
    setAlertModalOpen(true);
    setUserContext({});
    if (!syncTabs) {
      localStorage.setItem("reset-password", Date.now());
    }
  };
  const syncTabs = async e => {
    if (e.key === "update-token") {
      updateToken(e, true);
    }
    else if (e.key === "login") {
      handleLogin(e, true);
    }
    else if (e.key === "logout") {
      handleLogout(e, true);
    }
    else if (e.key === "session-timeout") {
      handleTimeout(e, true);
    }
    else if (e.key === "reset-password") {
      handleResetPassword(e, true);
    }
  };
  const setupEventListeners = () => {
    window.addEventListener("set-user", setUser);
    window.addEventListener("update-token", updateToken);
    window.addEventListener("login", handleLogin);
    window.addEventListener("logout", handleLogout);
    window.addEventListener("session-timeout", handleTimeout);
    window.addEventListener("reset-password", handleResetPassword);
    window.addEventListener("storage", syncTabs);
    return () => {
      window.removeEventListener("set-user", setUser);
      window.removeEventListener("update-token", updateToken);
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
        <Route exact path="/403"><ForbiddenAccess /></Route>
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
