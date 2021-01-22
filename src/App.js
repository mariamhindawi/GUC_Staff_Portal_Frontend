import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-social/bootstrap-social.css";
import "./css/App.css";
import "./others/fontawesome_icons";
import LoginForm from "./components/form_components/login_form.component";
import StaffHome from "./components/home_components/staff_home.component";
import PageNotFound from "./components/error_components/page_not_found.component";
import authTokenManager from "./others/auth_token_manager";

const App = () => {
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