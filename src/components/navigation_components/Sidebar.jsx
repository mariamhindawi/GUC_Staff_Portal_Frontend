import React from "react";
import PropTypes from "prop-types";
import { Link, useRouteMatch } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUserContext } from "../../contexts/UserContext";

function Sidebar(props) {
  const user = useUserContext();
  const match = useRouteMatch();

  return (
    <div className={`sidebar ${props.sidebarStyle}`}>

      {user.role === "HR" ? (
        <>
          <Link className="sidebar-link" to={`${match.url}/${user.rolePath}/attendance`}>
            <FontAwesomeIcon className="sidebar-icon" icon="clipboard-list" />
            Attendance
          </Link>
          <Link className="sidebar-link" to={`${match.url}/${user.rolePath}/hr-members`}>
            <FontAwesomeIcon className="sidebar-icon" icon="user-tie" />
            HR Members
          </Link>
          <Link className="sidebar-link" to={`${match.url}/${user.rolePath}/academic-members`}>
            <FontAwesomeIcon className="sidebar-icon" icon="user-graduate" />
            Academic Members
          </Link>
          <Link className="sidebar-link" to={`${match.url}/${user.rolePath}/rooms`}>
            <FontAwesomeIcon className="sidebar-icon" icon="building" />
            Rooms
          </Link>
          <Link className="sidebar-link" to={`${match.url}/${user.rolePath}/faculties`}>
            <FontAwesomeIcon className="sidebar-icon" icon="table" />
            Faculties
          </Link>
          <Link className="sidebar-link" to={`${match.url}/${user.rolePath}/departments`}>
            <FontAwesomeIcon className="sidebar-icon" icon="sitemap" />
            Departments
          </Link>
          <Link className="sidebar-link" to={`${match.url}/${user.rolePath}/courses`}>
            <FontAwesomeIcon className="sidebar-icon" icon="book" />
            Courses
          </Link>
        </>
      ) : null}

      {user.role !== "HR" ? (
        <>
          <Link className="sidebar-link" to={`${match.url}/${user.rolePath}/my-attendance`}>
            <FontAwesomeIcon className="sidebar-icon" icon="clipboard-list" />
            <span className="icon-text">Attendance</span>
          </Link>
          <Link className="sidebar-link" to={`${match.url}/${user.rolePath}/requests`}>
            <FontAwesomeIcon className="sidebar-icon" icon="list" />
            <span className="icon-text">Requests</span>
          </Link>
          <Link className="sidebar-link" to={`${match.url}/${user.rolePath}/schedule`}>
            <FontAwesomeIcon className="sidebar-icon" icon="calendar-alt" />
            <span className="icon-text">Schedule</span>
          </Link>
        </>
      ) : null}

      {user.role === "Head of Department" ? (
        <>
          <Link className="sidebar-link" to={`${match.url}/${user.rolePath}/hod-courses`}>
            <FontAwesomeIcon className="sidebar-icon" icon="book" />
            <span className="icon-text">Courses</span>
          </Link>
          <Link className="sidebar-link" to={`${match.url}/${user.rolePath}/hod-academic-members`}>
            <FontAwesomeIcon className="sidebar-icon" icon="user-tie" />
            <span className="icon-text">Academic members</span>
          </Link>
        </>
      ) : null}

      {user.role === "Course Instructor" ? (
        <>
          <Link className="sidebar-link" to={`${match.url}/${user.rolePath}/courses`}>
            <FontAwesomeIcon className="sidebar-icon" icon="book" />
            <span className="icon-text">Courses</span>
          </Link>
          <Link className="sidebar-link" to={`${match.url}/${user.rolePath}/academic-members`}>
            <FontAwesomeIcon className="sidebar-icon" icon="user-tie" />
            <span className="icon-text">Academic members</span>
          </Link>
        </>
      ) : null}

      {user.role === "Course Coordinator" ? (
        <>
          <Link className="sidebar-link" to={`${match.url}/${user.rolePath}/courses`}>
            <FontAwesomeIcon className="sidebar-icon" icon="book" />
            <span className="icon-text">Courses</span>
          </Link>
        </>
      ) : null}
    </div>
  );
}

Sidebar.propTypes = {
  sidebarStyle: PropTypes.string.isRequired,
};

export default Sidebar;
