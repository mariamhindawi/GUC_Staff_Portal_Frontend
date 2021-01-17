import React, { useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import jwt from "jsonwebtoken";

const Sidebar = (props) => {
        const [barsVisibility, setBarsVisibility] = useState("show");
        const [timesVisibility, setTimesVisibility] = useState("hide");
        const [sidebarOpen, setSidebarOpen] = useState("");
        const match = useRouteMatch();
        const token = jwt.decode(sessionStorage.token);

        const openSidebar = () => {
                setSidebarOpen("sidebar-open");
                setBarsVisibility("hide");
                setTimesVisibility("show");
        }

        const closeSidebar = () => {
                setSidebarOpen("");
                setBarsVisibility("show");
                setTimesVisibility("hide");
        }

        return (
                <div className={`sidebar ${sidebarOpen}`} onMouseOver={openSidebar} onMouseLeave={closeSidebar}>
                        <span className={`nav-icon text-white toggle ${barsVisibility}`}>
                                <FontAwesomeIcon icon="bars" onClick={openSidebar} />
                        </span>
                        <span className={`nav-icon text-white toggle ${timesVisibility}`}>
                                <FontAwesomeIcon icon="times" onClick={closeSidebar} />
                        </span>

                        {token.role === "HR" ? <>
                                <Link to={`${match.url}/academic-members`}>
                                        <FontAwesomeIcon className="sidebar-icon" icon="user" />
                                        <span className="icon-text">Academics</span>
                                </Link>
                                <Link to={`${match.url}/hr-members`}>
                                        <FontAwesomeIcon className="sidebar-icon" icon="user" />
                                        <span className="icon-text">HR Members</span>
                                </Link>
                                <Link to={`${match.url}/courses`}>
                                        <FontAwesomeIcon className="sidebar-icon" icon="user" />
                                        <span className="icon-text">Courses</span>
                                </Link>
                                <Link to={`${match.url}/departments`}>
                                        <FontAwesomeIcon className="sidebar-icon" icon="user" />
                                        <span className="icon-text">Departments</span>
                                </Link>
                                <Link to={`${match.url}/faculties`}>
                                        <FontAwesomeIcon className="sidebar-icon" icon="user" />
                                        <span className="icon-text">Faculties</span>
                                </Link>
                                <Link to={`${match.url}/rooms`}>
                                        <FontAwesomeIcon className="sidebar-icon" icon="user" />
                                        <span className="icon-text">Rooms</span>
                                </Link>
                                <Link to={`${match.url}/attendance-records`}>
                                        <FontAwesomeIcon className="sidebar-icon" icon="user" />
                                        <span className="icon-text">Attendance Records</span>
                                </Link>
                        </> : <></>}

                        {token.role !== "HR" ? <>
                                <Link to={`${match.url}/requests`}>
                                        <FontAwesomeIcon className="sidebar-icon" icon="user" />
                                        <span className="icon-text">Requests</span>
                                </Link>
                                <Link to={`${match.url}/schedule`}>
                                        <FontAwesomeIcon className="sidebar-icon" icon="user" />
                                        <span className="icon-text">Schedule</span>
                                </Link>
                        </> : <></>}

                        {token.role === "Head of Department" ? <>
                                <Link to={`${match.url}/hod-courses`}>
                                        <FontAwesomeIcon className="sidebar-icon" icon="user" />
                                        <span className="icon-text">Courses</span>
                                </Link>
                                <Link to={`${match.url}/hod-staff-members`}>
                                        <FontAwesomeIcon className="sidebar-icon" icon="user" />
                                        <span className="icon-text">Staff members</span>
                                </Link>
                        </> : <></>}

                        {token.role === "Course Instructor" ? <>
                                <Link to={`${match.url}/ci-courses`}>
                                        <FontAwesomeIcon className="sidebar-icon" icon="user" />
                                        <span className="icon-text">Courses</span>
                                </Link>
                                <Link to={`${match.url}/staff`}>
                                        <FontAwesomeIcon className="sidebar-icon" icon="user" />
                                        <span className="icon-text">Staff members</span>
                                </Link>
                        </> : <></>}

                        {token.role === "Course Coordinator" ? <>
                                <Link to={`${match.url}/course-slots`}>
                                        <FontAwesomeIcon className="sidebar-icon" icon="user" />
                                        <span className="icon-text">Course Slots</span>
                                </Link>
                        </> : <></>}
                </div>
        )
}

export default Sidebar;