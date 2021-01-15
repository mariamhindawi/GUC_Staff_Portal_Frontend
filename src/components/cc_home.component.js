import React from "react";
import { Route, Link, withRouter } from "react-router-dom";
import HrRooms from "./hr_rooms.component";
import HRacademics from "./hr_academics.component";
import HRhrmembers from "./hr_hrmembers.component";
import HRfaculty from "./hr_faculty.component";
import HRdepartments from "./hr_departments.component";
import HRcourses from "./hr_courses.component";

class CcHomePage extends React.Component {

    render() {
        console.log(sessionStorage.getItem("user"));
        if (JSON.parse(sessionStorage.getItem("user")).role!=="Course Coordinator") {
            return (
                <div><br /><br /><br />Unauthorized Access</div>
            )
        }
        else {
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
                        <Route path={`${this.props.match.path}/academic-members`}> <HRacademics /> </Route>
                        <Route path={`${this.props.match.path}/hr-members`}> <HRhrmembers /> </Route>
                        <Route path={`${this.props.match.path}/faculties`}> <HRfaculty /> </Route>
                        <Route path={`${this.props.match.path}/departments`}> <HRdepartments /> </Route>
                        <Route path={`${this.props.match.path}/courses`}> <HRcourses /> </Route>
                    </div>
                </div>
            )
        }
        
    }
}

export default withRouter(CcHomePage);