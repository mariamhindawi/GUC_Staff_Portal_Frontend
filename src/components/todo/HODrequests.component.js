import React, { useEffect, useState } from "react"
import { Button, Form, Input, Label, Modal, ModalBody, Spinner } from "reactstrap";
import Axios from "axios";
import AxiosInstance from "../../others/AxiosInstance";
import AuthTokenManager from "../../others/AuthTokenManager";
import RequestsTable from "./requestsTable.component"

const HODRequestsComponent = (props) => {
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [loading, setLoading] = useState([]);
    const [message, setMessage] = useState("")
    const [requestID, setRequestID] = useState(0)
    const [modal, setModal] = useState(false);
    const toggle = (reqID) => {setRequestID(reqID);setModal(!modal)};

    useEffect(() => {
        AxiosInstance.get("staff/hod/staff-requests", {
            "headers": {
                "auth-access-token": AuthTokenManager.getAuthAccessToken()
            }
        }
        ).then((res) => { console.log(res.data);setLeaveRequests(res.data); setLoading(false) }).catch(error => alert(error))
    }, [])
    const acceptRequest = id => {
        AxiosInstance(`staff/hod/staff-requests/${id}/accept`, {
            method: "put",
            "headers": {
                "auth-access-token": AuthTokenManager.getAuthAccessToken()
            }
        }).then(res => console.log("Request " + res.data.id + " accepted")).then(() => AxiosInstance.get("staff/hod/staff-requests", {
            "headers": {
                "auth-access-token": AuthTokenManager.getAuthAccessToken()
            }
        }
        ).then((res) => { setLeaveRequests(res.data); setLoading(false) })).catch(error => alert(error))
    }

    function handleChange(event) {
        event.preventDefault();
        setMessage(event.target.value)
    }
    function handleSubmit(event) {
        event.preventDefault();
        rejectRequest()
    }
    const rejectRequest = () => {
        toggle()
        AxiosInstance(`staff/hod/staff-requests/${requestID}/reject`, {
            method: "put",
            "headers": {
                "auth-access-token": AuthTokenManager.getAuthAccessToken()
            },
            data: {
                HODComment: message
            }
        }).then(res => console.log("Request " + res.data.id + " rejected")).then(() => AxiosInstance.get("staff/hod/staff-requests", {
            "headers": {
                "auth-access-token": AuthTokenManager.getAuthAccessToken()
            }
        }
        ).then((res) => { setLeaveRequests(res.data); setLoading(false) })).catch(error => alert(error))
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
                <RequestsTable requests={leaveRequests} acceptRequest={acceptRequest} rejectRequest={toggle} />
                <Modal toggle={toggle} isOpen={modal}>
                    <ModalBody>
                        <Form onSubmit={handleSubmit}>
                            <Label for="message">Message: </Label>
                            <Input value={message} name="message" onChange={handleChange} type="textarea" />
                            <Button className="rounded bg-danger"type="submit" className="bg-danger">Reject</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        </div>
        )
    }
}

export default HODRequestsComponent;
