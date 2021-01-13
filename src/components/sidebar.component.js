import React, { useState } from "react";
import {
    NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button
} from "reactstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Sidebar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            showSidebar : false
        };
    }
render(){
    return (
        <div style={{ width: `${this.state.showSidebar ? '170px' : '58px'}` }} className="sidebar" onMouseOver={()=>    this.setState({showSidebar : true})} onMouseOut={()=>this.setState({showSidebar : false})}>
        <a href="#"><span><FontAwesomeIcon className="sidebar-icon" icon="user"/><span className="icon-text">about</span></span></a><br></br>
        <a href="#"><span><FontAwesomeIcon className="sidebar-icon" icon="user"/><span className="icon-text">about</span></span></a><br></br>
        <a href="#"><span><FontAwesomeIcon className="sidebar-icon" icon="user"/><span className="icon-text">about</span></span></a><br></br>
        <a href="#"><span><FontAwesomeIcon className="sidebar-icon" icon="user"/><span className="icon-text">about</span></span></a><br></br>
        <a href="#"><span><FontAwesomeIcon className="sidebar-icon" icon="user"/><span className="icon-text">about</span></span></a><br></br>
        
      </div>
    )
}
}

export default Sidebar;