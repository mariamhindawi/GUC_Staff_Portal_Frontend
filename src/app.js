import React from "react";
import { Route } from "react-router-dom";
import Root from "./components/root.component";
import LoginForm from "./components/login_form.component";
import Header from "./components/header.component";
import Sidebar from "./components/sidebar.component";
import HrHomePage from "./components/hr_home.component";

function App() {
  return (
    <div>
      <Route exact path="/"> <Root /> </Route>
      <Route exact path="/login"> <LoginForm /> </Route>
      <Route path="/staff"> <Header /> </Route>
      <Route path="/staff"> <Sidebar /> </Route>
      <Route path="/staff/hr"> <HrHomePage /> </Route>
    </div>
  );
}

export default App;