import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import { useUserContext } from "../../../contexts/UserContext";
import HodHomeMain from "./HodHomeMain";
import Notifications from "../academic_components/Notifications";
import Profile from "../general_staff_components/Profile";
import ResetPassword from "../general_staff_components/ResetPassword";
import Attendance from "../general_staff_components/attendance_components/Attendance";
import Schedule from "../../todo/schedule.component";
import GeneralRequests from "../general_staff_components/request_components/GeneralRequestsPage";
import Courses from "../academic_components/Courses";
import AcademicMembers from "../academic_components/AcademicMembers";
import CiAssignSlot from "../../todo/CI_assignSlots.component";
import HODViewAssignments from "../../todo/HOD_ViewTeachingAssignments.component";

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
        <Route path={`${match.path}/schedule`}><Schedule /></Route>
        <Route path={`${match.path}/requests`}><GeneralRequests /></Route>
        <Route path={`${match.path}/courses`}><Courses /></Route>
        <Route path={`${match.path}/academic-members`}><AcademicMembers /></Route>
        <Route path={`${match.path}/assign-slot`}><CiAssignSlot /></Route>
        <Route path={`${match.path}/hod-assignments`}><HODViewAssignments /></Route>
        <Route path={match.path}><Redirect to="/404" /></Route>
      </Switch>
    </div>
  );
}

HodHome.propTypes = {
  homeContainerStyle: PropTypes.string.isRequired,
};
export default HodHome;
