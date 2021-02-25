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

      <Link className="sidebar-link" to={`${match.url}/${user.rolePath}/attendance`}>
        <FontAwesomeIcon className="sidebar-icon" icon="clipboard-list" />
        Attendance
      </Link>

      {user.role === "HR" && (
        <>
          <Link className="sidebar-link" to={`${match.url}/${user.rolePath}/staff-attendance`}>
            <FontAwesomeIcon className="sidebar-icon" icon="address-book" />
            Staff Attendance
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
      )}

      {user.role !== "HR" && (
        <>
          <Link className="sidebar-link" to={`${match.url}/${user.rolePath}/requests`}>
            <FontAwesomeIcon className="sidebar-icon" icon="list" />
            <span className="icon-text">Requests</span>
          </Link>
          <Link className="sidebar-link" to={`${match.url}/${user.rolePath}/schedule`}>
            <FontAwesomeIcon className="sidebar-icon" icon="calendar-alt" />
            <span className="icon-text">Schedule</span>
          </Link>
        </>
      )}

      {(user.role === "Course Instructor" || user.role === "Head of Department") && (
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
      )}

      {user.role === "Head of Department" && (
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
      )}

      {user.role === "Course Coordinator" && (
        <>
          <Link className="sidebar-link" to={`${match.url}/${user.rolePath}/courses`}>
            <FontAwesomeIcon className="sidebar-icon" icon="book" />
            <span className="icon-text">Courses</span>
          </Link>
        </>
      )}
    </div>
  );
}

Sidebar.propTypes = {
  sidebarStyle: PropTypes.string.isRequired,
};

export default Sidebar;
