import jwt from "jsonwebtoken";
import axiosInstance from "./axios_instance";

const authTokenManager = () => {
	let authAccessToken;
	let decodedAuthAccessToken;
	let refreshTimeoutId;

	const refreshAccessToken = async () => {
		await axiosInstance({
			method: "post",
			url: "/staff/refresh-token"
		})
			.then(response => {
				setAuthAccessToken(response.headers["auth-access-token"]);
			})
			.catch(error => {
				if (error.response) {
					if (error.response.data === "Invalid refresh token") {
						console.log(error.response.data);
						dispatchEvent(new Event("timeout"));
						localStorage.setItem("timeout", Date.now());
					}
				}
				else if (error.request) {
					removeAuthAccessToken();
					console.log(error.request);
				}
				else {
					removeAuthAccessToken();
					console.log(error.message);
				}
			});
	};

	const initAuthAccessToken = async () => { await refreshAccessToken(); };

	const getAuthAccessToken = () => authAccessToken;

	const getDecodedAuthAccessToken = () => decodedAuthAccessToken;

	const setAuthAccessToken = accessToken => {
		authAccessToken = accessToken;
		decodedAuthAccessToken = jwt.decode(authAccessToken);
		const delay = new Date(1000 * decodedAuthAccessToken.exp - 5000) - new Date();
		refreshTimeoutId = setTimeout(refreshAccessToken, delay);
	};

	const removeAuthAccessToken = () => {
		authAccessToken = null;
		if (refreshTimeoutId) {
			clearTimeout(refreshTimeoutId);
		}
	};

	return {
		initAuthAccessToken,
		getAuthAccessToken,
		getDecodedAuthAccessToken,
		setAuthAccessToken,
		removeAuthAccessToken
	};
};

export default authTokenManager();