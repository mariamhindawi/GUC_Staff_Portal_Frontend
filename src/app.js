import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginForm from "./components/login_form.component";
import Header from "./components/header.component";
import HomePage from "./components/home.component";
import Root from "./components/root.component"
import Requests from "./components/requests.component";
import Profile from "./components/profile.component";
import Schedule from "./components/schedule.component";
import Attendance from "./components/attendance.component";
import MissingDays from "./components/missing_days.component";

function App() {
  return (
    <div className="container">
      <Router>
        <Route exact path="/"> <Root/> </Route>
        <Route exact path="/login"> <LoginForm/> </Route>
        <Route path="/staff"> <Header/> </Route>
        <Route path="/staff/home"> <HomePage /> </Route>
        <Route path="/staff/profile" component={Profile}/>
        <Route path="/staff/requests" component={Requests}/>
        <Route path="/staff/schedule" component={Schedule}/>
        <Route path="/staff/attendance" component={Attendance}/>
        <Route path="/staff/missingdays" component={MissingDays}/>
      </Router>
    </div>
  );
}

export default App;