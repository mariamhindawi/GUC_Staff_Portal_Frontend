import React, { useEffect, useState } from "react";
import {
    NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Popover, PopoverHeader, PopoverBody
} from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../logo192.png";
import NotificationComponent from "./notifications.component";
import Axios from "../axios";


const handleLogOut = () => {
    sessionStorage.removeItem("token");
}

const Header = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    const [popoverOpen, setPopoverOpen] = useState(false);
    const togglePopOver = () => setPopoverOpen(prevState => !prevState);

    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        Axios.get('/fe/academic/notifications', {
            headers: {
                token: sessionStorage.token
            }
        }).then(res => { setNotifications(res.data) })
    }, [])

    return (
        <div className="d-flex flex-row justify-content-between navbar-staff-portal">
            <ul className="nav">
                <NavItem className="nav-item">
                    <a className="nav-link text-white">  <img id="navbar-logo" src={Logo} height="20" width="20" alt="GUC Staff Portal"></img> &nbsp; GUC Staff Portal</a>
                </NavItem>
            </ul>
            <ul className="nav">
                <NavItem>
                    <NavLink className="nav-link" to="/">
                        <span className="nav-icon text-white" href="#" ><FontAwesomeIcon icon="home" /></span>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <UncontrolledDropdown isOpen={dropdownOpen} toggle={toggle}>
                        <DropdownToggle nav>
                            <span id="Popover1" className="nav-icon text-white" href="#" ><FontAwesomeIcon icon="bell" /></span>
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem header className="d-flex justify-content-center">
                            <NotificationComponent notifications={notifications.slice(0, 4)} />
                            <NavLink to="/staff/home/notifications">
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
                            <span className="nav-icon dropdown-toggle text-white" href="#" ><FontAwesomeIcon icon="user" /></span>
                        </DropdownToggle>
                        <DropdownMenu>
                        <DropdownItem header className="d-flex justify-content-center">User Name</DropdownItem>
                            <div className="d-flex justify-content-center">
                                <Button className="rounded-circle">M</Button>
                            </div>
                            <br></br>
                            <DropdownItem divider />
                            <Link to="/">
                                <DropdownItem><FontAwesomeIcon icon="address-card" /> &nbsp; View Profile</DropdownItem>
                            </Link>
                            <DropdownItem divider />
                            <Link to="/">
                                <DropdownItem><FontAwesomeIcon icon="key" /> &nbsp; Reset Password</DropdownItem>
                            </Link>
                            <DropdownItem divider />
                            <Link to="/login" onClick={handleLogOut}>
                                <DropdownItem><FontAwesomeIcon icon="sign-out-alt" /> &nbsp; Log out</DropdownItem>
                            </Link>
                            </DropdownMenu>
                    </UncontrolledDropdown >
                </NavItem>
            </ul>
        
        </div>
    )
}


export default Header;