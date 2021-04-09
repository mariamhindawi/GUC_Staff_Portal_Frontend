import React, { useEffect, useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import Axios from "axios";
import AxiosInstance from "../../../../others/AxiosInstance";
import AuthTokenManager from "../../../../others/AuthTokenManager";
import useAxiosCancel from "../../../../hooks/AxiosCancel";
import Spinner from "../../../helper_components/Spinner";
import ViewRequests from "./ViewRequests";

function ViewMyRequests() {
  const [isLoading, setLoading] = useState({ initial: true, requests: true });
  const [requestType, setRequestType] = useState("Leave requests");
  const [requests, setRequests] = useState([]);
  const [leaveFilter, setLeaveFilter] = useState("All");
  const [replacementFilter, setReplacementFilter] = useState("Sent");

  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

  const fetchRequests = async () => {
    setLoading(prevState => ({ ...prevState, requests: true }));
    await AxiosInstance({
      method: "get",
      url: requestType === "Leave requests" ? `/staff/academic/all-requests/${leaveFilter}` : "/staff/academic/replacement-requests",
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    })
      .then(response => {
        if (requestType === "Leave requests") {
          setRequests(response.data);
        }
        else if (replacementFilter === "Sent") {
          setRequests(response.data.byMe);
        }
        else {
          setRequests(response.data.forMe);
        }
        setLoading(prevState => ({ ...prevState, requests: false }));
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(error.message);
        }
        else if (error.response) {
          console.log(error.response);
          setLoading(prevState => ({ ...prevState, requests: false }));
        }
        else if (error.request) {
          console.log(error.request);
        }
        else {
          console.log(error.message);
        }
      });
  };
  useEffect(fetchRequests, [requestType, leaveFilter, replacementFilter]);
  return (
    <div className="view-container">
      <div className="view-select">
        <div>
          <span className="mr-2">Request type</span>
          <DropdownButton bsPrefix="view-dropdown-button" title={requestType || "Replacement requests"}>
            <Dropdown.Item
              key="leave"
              onClick={() => { setRequestType("Leave requests"); }}
            >
              Leave requests
            </Dropdown.Item>
            <Dropdown.Item
              key="replacement"
              onClick={() => { setRequestType("Replacement requests"); }}
            >
              Replacement requests
            </Dropdown.Item>
          </DropdownButton>
        </div>
        {requestType === "Leave requests"
          ? (
            <div>
              <span className="ml-3 mr-2">Filter</span>
              <DropdownButton bsPrefix="view-dropdown-button" title={leaveFilter}>
                <Dropdown.Item
                  key="all"
                  onClick={() => { setLeaveFilter("All"); }}
                >
                  All
                </Dropdown.Item>
                <Dropdown.Item
                  key="accepted"
                  onClick={() => { setLeaveFilter("Accepted"); }}
                >
                  Accepted
                </Dropdown.Item>
                <Dropdown.Item
                  key="accepted"
                  onClick={() => { setLeaveFilter("Rejected"); }}
                >
                  Rejected
                </Dropdown.Item>
                <Dropdown.Item
                  key="accepted"
                  onClick={() => { setLeaveFilter("Pending"); }}
                >
                  Pending
                </Dropdown.Item>
              </DropdownButton>
            </div>
          )
          : (
            <div>
              <span className="ml-3 mr-2">Filter</span>
              <DropdownButton bsPrefix="view-dropdown-button" title={replacementFilter}>
                <Dropdown.Item
                  key="sent"
                  onClick={() => { setReplacementFilter("Sent"); }}
                >
                  Sent
                </Dropdown.Item>
                <Dropdown.Item
                  key="recieved"
                  onClick={() => { setReplacementFilter("Recieved"); }}
                >
                  Recieved
                </Dropdown.Item>
              </DropdownButton>
            </div>
          )}
      </div>
      {isLoading.requests ? <Spinner />
        : (
          <ViewRequests
            isLoading={isLoading.requests}
            requests={requests}
            updateRequests={fetchRequests}
            requestType={requestType}
            requestFilter={replacementFilter}
          />
        )}
    </div>
  );
}

export default ViewMyRequests;
