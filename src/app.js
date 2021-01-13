import React from "react";
import { Switch, Route } from "react-router-dom";
import Root from "./components/root.component";
import LoginForm from "./components/login_form.component";
import Header from "./components/header.component";
import HomePage from "./components/home.component";

function App() {
  return (
    <div>
      <Route exact path="/"> <Root/> </Route>
      <Route exact path="/login"> <LoginForm/> </Route>
      <Route path="/home"> <Header/> </Route>
      <Route path="/home"> <HomePage /> </Route>
    </div>
  );
}

export default App;