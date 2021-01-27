import React, { useState } from "react";
import { Redirect, Route, Switch, useLocation, useRouteMatch } from "react-router-dom";
import authTokenManager from "../../others/auth_token_manager";
import { useUserContext } from "../../contexts/user.context";
import Navbar from "../navigation_components/navbar.component";
import Sidebar from "../navigation_components/sidebar.component";
import HrHomePage from "./hr_home.component";
import HodHomePage from "./hod_home.component";
import CiHomePage from "./ci_home.component";
import CCHome from "./cc_home.component";
import TaHomePage from "./ta_home.component";

function StaffHome() {
	const [sidebarStyle, setSidebarStyle] = useState("");
	const [homeContainerStyle, setHomeContainerStyle] = useState("");
	const user = useUserContext();
	const match = useRouteMatch();
	const location = useLocation();


	if (!authTokenManager.getAuthAccessToken()) {
		return <Redirect to="/login" />;
	}

	if (!user.loggedIn && location.pathname !== `/staff/${user.rolePath}/reset-password`) {
		return <Redirect to={`/staff/${user.rolePath}/reset-password`} />;
	}

	return (
		<div className="main-container">
			<Navbar setSidebarStyle={setSidebarStyle} setHomeContainerStyle={setHomeContainerStyle} />
			<Sidebar sidebarStyle={sidebarStyle} />
			<Switch>
				<Route exact path={match.path}> <Redirect to={`${match.path}/${user.rolePath}`} /> </Route>
				<Route path={`${match.path}/hr`}> <HrHomePage homeContainerStyle={homeContainerStyle} /> </Route>
				<Route path={`${match.path}/hod`}> <HodHomePage homeContainerStyle={homeContainerStyle} /> </Route>
				<Route path={`${match.path}/ci`}> <CiHomePage homeContainerStyle={homeContainerStyle} /> </Route>
				<Route path={`${match.path}/cc`}> <CCHome homeContainerStyle={homeContainerStyle} /> </Route>
				<Route path={`${match.path}/ta`}> <TaHomePage homeContainerStyle={homeContainerStyle} /> </Route>
				<Route path={match.path}> <Redirect to="/404" /> </Route>
			</Switch>
		</div>
	);
}

export default StaffHome;