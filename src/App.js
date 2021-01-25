import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-social/bootstrap-social.css";
import "./css/App.css";
import "./others/fontawesome_icons";
import LoginForm from "./components/form_components/login_form.component";
import StaffHome from "./components/home_components/staff_home.component";
import PageNotFound from "./components/error_components/page_not_found.component";
import authTokenManager from "./others/auth_token_manager";

const App = () => {
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const initAccessToken = async () => {
    await authTokenManager.initAuthAccessToken();
    setLoading(false);
  }
  useEffect(() => { initAccessToken() }, []);

  const syncTabs = (event) => {
    if (event.type === "timeout") {
      // TODO: display message??
      alert("Session expired. Please sign in again");
      authTokenManager.removeAuthAccessToken();
      history.push("/");
    }
    else if (event.type === "storage") {
      if (event.key === "logout") {
        // TODO: display message??
        // alert("Logged out");
        authTokenManager.removeAuthAccessToken();
        history.push("/");
      }
      else if (event.key === "timeout") {
        // TODO: display message??
        // alert("Session expired. Please sign in again");
        authTokenManager.removeAuthAccessToken();
        history.push("/");
      }
    }
  }

  const logoutEventListenerEffect = () => {
    window.addEventListener("timeout", syncTabs);
    window.addEventListener("storage", syncTabs);
    return () => {
      window.removeEventListener("timeout", syncTabs);
      window.removeEventListener("storage", syncTabs)
    }
  }
  useEffect(logoutEventListenerEffect, []);


  if (loading) {
    return <div></div>;
  }

  return (
    <Switch>
      <Route exact path="/"> <Redirect to={authTokenManager.getAuthAccessToken() ? "/staff" : "/login"} /> </Route>
      <Route exact path="/login"> <LoginForm /> </Route>
      <Route path="/staff"> <StaffHome /> </Route>
      <Route exact path="/404"> <PageNotFound /> </Route>
      <Route path="/"> <Redirect to="/404" /> </Route>
    </Switch>
  );
}

export default App;