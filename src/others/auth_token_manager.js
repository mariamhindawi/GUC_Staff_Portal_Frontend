import jwt from "jsonwebtoken";
import axiosInstance from "./axios_instance";

const authTokenManager = () => {
    let authAccessToken = null;
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
                    console.log(error.response);
                }
                else if (error.request) {
                    console.log(error.request);
                }
                else {
                    console.log(error.message);
                }
                removeAuthAccessToken();
            });
    }

    const initAuthAccessToken = async () => { await refreshAccessToken() }

    const getAuthAccessToken = () => authAccessToken;

    const setAuthAccessToken = accessToken => {
        authAccessToken = accessToken;
        const decodedToken = jwt.decode(authAccessToken);
        const delay = new Date(1000 * decodedToken.exp - 5000) - new Date();
        refreshTimeoutId = window.setTimeout(refreshAccessToken, delay);
        console.log(`New access token ${JSON.stringify(decodedToken)}`);
        console.log(`Timer set for ${delay/1000} seconds from now`);
    };

    const removeAuthAccessToken = () => {
        authAccessToken = null;
        if (refreshTimeoutId) {
            window.clearTimeout(refreshTimeoutId);
        }
        window.localStorage.setItem("gucLogout", Date.now());
        console.log(`Timer cleared`);
    };

    return {
        initAuthAccessToken,
        getAuthAccessToken,
        setAuthAccessToken,
        removeAuthAccessToken
    }
}

export default authTokenManager();