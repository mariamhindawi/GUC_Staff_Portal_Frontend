import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { Button } from "react-bootstrap";
import { useUserContext } from "../../../../contexts/UserContext";

function RequestsHome() {
  const match = useRouteMatch();
  const user = useUserContext();

  return (
    <Container>
      <Row>
        <Col md={4}>
          <Link to={`${match.path}/view-requests`}>
            <Button className="general-page-button" variant="info">
              View Requests status
              <br />
            </Button>
          </Link>
        </Col>
        <Col md={4}>
          <Link to={`${match.path}/view-replacement-requests`}>
            <Button className="general-page-button" variant="info">
              View replacement request
              <br />
            </Button>
          </Link>
        </Col>
        <Col md={4}>
          <Link to={`${match.path}/send-leave-request`}>
            <Button className="general-page-button" variant="info">
              Send Leave Request
              <br />
            </Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Link to={`${match.path}/send-replacement-request`}>
            <Button className="general-page-button" variant="info">
              Send replacement request
              <br />
            </Button>
          </Link>
        </Col>
        <Col md={4}>
          <Link to={`${match.path}/send-slot-linking-request`}>
            <Button className="general-page-button" variant="info">
              Send slot linking request
              <br />
            </Button>
          </Link>
        </Col>
        <Col md={4}>
          <Link to={`${match.path}/change-day-off-request`}>
            <Button className="general-page-button" variant="info">
              Change day off request
              <br />
            </Button>
          </Link>
        </Col>
      </Row>
      <Row>
        {user.role === "Head of Department"
          ? (
            <Col md={{ size: 4, offset: 4 }}>
              <Link to={`${match.path}/view-staff-requests`}>
                <Button className="general-page-button" variant="info">
                  View staff requests
                  <br />
                </Button>
              </Link>
            </Col>
          ) : null}
        {user.role === "Course Coordinator"
          ? (
            <Col md={{ size: 4, offset: 4 }}>
              <Link to={`${match.path}/view-slot-linking-requests`}>
                <Button className="general-page-button" variant="info">
                  View slot linking requests
                  <br />
                </Button>
              </Link>

            </Col>
          )
          : null}
      </Row>
    </Container>
  );
}

export default RequestsHome;
