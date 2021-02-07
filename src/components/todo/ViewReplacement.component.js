import React, { useEffect, useState } from "react"
import { Spinner } from "reactstrap";
import Axios from "../../others/AxiosInstance"
import RequestsTable from "./requestsTable.component"

const ViewReplacementComponent = (props) => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState([]);

    useEffect(() => {
        Axios.get("/academic/replacement-requests", {
            "headers": {
                "auth-access-token": authTokenManager.getAuthAccessToken()
            }
        }
        ).then((res) => { console.log(res.data);setRequests(res.data.forMe); setLoading(false) }).catch(error => alert(error))
    }, [])
    const acceptRequest = id => {
        Axios(`/academic/replacement-requests/${id}/accept`, {
            method: "put",
            "headers": {
                "auth-access-token": authTokenManager.getAuthAccessToken()
            }
        }).then(res => console.log("Request " + res.data.id + " accepted")).then(() => Axios.get("/academic/replacement-requests", {
            "headers": {
                "auth-access-token": authTokenManager.getAuthAccessToken()
            }
        }
        ).then((res) => { setRequests(res.data.forMe); setLoading(false) })).catch(error => alert(error))
    }

    const rejectRequest = id => {
        Axios(`/academic/replacement-requests/${id}/reject`, {
            method: "put",
            "headers": {
                "auth-access-token": authTokenManager.getAuthAccessToken()
            }
        }).then(res => console.log("Request " + res.data.id + " accepted")).then(() => Axios.get("/academic/replacement-requests", {
            "headers": {
                "auth-access-token": authTokenManager.getAuthAccessToken()
            }
        }
        ).then((res) => { setRequests(res.data.forMe); setLoading(false) })).catch(error => alert(error))
    }
    if (loading) {
        return <div className="container">
            <div className="row">
                <div className="offset-5">
                    <Spinner color="primary" />
                </div>
            </div>
        </div>
    }
    else {
        return (<div className="container">
            <div className="row">
                <RequestsTable requests={requests} acceptRequest={acceptRequest} rejectRequest={rejectRequest} />
            </div>
        </div>
        )
    }
}

export default ViewReplacementComponent;