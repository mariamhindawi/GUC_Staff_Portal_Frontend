import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AxiosInstance from "../../../others/AxiosInstance";
import AuthTokenManager from "../../../others/AuthTokenManager";
import useAxiosCancel from "../../../hooks/AxiosCancel";
import Spinner from "../../helper_components/Spinner";

function HrHomeMain() {
  const [isLoading, setLoading] = useState(true);
  const [countsReport, setCountsReport] = useState({});
  const match = useRouteMatch();
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

  const fetchCountsReport = async () => {
    const url = "/staff/hr/get-counts-report";
    setLoading(true);
    await AxiosInstance.get(url, {
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    })
      .then(response => {
        setCountsReport(response.data);
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
  useEffect(fetchCountsReport, []);
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="view-container">
      <div className="hr-counts-report">
        <div className="d-flex">
          <FontAwesomeIcon className="sidebar-icon counts-report-icon" icon="user-tie" />
          <div>
            <span>{countsReport.academicMembers}</span>
            <span>Academics</span>
          </div>
        </div>
        <div className="d-flex">
          <FontAwesomeIcon className="sidebar-icon counts-report-icon" icon="user-graduate" />
          <div>
            <span>{countsReport.hrMembers}</span>
            <span>HR Members</span>
          </div>
        </div>
        <div className="d-flex">
          <FontAwesomeIcon className="sidebar-icon counts-report-icon" icon="table" />
          <div>
            <span>{countsReport.faculties}</span>
            <span>Faculties</span>
          </div>
        </div>
        <div className="d-flex">
          <FontAwesomeIcon className="sidebar-icon counts-report-icon" icon="sitemap" />
          <div>
            <span>{countsReport.departments}</span>
            <span>Departments</span>
          </div>
        </div>
        <div className="d-flex">
          <FontAwesomeIcon className="sidebar-icon counts-report-icon" icon="book" />
          <div>
            <span>{countsReport.courses}</span>
            <span>Courses</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HrHomeMain;
