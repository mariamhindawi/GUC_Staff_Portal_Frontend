import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import jwt from "jsonwebtoken";
import authTokenManager from "../../others/auth_token_manager";

const Sidebar = (props) => {
        const match = useRouteMatch();
        const authAccessToken = jwt.decode(authTokenManager.getAuthAccessToken());

        return (
                <div className={`sidebar ${props.sidebarStyle}`}>

                        {authAccessToken.role === "HR" ? <>
                                <Link className="sidebar-link" to={`${match.url}/academic-members`}>
                                        <FontAwesomeIcon className="sidebar-icon" icon="user" />Academics
                                </Link>
                                <Link className="sidebar-link" to={`${match.url}/hr-members`}>
                                        <FontAwesomeIcon className="sidebar-icon" icon="user" />HR Members
                                </Link>
                                <Link className="sidebar-link" to={`${match.url}/courses`}>
                                        <FontAwesomeIcon className="sidebar-icon" icon="user" />Courses
                                </Link>
                                <Link className="sidebar-link" to={`${match.url}/departments`}>
                                        <FontAwesomeIcon className="sidebar-icon" icon="user" />Departments
                                </Link>
                                <Link className="sidebar-link" to={`${match.url}/faculties`}>
                                        <FontAwesomeIcon className="sidebar-icon" icon="user" />Faculties
                                </Link>
                                <Link className="sidebar-link" to={`${match.url}/rooms`}>
                                        <FontAwesomeIcon className="sidebar-icon" icon="user" />Rooms
                                </Link>
                                <Link className="sidebar-link" to={`${match.url}/attendance-records`}>
                                        <FontAwesomeIcon className="sidebar-icon" icon="user" />Attendance Records
                                </Link>
                        </> : null}

                        {authAccessToken.role !== "HR" ? <>
                                <Link to={`${match.url}/requests`}>
                                        <FontAwesomeIcon className="sidebar-icon" icon="user" />
                                        <span className="icon-text">Requests</span>
                                </Link>
                                <Link to={`${match.url}/schedule`}>
                                        <FontAwesomeIcon className="sidebar-icon" icon="user" />
                                        <span className="icon-text">Schedule</span>
                                </Link>
                        </> : null}

                        {authAccessToken.role === "Head of Department" ? <>
                                <Link to={`${match.url}/hod-courses`}>
                                        <FontAwesomeIcon className="sidebar-icon" icon="user" />
                                        <span className="icon-text">Courses</span>
                                </Link>
                                <Link to={`${match.url}/hod-staff-members`}>
                                        <FontAwesomeIcon className="sidebar-icon" icon="user" />
                                        <span className="icon-text">Staff members</span>
                                </Link>
                        </> : null}

                        {authAccessToken.role === "Course Instructor" ? <>
                                <Link to={`${match.url}/ci-courses`}>
                                        <FontAwesomeIcon className="sidebar-icon" icon="user" />
                                        <span className="icon-text">Courses</span>
                                </Link>
                                <Link to={`${match.url}/staff`}>
                                        <FontAwesomeIcon className="sidebar-icon" icon="user" />
                                        <span className="icon-text">Staff members</span>
                                </Link>
                        </> : null}

                        {authAccessToken.role === "Course Coordinator" ? <>
                                <Link to={`${match.url}/course-slots`}>
                                        <FontAwesomeIcon className="sidebar-icon" icon="user" />
                                        <span className="icon-text">Course Slots</span>
                                </Link>
                        </> : null}
                </div>
        )
}

export default Sidebar;