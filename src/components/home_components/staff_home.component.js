import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import HrHomePage from "./hr_home.component";
import HodHomePage from "./hod_home.component";
import CiHomePage from "./ci_home.component";
import CCHome from "./cc_home.component";
import TaHomePage from "./ta_home.component";

const StaffHome = () => {
  const [sidebarStyle, setSidebarStyle] = useState("");
  const [homeContainerStyle, setHomeContainerStyle] = useState("");
  const history = useHistory();
  const match = useRouteMatch();

  const componentDidMount = () => {
    if (!sessionStorage.token) {
      history.push("/");
    }
  }
  useEffect(componentDidMount, []);


  if (!sessionStorage.token) {
    return <></>;
  }

  return (
    <Switch>
      <Route path={`${match.path}/hr`}>
        <HrHomePage
          sidebarStyle={sidebarStyle} setSidebarStyle={setSidebarStyle}
          homeContainerStyle={homeContainerStyle} setHomeContainerStyle={setHomeContainerStyle}
        />
      </Route>
      <Route path={`${match.path}/hod`}> <HodHomePage /> </Route>
      <Route path={`${match.path}/ci`}> <CiHomePage /> </Route>
      <Route path={`${match.path}/cc`}> <CCHome /> </Route>
      <Route path={`${match.path}/ta`}> <TaHomePage />  </Route>
      <Route path={match.path}> <div>Page not found</div>  </Route>
    </Switch>
  );
}

export default StaffHome;