import React from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import { useUserContext } from "../../../../contexts/UserContext";
import RequestsHome from "./RequestsHome";
import ChangeDayOffRequest from "./changeDayOffRequest";
import SendSlotLinkingRequest from "./createSlotLinkingRequest.component";
import ViewRequests from "./ViewMyRequests";
import ViewReplacement from "./ViewReplacement.component";
import SendReplacement from "./ReplacementRequest.component";
import CCRequests from "../../cc_components/CCrequests.component";
import LeaveRequest from "./createRequest.component";
import HODRequests from "../../hod_components/HODrequests.component";
import SendRequests from "../request_components/sendRequest";


function Requests() {
  const match = useRouteMatch();
  const user = useUserContext();

  return (
    <Switch>
      <Route exact path={match.path}><RequestsHome /></Route>
      <Route exact path={`${match.path}/view-requests`}><ViewRequests /></Route>
      <Route exact path={`${match.path}/view-replacement-requests`}><ViewReplacement /></Route>
      <Route exact path={`${match.path}/send-leave-request`}><LeaveRequest /></Route>
      <Route exact path={`${match.path}/send-replacement-request`}><SendReplacement /></Route>
      <Route exact path={`${match.path}/send-slot-linking-request`}><SendSlotLinkingRequest /></Route>
      <Route exact path={`${match.path}/change-day-off-request`}><ChangeDayOffRequest /></Route>
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
