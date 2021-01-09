import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginForm from "./components/login_form.component";
import Header from "./components/header.component";
import Home from "./components/home.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Route path="/login" component={LoginForm}/>
        <Route path="/staff" component={Header}/>
        <Route exact path="/staff/home" component={Home}/>
      </div>
    </Router>
  );
}

export default App;