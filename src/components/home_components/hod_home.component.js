import React from "react";
import { Route, Link, withRouter } from "react-router-dom";
import jwt from "jsonwebtoken";
import { Card, CardHeader, Col, Container, Row } from "reactstrap";

import HODcourses from "../todo/hod_courses.component";
import HodCoverage from "../todo/hod_coverage.component";
import HODacademics from "../todo/hod_staff_members.component";
import GeneralRequests from "../todo/GeneralRequestsPage.component"
import HODSlotAssignment from "../HOD_ViewTeachingAssignments.component"
import MySchedule from "../schedule.component"; 



class HodHomePage extends React.Component {

    render() {

        const token = jwt.decode(sessionStorage.token);
        if (token.role !== "Head of Department") {
            return (
                <div>Unauthorized Access</div>
            )
        }

        return (
            <div className="home-margin">
                <div>
                    <h1>Welcome</h1>
                    <Link to={`${this.props.match.url}/hod-courses`}>COURSES</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to={`${this.props.match.url}/hod-coverage`}>Courses Coverage</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to={`${this.props.match.url}/hod-staff-members`}>Staff Members</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                        <br /><br />
                </div>
                <div>
                    <Route path={`${this.props.match.path}`}> <Sidebar /> </Route>
                    <Route path={`${this.props.match.path}/hod-courses`}>

                        <Container>
                            <Row>
                                <Col md={4}>
                                    <Link to={`${this.props.match.url}/hod-courses-details`}>
                                        <Card className="p-2 m-2">
                                            <CardHeader>COURSES</CardHeader></Card></Link></Col>
                                <Col md={4}><Link to={`${this.props.match.url}/hod-coverage`}><Card className="p-2 m-2"><CardHeader>Courses Coverage</CardHeader></Card></Link></Col>
                                <Col md={4}>
                                    <Link to={`${this.props.match.url}/hod-courses-slot-assignments`}>
                                        <Card className="p-2 m-2">
                                            <CardHeader>Slot Assignments</CardHeader></Card></Link></Col>
                            </Row></Container>


                    </Route>
                    <Route path={`${this.props.match.path}/hod-courses-details`}> <HODcourses /> </Route>
                    <Route path={`${this.props.match.path}/hod-coverage`}> <HodCoverage /> </Route>
                    <Route path={`${this.props.match.path}/hod-courses-slot-assignments`}> <HODSlotAssignment /> </Route>
                    <Route path={`${this.props.match.path}/requests`}> <GeneralRequests /> </Route>
                    <Route path={`${this.props.match.path}/hod-staff-members`}> <HODacademics /> </Route>
                    <Route path={`${this.props.match.path}/schedule`}> <MySchedule /> </Route>
                </div>
            </div>
        )
    }

}

export default withRouter(HodHomePage);