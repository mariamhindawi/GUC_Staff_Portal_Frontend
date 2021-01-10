import React, { useState } from 'react';
import {
   NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from "reactstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../logo192.png";


const handleLogOut=()=> {
    sessionStorage.removeItem("token");

}


const Header = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    
        
        return (
            <div className="d-flex flex-row justify-content-between navbar-border navbar-staff-portal">
                <ul className="nav">
                    <NavItem  className="nav-item"> 
                        <a className="nav-link text-white">  <img id="navbar-logo"src={Logo} height="20" width="20" alt='GUC Staff Portal'></img> &nbsp; GUC Staff Portal</a>
                    </NavItem>
                </ul>
                <ul className="nav">
                    <NavItem>
                        <NavLink className="nav-link" to='/'>
                        <span className="active nav-icon text-white" href="#" ><FontAwesomeIcon icon="home"/></span>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="nav-link" to="/">
                        <span className="active nav-icon text-white" href="#" ><FontAwesomeIcon icon="bell"/></span>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <UncontrolledDropdown  isOpen={dropdownOpen} toggle={toggle}>
                            <DropdownToggle nav>
                                <span className="active nav-icon dropdown-toggle text-white" href="#" ><FontAwesomeIcon icon="user"/></span>
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem header>User Name</DropdownItem>
                                <DropdownItem href="/staff/profile">View Profile</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem  href="/"><span onClick={handleLogOut}><FontAwesomeIcon icon="sign-out-alt"/> &nbsp; Log out</span></DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown >

  
                    </NavItem>
                </ul>
           </div>
        )
    }


export default Header;