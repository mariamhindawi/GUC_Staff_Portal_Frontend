import React from "react";
import { Route, Switch, useRouteMatch, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import MyAttendance from "../../general_staff_components/Attendance";
import StaffAttendanceRecords from "./HrAttendance";
import StaffMissingDays from "./HrMissingDays";
import StaffMissingHours from "./HrMissingHours";
import HrAddMissingRecord from "./HrAddMissingRecord";

function HrGeneralAttendance() {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${match.path}`}>
        <div className="general-attendance-container align-center">
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
          <Link to={`${match.url}/add-missing-record`} tabIndex={-1}>
            <Button className="general-attendance-button">Add Missing Record</Button>
          </Link>
        </div>
      </Route>
      <Route exact path={`${match.path}/my-attendance`} component={MyAttendance} />
      <Route exact path={`${match.path}/staff-attendance-records`} component={StaffAttendanceRecords} />
      <Route exact path={`${match.path}/staff-missing-days`} component={StaffMissingDays} />
      <Route exact path={`${match.path}/staff-missing-hours`} component={StaffMissingHours} />
      <Route exact path={`${match.path}/add-missing-record`} component={HrAddMissingRecord} />
    </Switch>

  );
}
export default HrGeneralAttendance;
