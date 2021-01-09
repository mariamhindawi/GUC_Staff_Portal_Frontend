import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginForm from "./components/login_form.component";
import Header from "./components/header.component";
import HomePage from "./components/home.component";
import Profile from "./components/profile.component"
import Root from "./components/root.component"

function App() {
  return (
    <Router>
      <div className="container">
        <Route exact path="/" component={Root}/>
        <Route exact path="/login" component={LoginForm}/>
        <Route path="/staff" component={Header}/>
        <Route exact path="/staff/home" component={HomePage}/>
        <Route exact path="/staff/profile" component={Profile}/>
      </div>
    </Router>
  );
}

export default App;