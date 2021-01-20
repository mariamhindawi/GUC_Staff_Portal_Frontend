import React, { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import jwt from "jsonwebtoken";
import axios from "axios";
import axiosInstance from "../../others/axios_instance";
import { Nav, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../../images/guc_logo.png";
import Notifications from "../notifications.component";

const CustomNavbar = (props) => {
    const [sidebarToggleOpen, setSidebarToggleOpen] = useState(false);
    const [barsStyle, setBarsStyle] = useState("d-inline");
    const [timesStyle, setTimesStyle] = useState("d-none");
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [userInfoOpen, setUserInfoOpen] = useState(false);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const match = useRouteMatch();
    const axiosCancelSource = axios.CancelToken.source();

    const setLayoutStyles = () => {
        if (window.innerWidth >= 1200) {
            if (!sidebarToggleOpen) {
                props.setSidebarStyle("sidebar-collapsed");
                props.setHomeContainerStyle("home-container-sidebar-collapsed");
                setBarsStyle("d-inline");
                setTimesStyle("d-none");
            }
            else {
                props.setSidebarStyle("sidebar-expanded");
                props.setHomeContainerStyle("home-container-sidebar-expanded");
                setBarsStyle("d-none");
                setTimesStyle("d-inline");
            }
        }
        else if (window.innerWidth >= 768 && window.innerWidth < 1200) {
            if (!sidebarToggleOpen) {
                props.setSidebarStyle("sidebar-collapsed");
                props.setHomeContainerStyle("home-container-sidebar-collapsed");
                setBarsStyle("d-inline");
                setTimesStyle("d-none");
            }
            else {
                props.setSidebarStyle("sidebar-expanded");
                props.setHomeContainerStyle("home-container-sidebar-collapsed");
                setBarsStyle("d-none");
                setTimesStyle("d-inline");
            }
        }
        else if (window.innerWidth < 768) {
            if (!sidebarToggleOpen) {
                props.setSidebarStyle("sidebar-none");
                props.setHomeContainerStyle("home-container-nosidebar");
                setBarsStyle("d-inline");
                setTimesStyle("d-none");
            }
            else {
                props.setSidebarStyle("sidebar-expanded");
                props.setHomeContainerStyle("home-container-nosidebar");
                setBarsStyle("d-none");
                setTimesStyle("d-inline");
            }
        }
    }
    useEffect(setLayoutStyles, [sidebarToggleOpen]);

    const componentDidMount = () => {
        window.addEventListener("resize", setLayoutStyles);

        const token = jwt.decode(sessionStorage.token);
        setUserName(token.name);
        setUserEmail(token.email);

        axiosInstance.get("/fe/academic/notifications", {
            cancelToken: axiosCancelSource.token,
            headers: {
                token: sessionStorage.token
            }
        })
            .then(res => {
                setNotifications(res.data);
            });

        return () => {
            window.removeEventListener("resize", setLayoutStyles);
            axiosCancelSource.cancel("Operation canceled by the user");
        }
    }
    useEffect(componentDidMount, []);

    const handleLogOut = () => {
        sessionStorage.removeItem("token");
    };

    const toggleSidebar = () => setSidebarToggleOpen(prevState => !prevState);

    const toggleNotifications = () => setNotificationsOpen(prevState => !prevState);

    const toggleUserInfo = () => setUserInfoOpen(prevState => !prevState);

    return (
        <div className="d-flex justify-content-between navbar-staff-portal">
            <Nav>
                <NavItem className={`nav-link navbar-link sidebar-toggle ${barsStyle}`}>
                    <FontAwesomeIcon className="sidebar-toggle-icon" icon="bars" onClick={toggleSidebar} />
                </NavItem>
                <NavItem className={`nav-link navbar-link sidebar-toggle ${timesStyle}`}>
                    <FontAwesomeIcon className="sidebar-toggle-icon" icon="times" onClick={toggleSidebar} />
                </NavItem>
                <img className="navbar-logo" src={Logo} alt="GUC logo"></img>
            </Nav>
            <Nav>
                <NavItem>
                    <Link className="nav-link navbar-link" to={match.path}>
                        <FontAwesomeIcon className="navbar-icon" icon="home" />
                    </Link>
                </NavItem>
                <UncontrolledDropdown isOpen={notificationsOpen} toggle={toggleNotifications} nav inNavbar>
                    <DropdownToggle className="navbar-link" nav>
                        <FontAwesomeIcon className="navbar-icon" icon="bell" />
                    </DropdownToggle>
                    <DropdownMenu className="navbar-dropdown-menu" right>
                        <DropdownItem disabled>
                            <Notifications notifications={notifications.slice(0, 4)} />
                        </DropdownItem>
                        <Link to={`${match.path}/notifications`} className="navbar-dropdown-link">
                            <DropdownItem className="navbar-dropdown-button"><FontAwesomeIcon icon="envelope" />&nbsp;&nbsp;View all notifications</DropdownItem>
                        </Link>
                    </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown isOpen={userInfoOpen} toggle={toggleUserInfo} nav inNavbar>
                    <DropdownToggle className="navbar-link" nav>
                        <FontAwesomeIcon className="navbar-icon" icon="user" />
                    </DropdownToggle>
                    <DropdownMenu className="navbar-dropdown-menu" right>
                        <span className="d-flex justify-content-center">
                            <label className="dropdown-user-initial">
                                {userName.charAt(0).toUpperCase()}
                            </label>
                        </span>
                        <span className="d-flex justify-content-center dropdown-user-name">{userName}</span>
                        <span className="d-flex justify-content-center dropdown-user-email">{userEmail}</span>
                        <DropdownItem divider />
                        <Link to={`${match.path}/profile`} className="navbar-dropdown-link">
                            <DropdownItem className="navbar-dropdown-button"><FontAwesomeIcon icon="address-card" />&nbsp;&nbsp;View Profile</DropdownItem>
                        </Link>
                        <DropdownItem divider />
                        <Link to={`${match.path}/reset-password`} className="navbar-dropdown-link">
                            <DropdownItem className="navbar-dropdown-button"><FontAwesomeIcon icon="key" />&nbsp;&nbsp;Reset Password</DropdownItem>
                        </Link>
                        <DropdownItem divider />
                        <Link to="/" onClick={handleLogOut} className="navbar-dropdown-link">
                            <DropdownItem className="navbar-dropdown-button"><FontAwesomeIcon icon="sign-out-alt" />&nbsp;&nbsp;Log out</DropdownItem>
                        </Link>
                    </DropdownMenu>
                </UncontrolledDropdown >
            </Nav>
        </div>
    );
}

export default CustomNavbar;