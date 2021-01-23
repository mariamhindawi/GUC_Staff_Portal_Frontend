import React from "react";
import axios from "axios";
import axiosInstance from "../../others/axios_instance";

const HrHomeMain = () => {
    const axiosCancelSource = axios.CancelToken.source();

    const handleRefresh = async () => {
        await axiosInstance({
            method: "post",
            url: "/staff/refresh-token",
            cancelToken: axiosCancelSource.token
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                if (axios.isCancel(error)) {
                    console.log(`Request cancelled: ${error.message}`);
                }
                else {
                    if (error.response) {
                        setErrorMessage(error.response.data);
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
    }

    return (
        <div>
            <h1>Welcome</h1>
            <button onClick={handleRefresh}>Refresh token</button>
        </div>
    );
}

export default HrHomeMain;