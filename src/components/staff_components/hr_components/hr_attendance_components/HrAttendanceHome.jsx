import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function HrAttendanceHome() {
  const match = useRouteMatch();

  return (
    <div className="view-container">
      <div className="general-page-container">
        <Link to={`${match.url}/attendance-records`} tabIndex={-1}>
          <Button className="general-page-button" variant="info">
            Staff Attendance Records
            <br />
            <FontAwesomeIcon icon="address-book" />
          </Button>
        </Link>
        <Link to={`${match.url}/missing-days`} tabIndex={-1}>
          <Button className="general-page-button" variant="info">
            Staff Missing Days
            <br />
            <FontAwesomeIcon icon="calendar-day" />
          </Button>
        </Link>
        <Link to={`${match.url}/missing-hours`} tabIndex={-1}>
          <Button className="general-page-button" variant="info">
            Staff Missing Hours
            <br />
            <FontAwesomeIcon icon="hourglass-half" />
          </Button>
        </Link>
        <Link to={`${match.url}/add-attendance-record`} tabIndex={-1}>
          <Button className="general-page-button" variant="info">
            Add Missing Attendance Record
            <br />
            <FontAwesomeIcon icon="calendar-plus" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default HrAttendanceHome;
