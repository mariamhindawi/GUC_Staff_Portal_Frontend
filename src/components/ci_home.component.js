import React from "react";
import { Route, Link, withRouter } from "react-router-dom";
import HrRooms from "./hr_rooms.component";
import HrAcademics from "./hr_academics.component";
import HrHrMembers from "./hr_hrmembers.component";
import HrFaculty from "./hr_faculty.component";
import HrDepartments from "./hr_departments.component";
import HRcourses from "./hr_courses.component";
import CIcoverage from "./ci_coverage.component";

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
                        <Link to={`${this.props.match.url}/academic-members`}>Academic Members</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to={`${this.props.match.url}/hr-members`}>Hr Members</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to={`${this.props.match.url}/faculties`}>Faculties</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to={`${this.props.match.url}/departments`}>Departments</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to={`${this.props.match.url}/courses`}>Courses</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <br /><br />
                    </div>
                    <div>
                        <Route path={`${this.props.match.path}/course-coverage`}> <CIcoverage /> </Route>
                        <Route path={`${this.props.match.path}/academic-members`}> <HrAcademics /> </Route>
                        <Route path={`${this.props.match.path}/hr-members`}> <HrHrMembers /> </Route>
                        <Route path={`${this.props.match.path}/faculties`}> <HrFaculty /> </Route>
                        <Route path={`${this.props.match.path}/departments`}> <HrDepartments /> </Route>
                        <Route path={`${this.props.match.path}/courses`}> <HRcourses /> </Route>
                    </div>
                </div>
            )
        }
    }
        }


export default withRouter(CiHomePage);