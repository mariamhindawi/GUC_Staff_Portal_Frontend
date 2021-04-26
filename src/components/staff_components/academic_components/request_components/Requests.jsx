import React from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import { useUserContext } from "../../../../contexts/UserContext";
import RequestsHome from "./RequestsHome";
import ViewRequests from "./ViewMyRequests";
import CCRequests from "../../cc_components/CcRequests";
import HODRequests from "../../hod_components/HodRequests";
import SendRequests from "./sendRequest";

function Requests() {
  const match = useRouteMatch();
  const user = useUserContext();

  return (
    <Switch>
      <Route exact path={match.path}><RequestsHome /></Route>
      <Route exact path={`${match.path}/view-requests`}><ViewRequests /></Route>
      <Route exact path={`${match.path}/send-request`}><SendRequests /></Route>

      {user.role === "Head of Department"
        && <Route exact path={`${match.path}/view-staff-requests`}><HODRequests /></Route>}
      {user.role === "Course Coordinator"
       && <Route exact path={`${match.path}/view-slot-linking-requests`}><CCRequests /></Route>}
      <Route path={match.path}><Redirect to="/404" /></Route>
    </Switch>
  );
}

export default Requests;
