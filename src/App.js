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


	const initAuthToken = async () => {
		setLoading(true);
		await authTokenManager.initAuthAccessToken();
		const authAccessToken = authTokenManager.getAuthAccessToken();
		if (authAccessToken) {
			initUser();
		}
		setLoading(false);
	};
	useEffect(initAuthToken, []);

	const setupEventListeners = () => {
		addEventListener("login", handleLogin);
		addEventListener("session-timeout", handleTimeout);
		addEventListener("storage", syncTabs);
		return () => {
			removeEventListener("login", handleLogin);
			removeEventListener("session-timeout", handleTimeout);
			removeEventListener("storage", syncTabs);
		};
	};
	useEffect(setupEventListeners, []);

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

	const handleLogin = () => {
		initUser();
		history.push("/staff");
	};

	const handleTimeout = () => {
		alert("Session expired. Please sign in again");
		authTokenManager.removeAuthAccessToken();
		history.push("/login");
	};

	const syncTabs = async event => {
		if (event.key === "login") {
			// alert("Session expired. Please sign in again");
			await initAuthToken();
			history.push("/staff");
		}
		else if (event.key === "reset-password") {
			// alert("Session expired. Please sign in again");
			authTokenManager.removeAuthAccessToken();
			history.push("/");
		}
		else if (event.key === "logout") {
			// alert("Logged out");
			authTokenManager.removeAuthAccessToken();
			history.push("/");
		}
		else if (event.key === "session-timeout") {
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