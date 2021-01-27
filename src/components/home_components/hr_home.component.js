import React from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import Navbar from "../navigation_components/navbar.component";
import Sidebar from "../navigation_components/sidebar.component";
import HrHomeMain from "../hr_components/hr_home_main.component";
import Notifications from "../general_staff_components/notifications.component";
import Profile from "../general_staff_components/profile.component";
import ResetPassword from "../general_staff_components/reset_password.component";
import HrAcademics from "../hr_components/hr_academics.component";
import HrHrMembers from "../hr_components/hr_hrmembers.component";
import HrCourses from "../hr_components/hr_courses.component";
import HrDepartments from "../hr_components/hr_departments.component";
import HrFaculty from "../hr_components/hr_faculty.component";
import HrRooms from "../hr_components/hr_rooms.component";
import AddMissingHours from "../hr_components/hr_attendance_records.component";
import ForbiddenAccess from "../error_components/forbidden_access.component";

function HrHomePage(props) {
	const match = useRouteMatch();

	if (localStorage.userRole !== "HR") {
		return <ForbiddenAccess />;
	}

	return (
		<div className="main-container">
			<Navbar setSidebarStyle={props.setSidebarStyle} setHomeContainerStyle={props.setHomeContainerStyle} />
			<Sidebar sidebarStyle={props.sidebarStyle} />
			<div className={`home-container ${props.homeContainerStyle}`}>
				<Switch>
					<Route exact path={match.path}> <HrHomeMain /> </Route>
					<Route path={`${match.path}/notifications`}> <Notifications /> </Route>
					<Route path={`${match.path}/profile`}> <Profile /> </Route>
					<Route path={`${match.path}/reset-password`}> <ResetPassword /> </Route>
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
	);
}

export default HrHomePage;