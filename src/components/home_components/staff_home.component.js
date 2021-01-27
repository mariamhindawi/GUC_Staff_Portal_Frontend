import React, { useState } from "react";
import { Redirect, Route, Switch, useLocation, useRouteMatch } from "react-router-dom";
import authTokenManager from "../../others/auth_token_manager";
import HrHomePage from "./hr_home.component";
import HodHomePage from "./hod_home.component";
import CiHomePage from "./ci_home.component";
import CCHome from "./cc_home.component";
import TaHomePage from "./ta_home.component";

function StaffHome() {
	const [sidebarStyle, setSidebarStyle] = useState("");
	const [homeContainerStyle, setHomeContainerStyle] = useState("");
	const match = useRouteMatch();
	const location = useLocation();

	if (!authTokenManager.getAuthAccessToken()) {
		return <Redirect to="/login" />;
	}

	if (localStorage.userFirstLogin === "true"
		&& location.pathname !== `/staff/${localStorage.userRolePath}/reset-password`) {
		return <Redirect to={`/staff/${localStorage.userRolePath}/reset-password`} />;
	}

	return (
		<Switch>
			<Route exact path={match.path}> <Redirect to={`${match.path}/${localStorage.userRolePath}`} /> </Route>
			<Route path={`${match.path}/hr`}>
				<HrHomePage
					sidebarStyle={sidebarStyle} setSidebarStyle={setSidebarStyle}
					homeContainerStyle={homeContainerStyle} setHomeContainerStyle={setHomeContainerStyle} />
			</Route>
			<Route path={`${match.path}/hod`}> <HodHomePage /> </Route>
			<Route path={`${match.path}/ci`}> <CiHomePage /> </Route>
			<Route path={`${match.path}/cc`}> <CCHome /> </Route>
			<Route path={`${match.path}/ta`}> <TaHomePage /> </Route>
			<Route path={match.path}> <Redirect to="/404" /> </Route>
		</Switch>
	);
}

export default StaffHome;