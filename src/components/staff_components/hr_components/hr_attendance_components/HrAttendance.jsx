import React from "react";
import { Route, Switch, useRouteMatch, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Attendance from "../../general_staff_components/Attendance";
import HrViewAttendanceRecords from "./HrViewAttendanceRecords";
import HrViewMissingDays from "./HrViewMissingDays";
import HrViewMissingHours from "./HrViewMissingHours";
import HrAddAttendanceRecord from "./HrAddAttendanceRecord";

function HrAttendance() {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${match.path}`}>
        <div className="align-center text-center">
          <Link to={`${match.url}/my-attendance`} tabIndex={-1}>
            <Button className="general-attendance-button">My Attendance</Button>
          </Link>
          <Link to={`${match.url}/staff-attendance-records`} tabIndex={-1}>
            <Button className="general-attendance-button">Staff Attendance Records</Button>
          </Link>
          <Link to={`${match.url}/staff-missing-days`} tabIndex={-1}>
            <Button className="general-attendance-button">Staff Missing Days</Button>
          </Link>
          <Link to={`${match.url}/staff-missing-hours`} tabIndex={-1}>
            <Button className="general-attendance-button">Staff Missing Hours</Button>
          </Link>
          <Link to={`${match.url}/add-attendance-record`} tabIndex={-1}>
            <Button className="general-attendance-button">Add Missing Record</Button>
          </Link>
        </div>
      </Route>
      <Route exact path={`${match.path}/my-attendance`}><Attendance /></Route>
      <Route path={`${match.path}/staff-attendance-records`}><HrViewAttendanceRecords /></Route>
      <Route path={`${match.path}/staff-missing-days`}><HrViewMissingDays /></Route>
      <Route path={`${match.path}/staff-missing-hours`}><HrViewMissingHours /></Route>
      <Route path={`${match.path}/add-attendance-record`}><HrAddAttendanceRecord /></Route>
    </Switch>
  );
}
export default HrAttendance;
