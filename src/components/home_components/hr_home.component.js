import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import jwt from "jsonwebtoken";
import Navbar from "../navigation_components/navbar.component";
import Sidebar from "../navigation_components/sidebar.component";
import Profile from "../info_components/profile.component";
import HrAcademics from "../hr_components/hr_academics.component";
import HrHrMembers from "../hr_components/hr_hrmembers.component";
import HrCourses from "../hr_components/hr_courses.component";
import HrDepartments from "../hr_components/hr_departments.component";
import HrFaculty from "../hr_components/hr_faculty.component";
import HrRooms from "../hr_components/hr_rooms.component";
import AddMissingHours from "../hr_components/hr_attendance_records.component";

class HrHomePage extends React.Component {

    render() {
        const token = jwt.decode(sessionStorage.token);
        if (token.role !== "HR") {
            return (<div>Unauthorized Access</div>);
        }

        return (
            <div className="main-container">
                <Navbar setSidebarStyle={this.props.setSidebarStyle} setHomeContainerStyle={this.props.setHomeContainerStyle} />
                <Sidebar sidebarStyle={this.props.sidebarStyle} />
                <div className={`home-container ${this.props.homeContainerStyle}`}>
                    <Switch>
                        <Route exact path={this.props.match.path}> <h1>Welcome</h1> </Route>
                        <Route path={`${this.props.match.path}/notifications`}> <div>Notifications</div> </Route>
                        <Route path={`${this.props.match.path}/profile`}> <Profile /> </Route>
                        <Route path={`${this.props.match.path}/reset-password`}> <div>Reset password</div> </Route>
                        <Route path={`${this.props.match.path}/academic-members`}> <HrAcademics /> </Route>
                        <Route path={`${this.props.match.path}/hr-members`}> <HrHrMembers /> </Route>
                        <Route path={`${this.props.match.path}/faculties`}> <HrFaculty /> </Route>
                        <Route path={`${this.props.match.path}/departments`}> <HrDepartments /> </Route>
                        <Route path={`${this.props.match.path}/courses`}> <HrCourses /> </Route>
                        <Route path={`${this.props.match.path}/rooms`}> <HrRooms /> </Route>
                        <Route path={`${this.props.match.path}/attendance-records`}> <AddMissingHours /> </Route>
                        <Route path={this.props.match.path}> <div>Page Not Found</div> </Route>
                    </Switch>
                </div>
            </div>
        )
    }
}

export default withRouter(HrHomePage);