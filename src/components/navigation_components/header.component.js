import React, { useEffect, useState } from "react";
import { Link, NavLink, useRouteMatch } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../others/axios_instance";
import { NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Logo from "../../images/guc_logo.png";
import Notifications from "../notifications.component";

const handleLogOut = () => {
    sessionStorage.removeItem("token");
}

const Header = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const match = useRouteMatch();
    const axiosCancelSource = axios.CancelToken.source();

    const toggle = () => setDropdownOpen(prevState => !prevState);
    const togglePopOver = () => setPopoverOpen(prevState => !prevState);

    const componentDidMount = () => {
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
            axiosCancelSource.cancel("Operation canceled by the user");
        }
    }
    useEffect(componentDidMount, [])

    return (
        <div className="d-flex flex-row justify-content-between navbar-staff-portal">
            <ul className="nav">
                <NavItem className="nav-item">
                    <span className="nav-link text-white">
                        <img id="navbar-logo" src={Logo} height="20" width="20" alt="GUC logo"></img>
                        &nbsp; GUC Staff Portal
                    </span>
                </NavItem>
            </ul>
            <ul className="nav">
                <NavItem>
                    <NavLink className="nav-link" to={match.path}>
                        <span className="nav-icon text-white"><FontAwesomeIcon icon="home" /></span>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <UncontrolledDropdown isOpen={dropdownOpen} toggle={toggle}>
                        <DropdownToggle nav>
                            <span id="Popover1" className="nav-icon text-white" ><FontAwesomeIcon icon="bell" /></span>
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem header className="d-flex justify-content-center">
                                <Notifications notifications={notifications.slice(0, 4)} />
                                <NavLink to={`${match.path}/notifications`}>
                                    <Button>
                                        View all notifications
                                    </Button>
                                </NavLink>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown >
                </NavItem>
                <NavItem>
                    <UncontrolledDropdown isOpen={popoverOpen} toggle={togglePopOver}>
                        <DropdownToggle nav>
                            <span className="nav-icon dropdown-toggle text-white" ><FontAwesomeIcon icon="user" /></span>
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem header className="d-flex justify-content-center">User Name</DropdownItem>
                            <div className="d-flex justify-content-center">
                                <Button className="rounded-circle">M</Button>
                            </div>
                            <br></br>
                            <DropdownItem divider />
                            <Link to={`${match.path}/profile`}>
                                <DropdownItem><FontAwesomeIcon icon="address-card" /> &nbsp; View Profile</DropdownItem>
                            </Link>
                            <DropdownItem divider />
                            <Link to={`${match.path}/reset-password`}>
                                <DropdownItem><FontAwesomeIcon icon="key" /> &nbsp; Reset Password</DropdownItem>
                            </Link>
                            <DropdownItem divider />
                            <Link to="/" onClick={handleLogOut}>
                                <DropdownItem><FontAwesomeIcon icon="sign-out-alt" /> &nbsp; Log out</DropdownItem>
                            </Link>
                        </DropdownMenu>
                    </UncontrolledDropdown >
                </NavItem>
            </ul>

        </div>
    );
}

export default Header;