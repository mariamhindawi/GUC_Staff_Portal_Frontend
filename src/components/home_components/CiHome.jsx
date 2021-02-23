import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import ForbiddenAccess from "../error_components/ForbiddenAccess";
import Attendance from "../general_staff_components/Attendance";
import Notifications from "../general_staff_components/Notifications";
import Profile from "../general_staff_components/Profile";
import ResetPassword from "../general_staff_components/ResetPassword";
import CiCourses from "../todo/ci_courses.component";
import CIacademics from "../todo/ci_staff_members.component";
import CICourseSlots from "../todo/CI_viewCoursesSlots.component"
import CIAssignSlots from "../todo/CI_assignSlots.component";
import GeneralRequests from "../todo/GeneralRequestsPage.component";
import CIcoverage from "../todo/ci_coverage.component";
import CiHomeMain from "../ci_components/CiHomeMain";
import MySchedule from "../todo/schedule.component";

function CiHome(props) {
  const user = useUserContext();
  const match = useRouteMatch();

  if (user.role !== "Course Instructor") {
    return <ForbiddenAccess />;
  }
  return (
    <div className={`home-container ${props.homeContainerStyle}`}>
      <Switch>
        <Route exact path={match.path}><CiHomeMain /></Route>
        <Route path={`${match.path}/notifications`}><Notifications /></Route>
        <Route path={`${match.path}/profile`}><Profile /></Route>
        <Route path={`${match.path}/reset-password`}><ResetPassword /></Route>
        <Route path={`${match.path}/my-attendance`}><Attendance /></Route>
        <Route path={`${match.path}/requests`}><GeneralRequests /></Route>
        <Route path={`${match.path}/schedule`}><MySchedule /></Route>
        <Route path={`${match.path}/courses-details`}><CiCourses /></Route>
        <Route path={`${match.path}/slot-assignments`}><CICourseSlots /></Route>
        <Route path={`${match.path}/slot-assignments`}><CICourseSlots /></Route>
        <Route path={`${match.path}/assign-slots`}><CIAssignSlots /></Route>
        <Route path={`${match.path}/staff`}><CIacademics /></Route>
        <Route path={match.path}><Redirect to="/404" /></Route>
      </Switch>
    </div>
  );
}

CiHome.propTypes = {
  homeContainerStyle: PropTypes.string.isRequired,
};
export default CiHome;
