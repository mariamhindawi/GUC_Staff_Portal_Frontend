import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUserContext } from "../../contexts/user.context";

function Sidebar(props) {
	const user = useUserContext();
	const match = useRouteMatch();

	return (
		<div className={`sidebar ${props.sidebarStyle}`}>

			{user.role === "HR" ? <>
				<Link className="sidebar-link" to={`${match.url}/${user.rolePath}/academic-members`}>
					<FontAwesomeIcon className="sidebar-icon" icon="user" />Academics
                                </Link>
				<Link className="sidebar-link" to={`${match.url}/${user.rolePath}/hr-members`}>
					<FontAwesomeIcon className="sidebar-icon" icon="user" />HR Members
                                </Link>
				<Link className="sidebar-link" to={`${match.url}/${user.rolePath}/courses`}>
					<FontAwesomeIcon className="sidebar-icon" icon="user" />Courses
                                </Link>
				<Link className="sidebar-link" to={`${match.url}/${user.rolePath}/departments`}>
					<FontAwesomeIcon className="sidebar-icon" icon="user" />Departments
                                </Link>
				<Link className="sidebar-link" to={`${match.url}/${user.rolePath}/faculties`}>
					<FontAwesomeIcon className="sidebar-icon" icon="user" />Faculties
                                </Link>
				<Link className="sidebar-link" to={`${match.url}/${user.rolePath}/rooms`}>
					<FontAwesomeIcon className="sidebar-icon" icon="user" />Rooms
                                </Link>
				<Link className="sidebar-link" to={`${match.url}/${user.rolePath}/attendance-records`}>
					<FontAwesomeIcon className="sidebar-icon" icon="user" />Attendance Records
                                </Link>
			</> : null}

			{user.role !== "HR" ? <>
				<Link className="sidebar-link" to={`${match.url}/${user.rolePath}/requests`}>
					<FontAwesomeIcon className="sidebar-icon" icon="user" />
					<span className="icon-text">Requests</span>
				</Link>
				<Link className="sidebar-link" to={`${match.url}/${user.rolePath}/schedule`}>
					<FontAwesomeIcon className="sidebar-icon" icon="user" />
					<span className="icon-text">Schedule</span>
				</Link>
			</> : null}

			{user.role === "Head of Department" ? <>
				<Link className="sidebar-link" to={`${match.url}/${user.rolePath}/hod-courses`}>
					<FontAwesomeIcon className="sidebar-icon" icon="user" />
					<span className="icon-text">Courses</span>
				</Link>
				<Link className="sidebar-link" to={`${match.url}/${user.rolePath}/hod-staff-members`}>
					<FontAwesomeIcon className="sidebar-icon" icon="user" />
					<span className="icon-text">Staff members</span>
				</Link>
			</> : null}

			{user.role === "Course Instructor" ? <>
				<Link className="sidebar-link" to={`${match.url}/${user.rolePath}/ci-courses`}>
					<FontAwesomeIcon className="sidebar-icon" icon="user" />
					<span className="icon-text">Courses</span>
				</Link>
				<Link className="sidebar-link" to={`${match.url}/${user.rolePath}/staff`}>
					<FontAwesomeIcon className="sidebar-icon" icon="user" />
					<span className="icon-text">Staff members</span>
				</Link>
			</> : null}

			{user.role === "Course Coordinator" ? <>
				<Link className="sidebar-link" to={`${match.url}/${user.rolePath}/course-slots`}>
					<FontAwesomeIcon className="sidebar-icon" icon="user" />
					<span className="icon-text">Course Slots</span>
				</Link>
			</> : null}
		</div>
	);
}

export default Sidebar;