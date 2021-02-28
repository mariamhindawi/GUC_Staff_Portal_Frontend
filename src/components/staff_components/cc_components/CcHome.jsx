import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import { useUserContext } from "../../../contexts/UserContext";
import Attendance from "../general_staff_components/attendance_components/Attendance";
import Notifications from "../general_staff_components/Notifications";
import Profile from "../general_staff_components/Profile";
import ResetPassword from "../general_staff_components/ResetPassword";
import GeneralRequests from "../general_staff_components/request_components/GeneralRequestsPage";
import MySchedule from "../../todo/schedule.component";
import CcHomeMain from "./CcHomeMain";
import CCAcademicMembers from "../ta_components/TaAcademicMembers";
import CCourses from "../ta_components/TaCourses";
import CCSlots from "./CcSlots";

function CcHome(props) {
  const user = useUserContext();
  const match = useRouteMatch();

  if (user.role !== "Course Coordinator") {
    return <Redirect to="/403" />;
  }
  return (
    <div className={`home-container ${props.homeContainerStyle}`}>
      <Switch>
        <Route exact path={match.path}><CcHomeMain /></Route>
        <Route path={`${match.path}/notifications`}><Notifications /></Route>
        <Route path={`${match.path}/profile`}><Profile /></Route>
        <Route path={`${match.path}/reset-password`}><ResetPassword /></Route>
        <Route path={`${match.path}/attendance`}><Attendance /></Route>
        <Route path={`${match.path}/requests`}><GeneralRequests /></Route>
        <Route path={`${match.path}/schedule`}><MySchedule /></Route>
        <Route path={`${match.path}/courses`}><CCourses /></Route>
        <Route path={`${match.path}/academic-members`}><CCAcademicMembers /></Route>
        <Route path={`${match.path}/slots`}><CCSlots /></Route>
        <Route path={match.path}><Redirect to="/404" /></Route>
      </Switch>
    </div>
  );
}

CcHome.propTypes = {
  homeContainerStyle: PropTypes.string.isRequired,
};
export default CcHome;
