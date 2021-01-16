import React from "react";
import { Route } from "react-router-dom";
import Root from "./components/root.component";
import LoginForm from "./components/login_form.component";
import Header from "./components/header.component";
import Sidebar from "./components/sidebar.component";
import HrHomePage from "./components/hr_home.component";
import HodHomePage from "./components/hod_home.component";
import CiHomePage from "./components/ci_home.component";
import CCHome from "./components/cc_home.component";
import TaHomePage from "./components/ta_home.component";

function App() {
  return (
    <div>
      <Route exact path="/"> <Root /> </Route>
      <Route exact path="/login"> <LoginForm /> </Route>
      <Route path="/staff"> <Header /> </Route>
      <Route path="/staff"> <Sidebar /> </Route>
      <Route path="/staff/hr"> <HrHomePage /> </Route>
      <Route path="/staff/hod"> <HodHomePage /> </Route>
      <Route path="/staff/ci"> <CiHomePage /> </Route>
      <Route path="/staff/ta"> <TaHomePage /> </Route>
      <Route path="/staff/cc"> <CCHome /> </Route>
     

    </div>
  );
}

export default App;