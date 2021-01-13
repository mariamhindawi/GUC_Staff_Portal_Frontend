import React, { useState } from "react";
import {
    NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button
} from "reactstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Sidebar = (props) => { {
    const [barStyle, setBarStyle] = useState("show");
    const [timesStyle, setTimesStyle] = useState("hide");
    const [toggleWidth, setWidth] = useState("sidebar-closed");
  
    return(
            <div className="sidebar" id={toggleWidth} onMouseOver={() =>{ setWidth("sidebar-open");}} onMouseLeave={() =>{setBarStyle("show"); 
                    setTimesStyle("hide"); setWidth("sidebar-closed");}}>
            <span className="nav-icon text-white toggle"id={barStyle} ><FontAwesomeIcon icon="bars" onClick={() =>{setTimesStyle("show");
                    setBarStyle("hide"); setWidth("sidebar-open");}} /></span>
            <span className="nav-icon text-white toggle"id={timesStyle} ><FontAwesomeIcon icon="times" onClick={() =>{setBarStyle("show"); 
                    setTimesStyle("hide"); setWidth("sidebar-closed");}} /></span>
            <a href="#"><span><FontAwesomeIcon className="sidebar-icon" icon="user"/><span className="icon-text">about</span></span></a><br></br>
            <a href="#"><span><FontAwesomeIcon className="sidebar-icon" icon="user"/><span className="icon-text">about</span></span></a><br></br>
            <a href="#"><span><FontAwesomeIcon className="sidebar-icon" icon="user"/><span className="icon-text">about</span></span></a><br></br>
            <a href="#"><span><FontAwesomeIcon className="sidebar-icon" icon="user"/><span className="icon-text">about</span></span></a><br></br>
            <a href="#"><span><FontAwesomeIcon className="sidebar-icon" icon="user"/><span className="icon-text">about</span></span></a><br></br>
            
        </div>
        )}
}


export default Sidebar;