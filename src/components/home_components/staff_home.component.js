import React, { useState } from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import jwt from "jsonwebtoken";
import HrHomePage from "./hr_home.component";
import authTokenManager from "../../others/auth_token_manager";
// import HodHomePage from "./hod_home.component";
// import CiHomePage from "./ci_home.component";
// import CCHome from "./cc_home.component";
// import TaHomePage from "./ta_home.component";

const StaffHome = () => {
  const [sidebarStyle, setSidebarStyle] = useState("");
  const [homeContainerStyle, setHomeContainerStyle] = useState("");
  const match = useRouteMatch();

  if (!authTokenManager.getAuthAccessToken()) {
    return <Redirect to="/login" />;
  }
  const authAccessToken = jwt.decode(authTokenManager.getAuthAccessToken());
  let userRole;
  switch (authAccessToken.role) {
    case "HR": userRole = "hr"; break;
    case "Head of Department": userRole = "hod"; break;
    case "Course Instructor": userRole = "ci"; break;
    case "Course Coordinator": userRole = "cc"; break;
    case "Teaching Assistant": userRole = "ta"; break;
    default: userRole = "";
  }

  return (
    <Switch>
      <Route exact path={match.path}> <Redirect to={`${match.path}/${userRole}`} /> </Route>
      <Route path={`${match.path}/hr`}>
        <HrHomePage
          sidebarStyle={sidebarStyle} setSidebarStyle={setSidebarStyle}
          homeContainerStyle={homeContainerStyle} setHomeContainerStyle={setHomeContainerStyle}
        />
      </Route>
      {/* <Route path={`${match.path}/hod`}> <HodHomePage /> </Route>
      <Route path={`${match.path}/ci`}> <CiHomePage /> </Route>
      <Route path={`${match.path}/cc`}> <CCHome /> </Route>
      <Route path={`${match.path}/ta`}> <TaHomePage /> </Route> */}
      <Route path={match.path}> <Redirect to="/404" /> </Route>
    </Switch>
  );
}

export default StaffHome;