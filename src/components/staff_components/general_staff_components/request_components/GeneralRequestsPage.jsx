import React from "react";
import { Link, Route, useRouteMatch } from "react-router-dom";
import { Card, CardHeader, Col, Container, Row } from "reactstrap";
import changeDayOffRequest from "./changeDayOffRequest";
import SendSlotLinkingRequest from "../../../todo/createSlotLinkingRequest.component";
import ViewRequests from "../../../todo/requests.component";
import ViewReplacement from "../../../todo/ViewReplacement.component";
import SendReplacement from "../../../todo/ReplacementRequest.component";
import CCRequests from "../../../todo/CCrequests.component";
import LeaveRequest from "../../../todo/createRequest.component";
import HODRequests from "../../../todo/HODrequests.component";
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
                <Card className="m-2 p-2">
                  <CardHeader>View Requests status</CardHeader>
                </Card>
              </Link>
            </Col>
            <Col md={4}>
              <Link to={`${match.path}/view-replacement-requests`}>
                <Card className="m-2 p-2">
                  <CardHeader>View replacement request</CardHeader>
                </Card>
              </Link>
            </Col>
            <Col md={4}>
              <Link to={`${match.path}/send-leave-request`}>
                <Card className="m-2 p-2">
                  <CardHeader>Send Leave Request</CardHeader>
                </Card>
              </Link>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Link to={`${match.path}/send-replacement-request`}>
                <Card className="m-2 p-2">
                  <CardHeader>Send replacement request</CardHeader>
                </Card>
              </Link>
            </Col>
            <Col md={4}>
              <Link to={`${match.path}/send-slot-linking-request`}>
                <Card className="m-2 p-2">
                  <CardHeader>Send Slot-Linking Request</CardHeader>
                </Card>
              </Link>
            </Col>
            <Col md={4}>
              <Link to={`${match.path}/change-day-off-request`}>
                <Card className="m-2 p-2">
                  <CardHeader>Change Day Off Request</CardHeader>
                </Card>
              </Link>
            </Col>
          </Row>
          <Row>
            {user.role === "Head of Department"
              ? (
                <Col md={{ size: 4, offset: 4 }}>
                  <Link to={`${match.path}/view-staff-requests`}>
                    <Card className="m-2 p-2">
                      <CardHeader>View Staff Requests</CardHeader>
                    </Card>
                  </Link>
                </Col>
              ) : null}
            {user.role === "Course Coordinator"
              ? (
                <Col md={{ size: 4, offset: 4 }}>
                  <Link to={`${match.path}/view-slot-linking-requests`}>
                    <Card className="m-2 p-2">
                      <CardHeader>View Slot-Linking Requests</CardHeader>
                    </Card>
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
