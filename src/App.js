import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-social/bootstrap-social.css";
import "./css/App.css";
import "./others/fontawesome_icons";
import authTokenManager from "./others/auth_token_manager";
import LoginForm from "./components/form_components/login_form.component";
import StaffHome from "./components/home_components/staff_home.component";
import PageNotFound from "./components/error_components/page_not_found.component";

function App() {
	const [loading, setLoading] = useState(true);
	const history = useHistory();

	const initAccessToken = async () => {
		await authTokenManager.initAuthAccessToken();
		setLoading(false);
	};
	useEffect(() => { initAccessToken(); }, []);


	const syncTimeout = () => {
		// TODO: display message??
		alert("Session expired. Please sign in again");
		authTokenManager.removeAuthAccessToken();
		history.push("/");
	};

	const syncTabs = event => {
		if (event.key === "logout") {
			// TODO: display message??
			// alert("Logged out");
			authTokenManager.removeAuthAccessToken();
			history.push("/");
		}
		else if (event.key === "timeout") {
			// TODO: display message??
			// alert("Session expired. Please sign in again");
			authTokenManager.removeAuthAccessToken();
			history.push("/");
		}
	};

	const eventListnersEffect = () => {
		addEventListener("timeout", syncTimeout);
		addEventListener("storage", syncTabs);
		return () => {
			removeEventListener("timeout", syncTimeout);
			removeEventListener("storage", syncTabs);
		};
	};
	useEffect(eventListnersEffect, []);


	if (loading) {
		return <div></div>;
	}

	return (
		<Switch>
			<Route exact path="/"> <Redirect to={authTokenManager.getAuthAccessToken() ? "/staff" : "/login"} /> </Route>
			<Route exact path="/login"> <LoginForm /> </Route>
			<Route path="/staff"> <StaffHome /> </Route>
			<Route exact path="/404"> <PageNotFound /> </Route>
			<Route path="/"> <Redirect to="/404" /> </Route>
		</Switch>
	);
}

export default App;