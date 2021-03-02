import React from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import HrAttendanceHome from "./HrAttendanceHome";
import HrViewAttendanceRecords from "./HrViewAttendanceRecords";
import HrViewMissingDays from "./HrViewMissingDays";
import HrViewMissingHours from "./HrViewMissingHours";
import HrAddAttendanceRecord from "./HrAddAttendanceRecord";

function HrAttendance() {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${match.path}`}><HrAttendanceHome /></Route>
      <Route path={`${match.path}/attendance-records`}><HrViewAttendanceRecords /></Route>
      <Route path={`${match.path}/missing-days`}><HrViewMissingDays /></Route>
      <Route path={`${match.path}/missing-hours`}><HrViewMissingHours /></Route>
      <Route path={`${match.path}/add-attendance-record`}><HrAddAttendanceRecord /></Route>
      <Route path={match.path}><Redirect to="/404" /></Route>
    </Switch>
  );
}
export default HrAttendance;
