import React from "react";
import { Route, Link, withRouter } from "react-router-dom";
import HODcourses from "./hod_courses.component";
import HodCoverage from "./hod_coverage.component";
import HrFaculty from "./hr_faculty.component";
import HrDepartments from "./hr_departments.component";
import HRcourses from "./hr_courses.component";
import HODacademics from "./hod_staff_members.component";
import jwt from "jsonwebtoken";



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
                        <Link to={`${this.props.match.url}/faculties`}>Faculties</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to={`${this.props.match.url}/departments`}>Departments</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to={`${this.props.match.url}/courses`}>Courses</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                        <br /><br />
                </div>
                <div>
                    <Route path={`${this.props.match.path}/hod-courses`}> <HODcourses /> </Route>
                    <Route path={`${this.props.match.path}/hod-coverage`}> <HodCoverage /> </Route>
                    <Route path={`${this.props.match.path}/hod-staff-members`}> <HODacademics /> </Route>
                    <Route path={`${this.props.match.path}/faculties`}> <HrFaculty /> </Route>
                    <Route path={`${this.props.match.path}/departments`}> <HrDepartments /> </Route>
                    <Route path={`${this.props.match.path}/courses`}> <HRcourses /> </Route>
                </div>
            </div>
        )
    }

}

export default withRouter(HodHomePage);