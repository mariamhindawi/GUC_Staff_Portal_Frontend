import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import { useUserContext } from "../../../contexts/UserContext";
import HrHomeMain from "./HrHomeMain";
import Notifications from "../general_staff_components/Notifications";
import Profile from "../general_staff_components/Profile";
import ResetPassword from "../general_staff_components/ResetPassword";
import HrAttendance from "./hr_attendance_components/HrAttendance";
import HrHrMembers from "./hr_hrmembers_components/HrHrMembers";
import HrAcademics from "./hr_academics_components/HrAcademics";
import HrRooms from "./hr_rooms_components/HrRooms";
import HrFaculties from "./hr_faculty_components/HrFaculties";
import HrDepartments from "./hr_departments_components/HrDepartments";
import HrCourses from "./hr_courses_components/HrCourses";

function HrHome(props) {
  const user = useUserContext();
  const match = useRouteMatch();

  if (user.role !== "HR") {
    return <Redirect to="/403" />;
  }
  return (
    <div className={`home-container ${props.homeContainerStyle}`}>
      <Switch>
        <Route exact path={match.path}><HrHomeMain /></Route>
        <Route path={`${match.path}/notifications`}><Notifications /></Route>
        <Route path={`${match.path}/profile`}><Profile /></Route>
        <Route path={`${match.path}/reset-password`}><ResetPassword /></Route>
        <Route path={`${match.path}/hr-members`}><HrHrMembers /></Route>
        <Route path={`${match.path}/academic-members`}><HrAcademics /></Route>
        <Route path={`${match.path}/rooms`}><HrRooms /></Route>
        <Route path={`${match.path}/faculties`}><HrFaculties /></Route>
        <Route path={`${match.path}/departments`}><HrDepartments /></Route>
        <Route path={`${match.path}/courses`}><HrCourses /></Route>
        <Route path={`${match.path}/attendance`}><HrAttendance /></Route>
        <Route path={match.path}><Redirect to="/404" /></Route>
      </Switch>
    </div>
  );
}

HrHome.propTypes = {
  homeContainerStyle: PropTypes.string.isRequired,
};

export default HrHome;
