import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-social/bootstrap-social.css";
import "./css/App.css";
import "./others/fontawesome_icons";
import authTokenManager from "./others/auth_token_manager";
import { useSetUserContext } from "./contexts/user.context";
import LoginForm from "./components/form_components/login_form.component";
import StaffHome from "./components/home_components/staff_home.component";
import PageNotFound from "./components/error_components/page_not_found.component";

function App() {
	const [loading, setLoading] = useState(true);
	const setUser = useSetUserContext();
	const history = useHistory();


	const initEffect = async () => {
		await authTokenManager.initAuthAccessToken();
		const authAccessToken = authTokenManager.getAuthAccessToken();
		if (authAccessToken) {
			initUser();
		}
		setLoading(false);
	};
	useEffect(initEffect, []);

	const eventListnersEffect = () => {
		addEventListener("login", login);
		addEventListener("timeout", syncTimeout);
		addEventListener("storage", syncTabs);
		return () => {
			removeEventListener("login", login);
			removeEventListener("timeout", syncTimeout);
			removeEventListener("storage", syncTabs);
		};
	};
	useEffect(eventListnersEffect, []);

	const initUser = () => {
		const decodedAuthAccessToken = authTokenManager.getDecodedAuthAccessToken();
		let rolePath;
		switch (decodedAuthAccessToken.role) {
			case "HR": rolePath = "hr"; break;
			case "Head of Department": rolePath = "hod"; break;
			case "Course Instructor": rolePath = "ci"; break;
			case "Course Coordinator": rolePath = "cc"; break;
			case "Teaching Assistant": rolePath = "ta"; break;
			default: rolePath = "";
		}
		const user = {
			id: decodedAuthAccessToken.id,
			name: decodedAuthAccessToken.name,
			email: decodedAuthAccessToken.email,
			role: decodedAuthAccessToken.role,
			rolePath: rolePath,
			loggedIn: decodedAuthAccessToken.loggedIn
		};
		setUser(user);
	};

	const login = () => {
		initUser();
		history.push("/staff");
	}

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