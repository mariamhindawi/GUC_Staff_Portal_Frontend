import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-social/bootstrap-social.css";
import "./components/fontawesome_icons.component.js";
import "./App.css";

import Root from "./components/home_components/root.component";
import LoginForm from "./components/form_components/login_form.component";
import StaffHome from "./components/home_components/staff_home.component";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/"> <Root /> </Route>
        <Route exact path="/login"> <LoginForm /> </Route>
        <Route path="/staff"> <StaffHome /> </Route>
        <Route path="/"> <div>Page Not Found</div> </Route>
      </Switch>
    </Router>
  );
}

export default App;