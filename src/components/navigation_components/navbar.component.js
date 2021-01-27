import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { Nav, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import axiosInstance from "../../others/axios_instance";
import errorMessages from "../../others/error_messages";
import Logo from "../../images/guc_logo.png";
import authTokenManager from "../../others/auth_token_manager";
import { useUserContext } from "../../contexts/user.context";
import Notifications from "../general_staff_components/notifications.component";

function Navbar(props) {
	const [sidebarToggleOpen, setSidebarToggleOpen] = useState(false);
	const [barsToggleStyle, setBarsToggleStyle] = useState("d-inline");
	const [timesToggleStyle, setTimesToggleStyle] = useState("d-none");
	const [notificationsOpen, setNotificationsOpen] = useState(false);
	const [notifications, setNotifications] = useState([]);
	const [userInfoOpen, setUserInfoOpen] = useState(false);
	const [userName, setUserName] = useState("");
	const [userEmail, setUserEmail] = useState("");
	const user = useUserContext();
	const match = useRouteMatch();
	const history = useHistory();
	const axiosCancelSource = axios.CancelToken.source();


	const userInfoEffect = () => {
		setUserName(user.name);
		setUserEmail(user.email);
	};
	useEffect(userInfoEffect, []);

	const notificationsEffect = () => {
		axiosInstance({
			method: "get",
			url: "/fe/academic/notifications",
			cancelToken: axiosCancelSource.token,
			headers: {
				"auth-access-token": authTokenManager.getAuthAccessToken()
			}
		})
			.then(res => {
				setNotifications(res.data);
			})
			.catch(error => {
				if (axios.isCancel(error)) {
					console.log(`Request cancelled: ${error.message}`);
				}
				else {
					if (error.response) {
						console.log(error.response);
					}
					else if (error.request) {
						console.log(error.request);
					}
					else {
						console.log(error.message);
					}
				}
			});

		return () => { axiosCancelSource.cancel(errorMessages.requestCancellation); };
	};
	useEffect(notificationsEffect, []);

	const resizeEventListenerEffect = () => {
		addEventListener("resize", setLayoutStyles);
		return () => { removeEventListener("resize", setLayoutStyles); };
	};
	useEffect(resizeEventListenerEffect, []);

	const setLayoutStyles = () => {
		if (innerWidth >= 1200) {
			if (!sidebarToggleOpen) {
				props.setSidebarStyle("sidebar-collapsed");
				props.setHomeContainerStyle("home-container-sidebar-collapsed");
				setBarsToggleStyle("d-inline");
				setTimesToggleStyle("d-none");
			}
			else {
				props.setSidebarStyle("sidebar-expanded");
				props.setHomeContainerStyle("home-container-sidebar-expanded");
				setBarsToggleStyle("d-none");
				setTimesToggleStyle("d-inline");
			}
		}
		else if (innerWidth >= 768 && innerWidth < 1200) {
			if (!sidebarToggleOpen) {
				props.setSidebarStyle("sidebar-collapsed");
				props.setHomeContainerStyle("home-container-sidebar-collapsed");
				setBarsToggleStyle("d-inline");
				setTimesToggleStyle("d-none");
			}
			else {
				props.setSidebarStyle("sidebar-expanded");
				props.setHomeContainerStyle("home-container-sidebar-collapsed");
				setBarsToggleStyle("d-none");
				setTimesToggleStyle("d-inline");
			}
		}
		else if (innerWidth < 768) {
			if (!sidebarToggleOpen) {
				props.setSidebarStyle("sidebar-none");
				props.setHomeContainerStyle("home-container-nosidebar");
				setBarsToggleStyle("d-inline");
				setTimesToggleStyle("d-none");
			}
			else {
				props.setSidebarStyle("sidebar-expanded");
				props.setHomeContainerStyle("home-container-nosidebar");
				setBarsToggleStyle("d-none");
				setTimesToggleStyle("d-inline");
			}
		}
	};
	useLayoutEffect(setLayoutStyles, [sidebarToggleOpen]);

	const handleLogOut = async () => {
		await axiosInstance({
			method: "post",
			url: "/staff/logout",
			cancelToken: axiosCancelSource.token,
			headers: {
				"auth-access-token": authTokenManager.getAuthAccessToken()
			}
		})
			.then(response => {
				// TODO: display message??
				alert(response.data);
				authTokenManager.removeAuthAccessToken();
				localStorage.setItem("logout", Date.now());
				history.push("/");
			})
			.catch(error => {
				if (axios.isCancel(error)) {
					console.log(`Request cancelled: ${error.message}`);
				}
				else {
					if (error.response) {
						console.log(error.response);
					}
					else if (error.request) {
						console.log(error.request);
					}
					else {
						console.log(error.message);
					}
				}
			});
	};

	const toggleSidebar = () => setSidebarToggleOpen(prevState => !prevState);

	const toggleNotifications = () => setNotificationsOpen(prevState => !prevState);

	const toggleUserInfo = () => setUserInfoOpen(prevState => !prevState);


	return (
		<div className="d-flex justify-content-between navbar-staff-portal">
			<Nav>
				<NavItem className={`nav-link navbar-link sidebar-toggle ${barsToggleStyle}`}>
					<FontAwesomeIcon className="sidebar-toggle-icon" icon="bars" onClick={toggleSidebar} />
				</NavItem>
				<NavItem className={`nav-link navbar-link sidebar-toggle ${timesToggleStyle}`}>
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
						<Link className="navbar-dropdown-link" to={`${match.path}/${user.rolePath}/notifications`}>
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
						<Link className="navbar-dropdown-link" to={`${match.path}/${user.rolePath}/profile`}>
							<DropdownItem className="navbar-dropdown-button"><FontAwesomeIcon icon="address-card" />&nbsp;&nbsp;View Profile</DropdownItem>
						</Link>
						<DropdownItem divider />
						<Link className="navbar-dropdown-link" to={`${match.path}/${user.rolePath}/reset-password`}>
							<DropdownItem className="navbar-dropdown-button"><FontAwesomeIcon icon="key" />&nbsp;&nbsp;Reset Password</DropdownItem>
						</Link>
						<DropdownItem divider />
						<span className="navbar-dropdown-link" onClick={handleLogOut}>
							<DropdownItem className="navbar-dropdown-button"><FontAwesomeIcon icon="sign-out-alt" />&nbsp;&nbsp;Log out</DropdownItem>
						</span>
					</DropdownMenu>
				</UncontrolledDropdown>
			</Nav>
		</div>
	);
}

export default Navbar;