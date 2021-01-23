import React from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
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
import authTokenManager from "../../others/auth_token_manager";
import HrHomeMain from "../helper_components/hr_home_main.component";

const HrHomePage = (props) => {
    const match = useRouteMatch();
    const authAccessToken = jwt.decode(authTokenManager.getAuthAccessToken());
    
    if (authAccessToken.role !== "HR") {
        return <div>Unauthorized Access</div>;
    }

    return (
        <div className="main-container">
            <Navbar setSidebarStyle={props.setSidebarStyle} setHomeContainerStyle={props.setHomeContainerStyle} />
            <Sidebar sidebarStyle={props.sidebarStyle} />
            <div className={`home-container ${props.homeContainerStyle}`}>
                <Switch>
                    <Route exact path={match.path}> <HrHomeMain /> </Route>
                    <Route path={`${match.path}/notifications`}> <div>Notifications</div> </Route>
                    <Route path={`${match.path}/profile`}> <Profile /> </Route>
                    <Route path={`${match.path}/reset-password`}> <div>Reset password</div> </Route>
                    <Route path={`${match.path}/academic-members`}> <HrAcademics /> </Route>
                    <Route path={`${match.path}/hr-members`}> <HrHrMembers /> </Route>
                    <Route path={`${match.path}/faculties`}> <HrFaculty /> </Route>
                    <Route path={`${match.path}/departments`}> <HrDepartments /> </Route>
                    <Route path={`${match.path}/courses`}> <HrCourses /> </Route>
                    <Route path={`${match.path}/rooms`}> <HrRooms /> </Route>
                    <Route path={`${match.path}/attendance-records`}> <AddMissingHours /> </Route>
                    <Route path={match.path}> <Redirect to="/404" /> </Route>
                </Switch>
            </div>
        </div>
    )
}

export default HrHomePage;