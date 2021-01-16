import React from "react";
import { Route, Link, withRouter } from "react-router-dom";
import HrRooms from "./hr_rooms.component";
import HrAcademics from "./hr_academics.component";
import HrHrMembers from "./hr_hrmembers.component";
import HrFaculty from "./hr_faculty.component";
import HrDepartments from "./hr_departments.component";
import HRcourses from "./hr_courses.component";
import jwt from "jsonwebtoken";


class TaHomePage extends React.Component {

    render() {
       
        const token = jwt.decode(sessionStorage.token);
        if (token.role !== "Teaching Assistant") {
            return (
                <div>Unauthorized Access</div>
            )
        }
            return (
                <div className="home-margin">
                    <div>
                        <h1>Welcome</h1>
                        <Link to={`${this.props.match.url}/rooms`}>Rooms</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to={`${this.props.match.url}/academic-members`}>Academic Members</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to={`${this.props.match.url}/hr-members`}>Hr Members</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to={`${this.props.match.url}/faculties`}>Faculties</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to={`${this.props.match.url}/departments`}>Departments</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to={`${this.props.match.url}/courses`}>Courses</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <br /><br />
                    </div>
                    <div>
                        <Route path={`${this.props.match.path}/rooms`}> <HrRooms /> </Route>
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


export default withRouter(TaHomePage);