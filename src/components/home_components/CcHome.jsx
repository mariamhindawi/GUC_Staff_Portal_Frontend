import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import ForbiddenAccess from "../error_components/ForbiddenAccess";
import Attendance from "../general_staff_components/Attendance";
import Notifications from "../general_staff_components/Notifications";
import Profile from "../general_staff_components/Profile";
import ResetPassword from "../general_staff_components/ResetPassword";
import CourseSlotForm from "../todo/course_slot_form.component";
import GeneralRequests from "../todo/GeneralRequestsPage.component";
import MySchedule from "../todo/schedule.component";
import CcHomeMain from "../cc_components/CcHomeMain";

function CcHome(props) {
  const user = useUserContext();
  const match = useRouteMatch();

  if (user.role !== "Course Coordinator") {
    return <ForbiddenAccess />;
  }
  return (
    <div className={`home-container ${props.homeContainerStyle}`}>
      <Switch>
        <Route exact path={match.path}><CcHomeMain /></Route>
        <Route path={`${match.path}/notifications`}><Notifications /></Route>
        <Route path={`${match.path}/profile`}><Profile /></Route>
        <Route path={`${match.path}/reset-password`}><ResetPassword /></Route>
        <Route path={`${match.path}/my-attendance`}><Attendance /></Route>
        <Route path={`${match.path}/requests`}><GeneralRequests /></Route>
        <Route path={`${match.path}/schedule`}><MySchedule /></Route>
        <Route path={`${match.path}/course-slots`}><CourseSlotForm /></Route>
        <Route path={match.path}><Redirect to="/404" /></Route>
      </Switch>
    </div>
  );
}

CcHome.propTypes = {
  homeContainerStyle: PropTypes.string.isRequired,
};
export default CcHome;
