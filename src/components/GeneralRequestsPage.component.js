import React, { useState } from 'react'
import { Link, Route, useRouteMatch } from 'react-router-dom'
import { Card, CardHeader, Col, Container, Row } from 'reactstrap'
import jwt from 'jsonwebtoken'
import requestsComponent from './requests.component'
import sendLeaveRequest from './createRequest.component'
import ViewReplacement from './ViewReplacement.component'
import ChangeDayOff from './ChangeDayOff.component'
import SendSlotLinking from './createSlotLinkingRequest.component'
import ReplacementRequest from './ReplacementRequest.component'
import HODRequests from "./HODrequests.component";
import CCRequests from './CCrequests.component'
import CICourseSlots from './CI_viewCoursesSlots.component'

const AcademicHomePageComponent = () => {
    const match = useRouteMatch()
    return <>
        <Route exact path={match.path}>
            <Container>
                <Row>
                    <Col md={4}>
                        <Link to={match.path + '/view-requests'}>
                            <Card className="m-2 p-2">
                                <CardHeader>View Requests' status</CardHeader>
                            </Card>
                        </Link>
                    </Col>
                    <Col md={4}>
                        <Link to={match.path + "/view-replacement-requests"}>
                            <Card className="m-2 p-2">
                                <CardHeader>View replacement request</CardHeader>
                            </Card>
                        </Link>
                    </Col>
                    <Col md={4}>
                        <Link to={match.path + '/send-leave-request'}>
                            <Card className="m-2 p-2">
                                <CardHeader>Send Leave Request</CardHeader>
                            </Card>
                        </Link>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Link to={match.path + '/send-replacement-request'}>
                            <Card className="m-2 p-2">
                                <CardHeader>Send replacement request</CardHeader>
                            </Card>
                        </Link>
                    </Col>
                    <Col md={4}>
                        <Link to={match.path + '/send-slot-linking-request'}>
                            <Card className="m-2 p-2">
                                <CardHeader>Send Slot-Linking Request</CardHeader>
                            </Card>
                        </Link>
                    </Col>
                    <Col md={4}>
                        <Link to={match.path + '/change-day-off-request'}>
                            <Card className="m-2 p-2">
                                <CardHeader>Change Day Off Request</CardHeader>
                            </Card>
                        </Link>
                    </Col>
                </Row>
                <Row>
                    {jwt.decode(sessionStorage.token).role === 'Head of Department' ?
                        <Col md={{ size: 4, offset: 4 }}>
                            <Link to={match.path + '/view-staff-requests'}>
                                <Card className="m-2 p-2">
                                    <CardHeader>View Staff Requests</CardHeader>
                                </Card>
                            </Link>
                        </Col> : jwt.decode(sessionStorage.token).role === 'Course Coordinator' ?
                            <Col md={{ size: 4, offset: 4 }}>
                                <Link to={match.path + '/view-slot-linking-requests'}>
                                    <Card className="m-2 p-2">
                                        <CardHeader>View Slot-Linking Requests</CardHeader>
                                    </Card>
                                </Link>

                            </Col>
                            : null}
                </Row>
            </Container>
        </Route>
        <Route exact path={match.path + '/view-requests'} component={requestsComponent} />
        <Route exact path={match.path + '/view-replacement-requests'} component={ViewReplacement} />
        <Route exact path={match.path + '/send-leave-request'} component={sendLeaveRequest} />
        <Route exact path={match.path + '/send-replacement-request'} component={ReplacementRequest} />
        <Route exact path={match.path + '/send-slot-linking-request'} component={SendSlotLinking} />
        <Route exact path={match.path + '/change-day-off-request'} component={ChangeDayOff} />
        {jwt.decode(sessionStorage.token).role === 'Head of Department' ? <Route exact path={match.path + '/view-staff-requests'} component={HODRequests} /> :
            jwt.decode(sessionStorage.token).role === 'Course Coordinator' ? <Route exact path={match.path + '/view-slot-linking-requests'} component={CCRequests} /> : null}

    </>
}

export default AcademicHomePageComponent