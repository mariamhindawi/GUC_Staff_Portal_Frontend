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
                    if (error.response.data === "Invalid refresh token") {
                        console.log(error.response.data);
                        localStorage.clear();
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
    }

    const initAuthAccessToken = async () => { await refreshAccessToken() }

    const getAuthAccessToken = () => authAccessToken;

    const setAuthAccessToken = accessToken => {
        authAccessToken = accessToken;
        const decodedToken = jwt.decode(authAccessToken);
        const delay = new Date(1000 * decodedToken.exp - 5000) - new Date();
        refreshTimeoutId = setTimeout(refreshAccessToken, delay);
        
        localStorage.userId = decodedToken.id;
        localStorage.userName = decodedToken.name;
        localStorage.userEmail = decodedToken.email;
        localStorage.userRole = decodedToken.role;
        switch (decodedToken.role) {
            case "HR": localStorage.userRolePath = "hr"; break;
            case "Head of Department": localStorage.userRolePath = "hod"; break;
            case "Course Instructor": localStorage.userRolePath = "ci"; break;
            case "Course Coordinator": localStorage.userRolePath = "cc"; break;
            case "Teaching Assistant": localStorage.userRolePath = "ta"; break;
            default: localStorage.userRolePath = "";
        }
    }

    const removeAuthAccessToken = () => {
        authAccessToken = null;
        if (refreshTimeoutId) {
            clearTimeout(refreshTimeoutId);
        }
    }

    return {
        initAuthAccessToken,
        getAuthAccessToken,
        setAuthAccessToken,
        removeAuthAccessToken
    }
}

export default authTokenManager();