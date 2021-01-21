import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-social/bootstrap-social.css";
import "./App.css";
import "./others/fontawesome_icons";
import LoginForm from "./components/form_components/login_form.component";
import StaffHome from "./components/home_components/staff_home.component";

const App = () => {
  return (
    <Switch>
      <Route exact path="/"> <Redirect to={sessionStorage.token ? "/staff" : "/login"} /> </Route>
      <Route exact path="/login"> <LoginForm /> </Route>
      <Route path="/staff"> <StaffHome /> </Route>
      <Route path="/"> <div>Page Not Found</div> </Route>
    </Switch>
  );
}

export default App;