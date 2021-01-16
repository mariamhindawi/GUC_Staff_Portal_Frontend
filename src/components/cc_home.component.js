import React from "react";
import { Route, Link, withRouter } from "react-router-dom";
import HrRooms from "./hr_rooms.component";
import HrAcademics from "./hr_academics.component";
import HrHrMembers from "./hr_hrmembers.component";
import HrFaculty from "./hr_faculty.component";
import HrDepartments from "./hr_departments.component";
import HRcourses from "./hr_courses.component";
import jwt from "jsonwebtoken"
import Sidebar from "./sidebar.component";
import CourseSlotForm from "./course_slot_form.component";
import GeneralRequests from "./GeneralRequestsPage.component";
import MySchedule from "./schedule.component";

class CCHome extends React.Component {

    render() {
        const token = jwt.decode(sessionStorage.token);
        if (token.role !== "Course Coordinator") {
            return (
                <div>Unauthorized Access</div>
            )
        }
        return (
            <div className="home-margin">
                <div>
                    <h1>Welcome</h1>
                    <Link to={`${this.props.match.url}/rooms`}>Rooms</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to={`${this.props.match.url}/academic-members`}>Academic Members</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to={`${this.props.match.url}/hr-members`}>Hr Members</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to={`${this.props.match.url}/faculties`}>Faculties</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to={`${this.props.match.url}/departments`}>Departments</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to={`${this.props.match.url}/courses`}>Courses</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <br /><br />
                </div>
                <div>
                    <Route path={`${this.props.match.path}`}> <Sidebar /> </Route>
                    <Route path={`${this.props.match.path}/requests`}> <GeneralRequests /> </Route>
                    <Route path={`${this.props.match.path}/schedule`}> <MySchedule /> </Route>
                    <Route path={`${this.props.match.path}/course-slots`}> <CourseSlotForm /> </Route>
                </div>
            </div>
        )
    }

}

export default withRouter(CCHome);