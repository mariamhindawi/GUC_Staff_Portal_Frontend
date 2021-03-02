import React from "react";
import { Link, Route, useRouteMatch } from "react-router-dom";
import { Card, CardHeader, Col, Container, Row } from "reactstrap";
import { Button } from "react-bootstrap";
import changeDayOffRequest from "./changeDayOffRequest";
import SendSlotLinkingRequest from "./createSlotLinkingRequest.component";
import ViewRequests from "./requests.component";
import ViewReplacement from "./ViewReplacement.component";
import SendReplacement from "./ReplacementRequest.component";
import CCRequests from "../../cc_components/CCrequests.component";
import LeaveRequest from "./createRequest.component";
import HODRequests from "../../hod_components/HODrequests.component";
import { useUserContext } from "../../../../contexts/UserContext";

const GeneralRequestsPageComponent = () => {
  const match = useRouteMatch();
  const user = useUserContext();
  return (
    <>
      <Route exact path={match.path}>
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
      </Route>
      <Route exact path={`${match.path}/view-requests`} component={ViewRequests} />
      <Route exact path={`${match.path}/view-replacement-requests`} component={ViewReplacement} />
      <Route exact path={`${match.path}/send-leave-request`} component={LeaveRequest} />
      <Route exact path={`${match.path}/send-replacement-request`} component={SendReplacement} />
      <Route exact path={`${match.path}/send-slot-linking-request`} component={SendSlotLinkingRequest} />
      <Route exact path={`${match.path}/change-day-off-request`} component={changeDayOffRequest} />
      {user.role === "Head of Department" ? <Route exact path={`${match.path}/view-staff-requests`} component={HODRequests} />
        : null}
      {user.role === "Course Coordinator" ? <Route exact path={`${match.path}/view-slot-linking-requests`} component={CCRequests} /> : null}

    </>
  );
};

export default GeneralRequestsPageComponent;
