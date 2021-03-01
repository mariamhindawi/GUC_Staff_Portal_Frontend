import React, { useEffect, useState } from "react";
import {
  Button, Form, Input, Label, Modal, ModalBody
} from "reactstrap";
import Spinner from "../helper_components/Spinner";
import Axios from "axios";
import AxiosInstance from "../../others/AxiosInstance";
import AuthTokenManager from "../../others/AuthTokenManager";
import RequestsTable from "./requestsTable.component";

const CCRequestsComponent = props => {
  const [slotRequests, setSlotRequests] = useState([]);
  const [loading, setLoading] = useState([]);
  const [message, setMessage] = useState("");
  const [requestID, setRequestID] = useState(0);
  const [modal, setModal] = useState(false);
  const toggle = reqID => { setRequestID(reqID); setModal(!modal); };

  useEffect(() => {
    AxiosInstance.get("staff/cc/slot-linking-requests", {
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    }).then(res => { console.log(res.data); setSlotRequests(res.data); setLoading(false); }).catch(error => console.log(error));
  }, []);
  const acceptRequest = id => {
    AxiosInstance(`staff/cc/slot-linking-requests/${id}/accept`, {
      method: "PUT",
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    }).then(res => console.log(res.data)).then(() => AxiosInstance.get("staff/cc/slot-linking-requests", {
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    }).then(res => { setSlotRequests(res.data); setLoading(false); })).catch(error => alert(error));
  };
  const rejectRequest = () => {
    toggle();
    AxiosInstance(`staff/cc/slot-linking-requests/${requestID}/reject`, {
      method: "PUT",
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
      data: {
        ccComment: message,
      },
    }).then(res => alert(res.data)).then(() => AxiosInstance.get("staff/cc/slot-linking-requests", {
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    }).then(res => { setSlotRequests(res.data); setLoading(false); })).catch(error => alert(error));
  };
  function handleChange(event) {
    event.preventDefault();
    setMessage(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    rejectRequest();
  }
  if (loading) {
    return (
      <div className="container">
        <div className="row">
          <div className="offset-5">
            <Spinner />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <RequestsTable requests={slotRequests} acceptRequest={acceptRequest} rejectRequest={toggle} />
        <Modal toggle={toggle} isOpen={modal}>
          <ModalBody>
            <Form onSubmit={handleSubmit}>
              <Label for="message">Message: </Label>
              <Input value={message} name="message" onChange={handleChange} type="textarea" />
              <Button type="submit" className="bg-danger">Reject</Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
};

export default CCRequestsComponent;
