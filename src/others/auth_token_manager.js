
const authTokenManager = () => {
    let authAccessToken = sessionStorage.authAccessToken;

    const getAuthAccessToken = () => authAccessToken;

    const setAuthAccessToken = accessToken => {
        authAccessToken = accessToken;
        window.sessionStorage.setItem("authAccessToken", authAccessToken);
    };

    const removeAuthAccessToken = () => {
        authAccessToken = null;
        window.sessionStorage.removeItem("authAccessToken");
    };

    return {
        getAuthAccessToken,
        setAuthAccessToken,
        removeAuthAccessToken
    }
}

export default authTokenManager();