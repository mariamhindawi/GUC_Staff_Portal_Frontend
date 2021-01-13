import React, { useEffect, useState } from "react";
import {
    NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Popover, PopoverHeader, PopoverBody
} from "reactstrap";
import { NavLink } from "react-router-dom";
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
    const togglePopOver = () => setPopoverOpen(!popoverOpen);

    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        Axios.get('/fe/academic/notifications', {
            headers: {
                token: sessionStorage.token
            }
        }).then(res => { console.log(res.data); setNotifications(res.data) })
    }, [])

    return (
        <div className="d-flex flex-row justify-content-between navbar-border navbar-staff-portal">
            <ul className="nav">
                <NavItem className="nav-item">
                    <a className="nav-link text-white">  <img id="navbar-logo" src={Logo} height="20" width="20" alt="GUC Staff Portal"></img> &nbsp; GUC Staff Portal</a>
                </NavItem>
            </ul>
            <ul className="nav">
                <NavItem>
                    <NavLink className="nav-link" to="/">
                        <span className="active nav-icon text-white" href="#" ><FontAwesomeIcon icon="home" /></span>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <Button id="Popover1" type="button" className="bg-transparent">
                        <span className="active nav-icon text-white" href="#" ><FontAwesomeIcon icon={"bell"} /></span>
                    </Button>
                    <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={togglePopOver}>
                        <PopoverHeader>Notifications</PopoverHeader>
                        <PopoverBody>
                            <NotificationComponent notifications={notifications.slice(0, 4)} />
                            <NavLink to="/staff/home/notifications">
                                <Button>
                                    View all notifications
                                </Button>
                            </NavLink>
                        </PopoverBody>
                    </Popover>
                </NavItem>
                <NavItem>
                    <UncontrolledDropdown isOpen={dropdownOpen} toggle={toggle}>
                        <DropdownToggle nav>
                            <span className="active nav-icon dropdown-toggle text-white" href="#" ><FontAwesomeIcon icon="user" /></span>
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem header>User Name</DropdownItem>
                            <DropdownItem href="/staff/profile">View Profile</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem href="/login"><span onClick={handleLogOut}><FontAwesomeIcon icon="sign-out-alt" /> &nbsp; Log out</span></DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown >
                </NavItem>
            </ul>
        </div>
    )
}


export default Header;