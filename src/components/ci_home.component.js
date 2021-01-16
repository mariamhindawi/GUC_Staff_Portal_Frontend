import React from "react";
import { Route, Link, withRouter } from "react-router-dom";
import CIcoverage from "./ci_coverage.component";
import jwt from "jsonwebtoken";
import CiCourses from "./ci_courses.component";
import CIacademics from "./ci_staff_members.component";

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
                        <Route path={`${this.props.match.path}/course-coverage`}> <CIcoverage /> </Route>
                        <Route path={`${this.props.match.path}/ci-courses`}> <CiCourses /> </Route>
                        <Route path={`${this.props.match.path}/ci-staff`}> <CIacademics /> </Route>
                    </div>
                </div>
            )
        }
    }


export default withRouter(CiHomePage);