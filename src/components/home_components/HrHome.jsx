import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import HrHomeMain from "../hr_components/HrHomeMain";
import Notifications from "../general_staff_components/Notifications";
import Profile from "../general_staff_components/Profile";
import ResetPassword from "../general_staff_components/ResetPassword";
import HrAcademics from "../hr_components/hr_academics_components/HrAcademics";
import HrHrMembers from "../hr_components/hr_hrmembers.component";
import HrCourses from "../hr_components/hr_courses.component";
import HrDepartments from "../hr_components/hr_departments.component";
import HrFaculty from "../hr_components/hr_faculty.component";
import HrRooms from "../hr_components/hr_rooms.component";
import AddMissingHours from "../hr_components/hr_attendance_records.component";
import ForbiddenAccess from "../error_components/ForbiddenAccess";

function HrHome(props) {
  const user = useUserContext();
  const match = useRouteMatch();

  if (user.role !== "HR") {
    return <ForbiddenAccess />;
  }
  return (
    <div className={`home-container ${props.homeContainerStyle}`}>
      <Switch>
        <Route exact path={match.path}><HrHomeMain /></Route>
        <Route path={`${match.path}/notifications`}><Notifications /></Route>
        <Route path={`${match.path}/profile`}><Profile /></Route>
        <Route path={`${match.path}/reset-password`}><ResetPassword /></Route>
        <Route path={`${match.path}/academic-members`}><HrAcademics /></Route>
        <Route path={`${match.path}/hr-members`}><HrHrMembers /></Route>
        <Route path={`${match.path}/faculties`}><HrFaculty /></Route>
        <Route path={`${match.path}/departments`}><HrDepartments /></Route>
        <Route path={`${match.path}/courses`}><HrCourses /></Route>
        <Route path={`${match.path}/rooms`}><HrRooms /></Route>
        <Route path={`${match.path}/attendance-records`}><AddMissingHours /></Route>
        <Route path={match.path}><Redirect to="/404" /></Route>
      </Switch>
    </div>
  );
}

HrHome.propTypes = {
  homeContainerStyle: PropTypes.string.isRequired,
};

export default HrHome;
