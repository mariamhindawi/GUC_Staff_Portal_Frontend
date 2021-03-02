import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { Button } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUserContext } from "../../../../contexts/UserContext";

function RequestsHome() {
  const match = useRouteMatch();
  const user = useUserContext();

  return (
    <div className="view-container">
      <div className="general-page-container">
        <Link to={`${match.path}/view-requests`}>
          <Button className="general-page-button" variant="info">
            View Requests status
            <br />
          </Button>
        </Link>
        <Link to={`${match.path}/view-replacement-requests`}>
          <Button className="general-page-button" variant="info">
            View replacement request
            <br />
          </Button>
        </Link>
        <Link to={`${match.path}/send-leave-request`}>
          <Button className="general-page-button" variant="info">
            Send Leave Request
            <br />
          </Button>
        </Link>
        <Link to={`${match.path}/send-replacement-request`}>
          <Button className="general-page-button" variant="info">
            Send replacement request
            <br />
          </Button>
        </Link>
        <Link to={`${match.path}/send-slot-linking-request`}>
          <Button className="general-page-button" variant="info">
            Send slot linking request
            <br />
          </Button>
        </Link>
        <Link to={`${match.path}/change-day-off-request`}>
          <Button className="general-page-button" variant="info">
            Change day off request
            <br />
          </Button>
        </Link>
        {user.role === "Head of Department"
          && (
            <Link to={`${match.path}/view-staff-requests`}>
              <Button className="general-page-button" variant="info">
                View staff requests
                <br />
              </Button>
            </Link>
          )}
        {user.role === "Course Coordinator"
          && (
            <Link to={`${match.path}/view-slot-linking-requests`}>
              <Button className="general-page-button" variant="info">
                View slot linking requests
                <br />
              </Button>
            </Link>
          )}
      </div>
    </div>
  );
}

export default RequestsHome;
