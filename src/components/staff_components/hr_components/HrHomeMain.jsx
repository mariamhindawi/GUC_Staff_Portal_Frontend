import React, { useEffect, useState } from "react";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Chart } from "react-google-charts";
import AxiosInstance from "../../../others/AxiosInstance";
import AuthTokenManager from "../../../others/AuthTokenManager";
import useAxiosCancel from "../../../hooks/AxiosCancel";
import Spinner from "../../helper_components/Spinner";

function HrHomeMain() {
  const [isLoading, setLoading] = useState(true);
  const [countsReport, setCountsReport] = useState({
    academicMembers: -1,
    hrMembers: -1,
    faculties: -1,
    departments: -1,
    courses: -1,
  });
  const [roomsStats, setRoomsStats] = useState({});
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
  const fetchRoomsStats = async () => {
    const url = "/staff/hr/get-rooms-stats";
    setLoading(true);
    await AxiosInstance.get(url, {
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    })
      .then(response => {
        setRoomsStats(response.data);
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
  useEffect(fetchRoomsStats, []);

  if (isLoading || countsReport.academicMembers < 0 || countsReport.hrMembers < 0
    || countsReport.courses < 0 || countsReport.faculties < 0 || countsReport.departments < 0) {
    return <Spinner />;
  }
  return (
    <div className="view-container">
      <div className="counts-report">
        <div className="d-flex">
          <FontAwesomeIcon className="sidebar-icon counts-report-icon" style={{ color: "#990000" }} icon="user-tie" />
          <div className="d-flex flex-column">
            <span className="number">{countsReport.hrMembers}</span>
            <span className="title">HR Members</span>
          </div>
        </div>
        <div className="d-flex">
          <FontAwesomeIcon className="sidebar-icon counts-report-icon" style={{ color: "#80bfff" }} icon="user-graduate" />
          <div className="d-flex flex-column">
            <span className="number">{countsReport.academicMembers}</span>
            <span className="title">Academic Members</span>
          </div>
        </div>
        <div className="d-flex">
          <FontAwesomeIcon className="sidebar-icon counts-report-icon" style={{ color: "#00cc44" }} icon="table" />
          <div className="d-flex flex-column">
            <span className="number">{countsReport.faculties}</span>
            <span className="title">Faculties</span>
          </div>
        </div>
        <div className="d-flex">
          <FontAwesomeIcon className="sidebar-icon counts-report-icon" style={{ color: "#e6b800" }} icon="sitemap" />
          <div className="d-flex flex-column">
            <span className="number">{countsReport.departments}</span>
            <span className="title">Departments</span>
          </div>
        </div>
        <div className="d-flex">
          <FontAwesomeIcon className="sidebar-icon counts-report-icon" style={{ color: "#009999" }} icon="book" />
          <div className="d-flex flex-column">
            <span className="number">{countsReport.courses}</span>
            <span className="title">Courses</span>
          </div>
        </div>
      </div>
      <FontAwesomeIcon className="sidebar-icon arrow" icon="arrow-circle-right" />
      <div className="chart-container">
        <Chart
          className="room-chart"
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={[
            ["Type", "Rooms"],
            ["Lectures", roomsStats.lectures],
            ["Tutorials", roomsStats.tutorials],
            ["Labs", roomsStats.labs],
            ["Offices", roomsStats.offices],
          ]}
          options={{
            title: "GUC Rooms",
          }}
          rootProps={{ "data-testid": "1" }}
        />
      </div>
    </div>
  );
}

export default HrHomeMain;
