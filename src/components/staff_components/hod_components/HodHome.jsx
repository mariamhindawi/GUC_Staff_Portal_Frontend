import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import { useUserContext } from "../../../contexts/UserContext";
import GeneralRequests from "../../todo/GeneralRequestsPage.component";
import MySchedule from "../../todo/schedule.component";
import Attendance from "../general_staff_components/attendance_components/Attendance";
import Notifications from "../general_staff_components/Notifications";
import Profile from "../general_staff_components/Profile";
import ResetPassword from "../general_staff_components/ResetPassword";
import HodHomeMain from "./HodHomeMain";
import CIAcademicMembers from "../ci_components/CiAcademicMembers";
import CICourses from "../ci_components/CiCourses";

function HodHome(props) {
  const user = useUserContext();
  const match = useRouteMatch();

  if (user.role !== "Head of Department") {
    return <Redirect to="/403" />;
  }
  return (
    <div className={`home-container ${props.homeContainerStyle}`}>
      <Switch>
        <Route exact path={match.path}><HodHomeMain /></Route>
        <Route path={`${match.path}/notifications`}><Notifications /></Route>
        <Route path={`${match.path}/profile`}><Profile /></Route>
        <Route path={`${match.path}/reset-password`}><ResetPassword /></Route>
        <Route path={`${match.path}/attendance`}><Attendance /></Route>
        <Route path={`${match.path}/requests`}><GeneralRequests /></Route>
        <Route path={`${match.path}/schedule`}><MySchedule /></Route>
        <Route path={`${match.path}/courses`}><CICourses /></Route>
        <Route path={`${match.path}/academic-members`}><CIAcademicMembers /></Route>
        <Route path={match.path}><Redirect to="/404" /></Route>
      </Switch>
    </div>
  );
}

HodHome.propTypes = {
  homeContainerStyle: PropTypes.string.isRequired,
};
export default HodHome;
