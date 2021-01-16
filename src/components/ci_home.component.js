import React from "react";
import { Route, Link, withRouter } from "react-router-dom";
import HrRooms from "./hr_rooms.component";
import HRacademics from "./hr_academics.component";
import HRhrmembers from "./hr_hrmembers.component";
import HRfaculty from "./hr_faculty.component";
import HRdepartments from "./hr_departments.component";
import HRcourses from "./hr_courses.component";
import CIcoverage from "./ci_coverage.component";
import CiCourses from "./ci_courses.component";
import CIacademics from "./ci_staff_members.component";

class CiHomePage extends React.Component {

    render() {
        console.log(sessionStorage.getItem("user"));
        if (JSON.parse(sessionStorage.getItem("user")).role!=="Course Instructor") {
            return (
                <div><br /><br /><br />Unauthorized Access</div>
            )
        }
        else {
            return (
                <div className="home-margin">
                    <div>
                        <h1>Welcome</h1>
                        <Link to={`${this.props.match.url}/course-coverage`}>Course Coverage</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to={`${this.props.match.url}/ci-courses`}>Courses</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to={`${this.props.match.url}/ci-staff`}>Staff</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to={`${this.props.match.url}/faculties`}>Faculties</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to={`${this.props.match.url}/departments`}>Departments</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to={`${this.props.match.url}/courses`}>Courses</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <br /><br />
                    </div>
                    <div>
                        <Route path={`${this.props.match.path}/course-coverage`}> <CIcoverage /> </Route>
                        <Route path={`${this.props.match.path}/ci-courses`}> <CiCourses /> </Route>
                        <Route path={`${this.props.match.path}/ci-staff`}> <CIacademics /> </Route>
                        <Route path={`${this.props.match.path}/faculties`}> <HRfaculty /> </Route>
                        <Route path={`${this.props.match.path}/departments`}> <HRdepartments /> </Route>
                        <Route path={`${this.props.match.path}/courses`}> <HRcourses /> </Route>
                    </div>
                </div>
            )
        }
    }
        }


export default withRouter(CiHomePage);