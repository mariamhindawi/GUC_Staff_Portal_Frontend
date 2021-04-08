import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { Button } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUserContext } from "../../../../contexts/UserContext";

function RequestsHome() {
  const match = useRouteMatch();
  const user = useUserContext();

  return (
    <div className="view-container">
      <div className="general-page-container">
        <Link to={`${match.path}/view-replacement-requests`}>
          <Button className="general-page-button" variant="info">
            View replacement request
            <br />
          </Button>
        </Link>
        <Link to={`${match.path}/view-requests`} tabIndex={-1}>
          <Button className="general-page-button" variant="info">
            Requests status
            <br />
            <FontAwesomeIcon icon="spinner" />
          </Button>
        </Link>
        <Link to={`${match.path}/send-leave-request`} tabIndex={-1}>
          <Button className="general-page-button" variant="info">
            Send Request
            <br />
            <FontAwesomeIcon icon="share" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default RequestsHome;
