import React, { useEffect, useState } from "react";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Chart } from "react-google-charts";
import { addDays, isBefore } from "date-fns";
import AxiosInstance from "../../../others/AxiosInstance";
import AuthTokenManager from "../../../others/AuthTokenManager";
import useAxiosCancel from "../../../hooks/AxiosCancel";
import Spinner from "../../helper_components/Spinner";

function AcademicHomeMain() {
  const [isLoading, setLoading] = useState(true);
  const [slots, setSlots] = useState({});
  const [personalCourses, setPersonalCourses] = useState(-1);
  const [pendingRequests, setPendingRequests] = useState(-1);
  const [recievedRequests, setRecievedRequests] = useState(-1);
  const [month] = useState(isBefore(new Date(), new Date().setDate(11))
    ? new Date().getMonth() : new Date().getMonth() + 1);
  const [year] = useState(addDays(Date.now(), -10).getFullYear());
  const [hours, setHours] = useState(-1);
  const [missingDays, setMissingDays] = useState(-1);
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

  const fetchSlots = async () => {
    const url = "/staff/academic/get-slots-stats";
    setLoading(true);
    await AxiosInstance.get(url, {
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    })
      .then(response => {
        setSlots(response.data);
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
  const fetchReport = async () => {
    const url = "/staff/academic/get-counts-report";
    setLoading(true);
    await AxiosInstance.get(url, {
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    })
      .then(response => {
        setPersonalCourses(response.data.courses);
        setPendingRequests(response.data.pendingRequests);
        setRecievedRequests(response.data.recievedRequests);
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
  const fetchHours = async () => {
    setLoading(true);
    await AxiosInstance.get("/staff/view-hours", {
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
      params: {
        month,
        year,
      },
    })
      .then(response => {
        setHours(response.data.missingHours);
        setLoading(false);
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(error.message);
        }
        else if (error.response) {
          setLoading(false);
          console.log(error.response);
        }
        else if (error.request) {
          console.log(error.request);
        }
        else {
          console.log(error.message);
        }
      });
  };
  const fetchMissingDays = async () => {
    setLoading(true);
    await AxiosInstance.get("/staff/view-missing-days", {
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
      params: {
        month,
        year,
      },
    })
      .then(response => {
        for (let i = 0; i < response.data.length; i++) {
          response.data[i] = new Date(response.data[i]);
        }
        setMissingDays(response.data.length);
        setLoading(false);
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(error.message);
        }
        else if (error.response) {
          setLoading(false);
          console.log(error.response);
        }
        else if (error.request) {
          console.log(error.request);
        }
        else {
          console.log(error.message);
        }
      });
  };
  useEffect(fetchSlots, []);
  useEffect(fetchReport, []);
  useEffect(fetchHours, []);
  useEffect(fetchMissingDays, []);
  if (isLoading || missingDays < 0 || hours < 0
    || personalCourses < 0 || pendingRequests < 0 || recievedRequests < 0) {
    return <Spinner />;
  }
  return (
    <div className="view-container">
      <div className="counts-report">
        <div className="d-flex">
          <FontAwesomeIcon className="sidebar-icon counts-report-icon" style={{ color: "#990000" }} icon="book" />
          <div className="d-flex flex-column">
            <span className="number">{personalCourses}</span>
            <span className="title">Assigned Courses</span>
          </div>
        </div>
        <div className="d-flex">
          <FontAwesomeIcon className="sidebar-icon counts-report-icon" style={{ color: "#80bfff" }} icon="spinner" />
          <div className="d-flex flex-column">
            <span className="number">{pendingRequests}</span>
            <span className="title">Pending Requests</span>
          </div>
        </div>
        <div className="d-flex">
          <FontAwesomeIcon className="sidebar-icon counts-report-icon" style={{ color: "#00cc44" }} icon="share" />
          <div className="d-flex flex-column">
            <span className="number">{recievedRequests}</span>
            <span className="title">Requests recieved</span>
          </div>
        </div>
        <div className="d-flex">
          <FontAwesomeIcon className="sidebar-icon counts-report-icon" style={{ color: "#e6b800" }} icon="calendar-day" />
          <div className="d-flex flex-column">
            <span className="number">{missingDays}</span>
            <span className="title">Missing Days</span>
          </div>
        </div>
        <div className="d-flex">
          <FontAwesomeIcon className="sidebar-icon counts-report-icon" style={{ color: "#009999" }} icon="hourglass-half" />
          <div className="d-flex flex-column">
            <span className="number">{hours}</span>
            <span className="title">Missing Hours</span>
          </div>
        </div>
      </div>
      <FontAwesomeIcon className="sidebar-icon arrow" icon="arrow-circle-right" />
      <div className="chart-container">
        <Chart
          className="slot-chart"
          chartType="BarChart"
          loader={<div>Loading Chart</div>}
          data={[
            [
              "Slot",
              "Count",
              { role: "style" },
              {
                sourceColumn: 0,
                role: "annotation",
                type: "string",
                calc: "stringify",
              },
            ],
            ["Assigned Slots", slots.assignedSlots, "#99d6ff", null],
            ["Unassigned Slots", slots.unassignedSlots, "silver", null],
          ]}
          options={{
            title: "Slots",
            bar: { groupWidth: "95%" },
            legend: { position: "none" },
          }}
          rootProps={{ "data-testid": "6" }}
        />
      </div>
    </div>
  );
}

export default AcademicHomeMain;
