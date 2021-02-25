import React from "react";
import { Button } from "react-bootstrap";
import { Link, useRouteMatch } from "react-router-dom";

function HrAttendanceHome() {
  const match = useRouteMatch();

  return (
    <div className="view-container align-center text-center">
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
        <Button className="general-attendance-button">Add Missing Attendance Record</Button>
      </Link>
    </div>
  );
}

export default HrAttendanceHome;
