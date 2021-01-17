import React from "react";
import { Route, Link, withRouter } from "react-router-dom";
import jwt from "jsonwebtoken";
import { Card, CardHeader, Col, Container, Row } from "reactstrap";

import CiCourses from "../ci_courses.component";
import CIacademics from "../ci_staff_members.component";
import CICourseSlots from "../CI_viewCoursesSlots.component"
import CIAssignSlots from "../CI_assignSlots.component";
import GeneralRequests from "../GeneralRequestsPage.component";
import CIcoverage from "../ci_coverage.component";

class CiHomePage extends React.Component {

    render() {

        const token = jwt.decode(sessionStorage.token);
        if (token.role !== "Course Instructor") {
            return (
                <div>Unauthorized Access</div>
            )
        }

        return (
            <div className="home-margin">
                <div>
                    <h1>Welcome</h1>
                    <Link to={`${this.props.match.url}/course-coverage`}>Course Coverage</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to={`${this.props.match.url}/ci-courses`}>Courses</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to={`${this.props.match.url}/ci-staff`}>Staff</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <br /><br />
                </div>
                <div>
                    <Route path={`${this.props.match.path}/ci-courses`}> <Container>
                        <Row>
                            <Col md={4}>
                                <Link to={`${this.props.match.url}/courses-details`}>
                                    <Card className="p-2 m-2">
                                        <CardHeader>Courses details</CardHeader></Card></Link></Col>
                            <Col md={4}><Link to={`${this.props.match.url}/slot-assignments`}><Card className="p-2 m-2"><CardHeader>Slot assignments</CardHeader></Card></Link></Col>
                            <Col md={4}>
                                <Link to={`${this.props.match.url}/course-coverage`}>
                                    <Card className="p-2 m-2">
                                        <CardHeader>Course coverage</CardHeader></Card></Link></Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Link to={`${this.props.match.url}/assign-slots`}>
                                    <Card className="p-2 m-2">
                                        <CardHeader>Assign slots</CardHeader></Card></Link></Col></Row></Container> </Route>
                    <Route path={`${this.props.match.path}/courses-details`}> <CiCourses /> </Route>
                    <Route path={`${this.props.match.path}/slot-assignments`}> <CICourseSlots /> </Route>
                    <Route path={`${this.props.match.path}/slot-assignments`}> <CICourseSlots /> </Route>
                    <Route path={`${this.props.match.path}/assign-slots`}> <CIAssignSlots /> </Route>
                    <Route path={`${this.props.match.path}/staff`}> <CIacademics /> </Route>
                    <Route path={`${this.props.match.path}/requests`}> <GeneralRequests /> </Route>

                </div>
            </div>
        )
    }
}


export default withRouter(CiHomePage);