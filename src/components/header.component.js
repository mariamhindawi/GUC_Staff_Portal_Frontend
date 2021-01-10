import React from "react";
import {
    Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem,
    Button
} from "reactstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isNavOpen: false,
            isModalOpen: false
        };

        this.toggleNav = this.toggleNav.bind(this);
    }

    handleLogOut() {
        sessionStorage.removeItem("token");
    }   
    
    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }
    
    render() {
        return (
            <Navbar dark expand="md">
                <div className="container">
                    <NavbarToggler onClick={this.toggleNav} />
                    <NavbarBrand className="mr-auto" href="/"><img src="https://image.winudf.com/v2/image1/ZWcuZWR1Lmd1Y19pY29uXzE1NjcwMTM4NTVfMDc0/icon.png?w=170&fakeurl=1" height="40" width="40" alt='GUC Staff Portal' /></NavbarBrand>
                    <Collapse isOpen={this.state.isNavOpen} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink className="nav-link" to='/staff/profile'>
                                    <FontAwesomeIcon className="login-icon" icon="user"/>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to='/staff/requests'>
                                    Requests
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink className="nav-link" to="/login">
                                <Button outline onClick={this.handleLogOut}><span className="fa fa-sign-in fa-lg"></span> Log out</Button>
                            </NavLink>
                        </NavItem>
                    </Nav>
                </div>
            </Navbar>
        )
    }
}

export default Header;