import React, { useEffect, useLayoutEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useRouteMatch } from "react-router-dom";
import { Nav, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import AxiosInstance from "../../others/AxiosInstance";
import AuthTokenManager from "../../others/AuthTokenManager";
import useAxiosCancel from "../../hooks/AxiosCancel";
import Logo from "../../images/guc_logo.png";
import { useUserContext } from "../../contexts/UserContext";
import Notifications from "../staff_components/general_staff_components/Notifications";

function Navbar(props) {
  const [sidebarIsOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const user = useUserContext();
  const match = useRouteMatch();
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

  const setLayout = () => {
    if (window.innerWidth >= 1200) {
      if (!sidebarIsOpen) {
        props.setSidebarStyle("sidebar-collapsed");
        props.setHomeContainerStyle("home-container-sidebar-collapsed");
      }
      else {
        props.setSidebarStyle("sidebar-expanded");
        props.setHomeContainerStyle("home-container-sidebar-expanded");
      }
    }
    else if (window.innerWidth >= 768) {
      if (!sidebarIsOpen) {
        props.setSidebarStyle("sidebar-collapsed");
        props.setHomeContainerStyle("home-container-sidebar-collapsed");
      }
      else {
        props.setSidebarStyle("sidebar-expanded");
        props.setHomeContainerStyle("home-container-sidebar-collapsed");
      }
    }
    else if (window.innerWidth < 768) {
      if (!sidebarIsOpen) {
        props.setSidebarStyle("sidebar-none");
        props.setHomeContainerStyle("home-container-nosidebar");
      }
      else {
        props.setSidebarStyle("sidebar-expanded");
        props.setHomeContainerStyle("home-container-nosidebar");
      }
    }
  };
  const setupEventListeners = () => {
    window.addEventListener("resize", setLayout);
    return () => { window.removeEventListener("resize", setLayout); };
  };
  const fetchNotifications = () => {
    AxiosInstance({
      method: "get",
      url: "/staff/fe/academic/notifications",
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    })
      .then(res => {
        setNotifications(res.data);
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(error.message);
        }
        else if (error.response) {
          console.log(error.response);
        }
        else if (error.request) {
          console.log(error.request);
        }
        else {
          console.log(error.message);
        }
      });
  };
  useLayoutEffect(setLayout, [sidebarIsOpen]);
  useEffect(setupEventListeners, [sidebarIsOpen]);
  useEffect(fetchNotifications, []);

  const handleLogOut = async () => {
    await AxiosInstance({
      method: "post",
      url: "/staff/logout",
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    })
      .then(() => {
        window.dispatchEvent(new Event("logout"));
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(error.message);
        }
        else if (error.response) {
          console.log(error.response);
        }
        else if (error.request) {
          console.log(error.request);
        }
        else {
          console.log(error.message);
        }
      });
  };
  const toggleSidebar = () => setSidebarOpen(prevState => !prevState);

  return (
    <div className="navbar-staff-portal">
      <Nav>
        <Nav.Link className="navbar-item sidebar-toggle" as="button" onClick={toggleSidebar}>
          <FontAwesomeIcon className={`sidebar-toggle-icon ${sidebarIsOpen ? "d-none" : "d-inline"}`} icon="bars" />
          <FontAwesomeIcon className={`sidebar-toggle-icon ${sidebarIsOpen ? "d-inline" : "d-none"}`} icon="times" />
        </Nav.Link>
        <img className="navbar-logo" src={Logo} alt="GUC logo" />
      </Nav>
      <Nav>
        <Nav.Link className="navbar-item" as={Link} to={match.path}>
          <FontAwesomeIcon className="navbar-icon" icon="home" />
        </Nav.Link>
        <Dropdown>
          <Dropdown.Toggle className="nav-link navbar-item" as="button">
            <FontAwesomeIcon className="navbar-icon" icon="bell" />
          </Dropdown.Toggle>
          <Dropdown.Menu className="navbar-dropdown-menu" align="right">
            <Dropdown.Item className="dropdown-notifications" as="span" tabIndex={0}>
              {
                notifications.length !== 0
                  ? <Notifications notifications={notifications.slice(0, 4)} />
                  : "No Notifications"
              }
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item className="navbar-dropdown-link" as={Link} to={`${match.path}/${user.rolePath}/notifications`}>
              <FontAwesomeIcon icon="envelope" />
              &nbsp;&nbsp;View all notifications
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown>
          <Dropdown.Toggle className="nav-link navbar-item" as="button">
            <FontAwesomeIcon className="navbar-icon" icon="user" />
          </Dropdown.Toggle>
          <Dropdown.Menu className="navbar-dropdown-menu" align="right">
            <span className="d-flex justify-content-center">
              <label className="dropdown-user-initial">
                {user.name.charAt(0).toUpperCase()}
              </label>
            </span>
            <span className="d-flex justify-content-center dropdown-user-name">
              {user.name}
            </span>
            <span className="d-flex justify-content-center dropdown-user-email">
              {user.email}
            </span>
            <Dropdown.Divider />
            <Dropdown.Item className="navbar-dropdown-link" as={Link} to={`${match.path}/${user.rolePath}/profile`}>
              <FontAwesomeIcon icon="address-card" />
              &nbsp;&nbsp;View Profile
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item className="navbar-dropdown-link" as={Link} to={`${match.path}/${user.rolePath}/reset-password`}>
              <FontAwesomeIcon icon="key" />
              &nbsp;&nbsp;Reset Password
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item className="navbar-dropdown-link" as="button" onClick={handleLogOut}>
              <FontAwesomeIcon icon="sign-out-alt" />
              &nbsp;&nbsp;Log out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
    </div>
  );
}

Navbar.propTypes = {
  setHomeContainerStyle: PropTypes.func.isRequired,
  setSidebarStyle: PropTypes.func.isRequired,
};

export default Navbar;
