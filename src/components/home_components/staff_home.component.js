import React, { useState } from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import jwt from "jsonwebtoken";
import HrHomePage from "./hr_home.component";
import HodHomePage from "./hod_home.component";
import CiHomePage from "./ci_home.component";
import CCHome from "./cc_home.component";
import TaHomePage from "./ta_home.component";

const StaffHome = () => {
  if (!sessionStorage.token) {
    return <Redirect to="/login" />;
  }
  const token = jwt.decode(sessionStorage.token);
  let role;
  switch (token.role) {
    case "HR": role = "hr"; break;
    case "Head of Department": role = "hod"; break;
    case "Course Instructor": role = "ci"; break;
    case "Course Coordinator": role = "cc"; break;
    case "Teaching Assistant": role = "ta"; break;
    default: role = "";
  }

  const [sidebarStyle, setSidebarStyle] = useState("");
  const [homeContainerStyle, setHomeContainerStyle] = useState("");
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={match.path}> <Redirect to={`${match.path}/${role}`} /> </Route>
      <Route path={`${match.path}/hr`}>
        <HrHomePage
          sidebarStyle={sidebarStyle} setSidebarStyle={setSidebarStyle}
          homeContainerStyle={homeContainerStyle} setHomeContainerStyle={setHomeContainerStyle}
        />
      </Route>
      <Route path={`${match.path}/hod`}> <HodHomePage /> </Route>
      <Route path={`${match.path}/ci`}> <CiHomePage /> </Route>
      <Route path={`${match.path}/cc`}> <CCHome /> </Route>
      <Route path={`${match.path}/ta`}> <TaHomePage /> </Route>
      <Route path={match.path}> <Redirect to="/404" /> </Route>
    </Switch>
  );
}

export default StaffHome;