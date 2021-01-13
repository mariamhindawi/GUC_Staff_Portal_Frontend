import React, { useState } from "react";
import {
    NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button
} from "reactstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Sidebar = (props) => { {
  
    return(
            <div className="sidebar">
            <a href="#"><span><FontAwesomeIcon className="sidebar-icon" icon="user"/><span className="icon-text">about</span></span></a><br></br>
            <a href="#"><span><FontAwesomeIcon className="sidebar-icon" icon="user"/><span className="icon-text">about</span></span></a><br></br>
            <a href="#"><span><FontAwesomeIcon className="sidebar-icon" icon="user"/><span className="icon-text">about</span></span></a><br></br>
            <a href="#"><span><FontAwesomeIcon className="sidebar-icon" icon="user"/><span className="icon-text">about</span></span></a><br></br>
            <a href="#"><span><FontAwesomeIcon className="sidebar-icon" icon="user"/><span className="icon-text">about</span></span></a><br></br>
            
        </div>
        )}
}


export default Sidebar;