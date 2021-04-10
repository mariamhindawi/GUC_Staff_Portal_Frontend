import React, { useEffect, useState } from "react";
import Axios from "axios";
import AxiosInstance from "../../../others/AxiosInstance";
import AuthTokenManager from "../../../others/AuthTokenManager";
import useAxiosCancel from "../../../hooks/AxiosCancel";
import Spinner from "../../helper_components/Spinner";
import ViewRequests from "../academic_components/request_components/ViewRequests";

function HodRequests() {
  const [isLoading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

  const fetchRequests = async () => {
    setLoading(true);
    await AxiosInstance({
      method: "get",
      url: "/staff/hod/staff-requests",
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    })
      .then(response => {
        setRequests(response.data);
        setLoading(false);
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(error.message);
        }
        else if (error.response) {
          console.log(error.response);
          setLoading(false);
        }
        else if (error.request) {
          console.log(error.request);
        }
        else {
          console.log(error.message);
        }
      });
  };
  const acceptRequest = async reqId => {
    await AxiosInstance({
      method: "put",
      url: `staff/hod/staff-requests/${reqId}/accept`,
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    })
      .then(() => {
        fetchRequests();
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(error.message);
        }
        else if (error.response) {
          console.log(error.response);
          setLoading(false);
        }
        else if (error.request) {
          console.log(error.request);
        }
        else {
          console.log(error.message);
        }
      });
  };
  const rejectRequest = async reqId => {
    await AxiosInstance({
      method: "put",
      url: `staff/hod/staff-requests/${reqId}/reject`,
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    })
      .then(() => {
        fetchRequests();
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(error.message);
        }
        else if (error.response) {
          console.log(error.response);
          setLoading(false);
        }
        else if (error.request) {
          console.log(error.request);
        }
        else {
          console.log(error.message);
        }
      });
  };
  useEffect(fetchRequests, []);
  return (
    <div className="view-container">
      {isLoading ? <Spinner />
        : (
          <ViewRequests
            isLoading={isLoading.requests}
            requests={requests}
            updateRequests={fetchRequests}
            hodAcceptRequest={acceptRequest}
            hodRejectRequest={rejectRequest}
          />
        )}
    </div>
  );
}

export default HodRequests;
