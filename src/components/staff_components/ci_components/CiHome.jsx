import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import { useUserContext } from "../../../contexts/UserContext";
import CiHomeMain from "./CiHomeMain";
import Notifications from "../general_staff_components/Notifications";
import Profile from "../general_staff_components/Profile";
import ResetPassword from "../general_staff_components/ResetPassword";
import Attendance from "../general_staff_components/attendance_components/Attendance";
import Schedule from "../../todo/schedule.component";
import Requests from "../../todo/GeneralRequestsPage.component";
import Courses from "../academic_components/Courses";
import AcademicMembers from "../academic_components/AcademicMembers";

function CiHome(props) {
  const user = useUserContext();
  const match = useRouteMatch();

  if (user.role !== "Course Instructor") {
    return <Redirect to="/403" />;
  }
  return (
    <div className={`home-container ${props.homeContainerStyle}`}>
      <Switch>
        <Route exact path={match.path}><CiHomeMain /></Route>
        <Route path={`${match.path}/notifications`}><Notifications /></Route>
        <Route path={`${match.path}/profile`}><Profile /></Route>
        <Route path={`${match.path}/reset-password`}><ResetPassword /></Route>
        <Route path={`${match.path}/attendance`}><Attendance /></Route>
        <Route path={`${match.path}/schedule`}><Schedule /></Route>
        <Route path={`${match.path}/requests`}><Requests /></Route>
        <Route path={`${match.path}/courses`}><Courses /></Route>
        <Route path={`${match.path}/academic-members`}><AcademicMembers /></Route>
        <Route path={match.path}><Redirect to="/404" /></Route>
      </Switch>
    </div>
  );
}

CiHome.propTypes = {
  homeContainerStyle: PropTypes.string.isRequired,
};
export default CiHome;
