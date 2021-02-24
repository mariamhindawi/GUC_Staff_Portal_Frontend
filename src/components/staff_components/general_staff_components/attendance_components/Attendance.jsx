import React, { useEffect, useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { Dropdown, DropdownButton, Tabs, Tab } from "react-bootstrap";
import Axios from "axios";
import AxiosInstance from "../../../../others/AxiosInstance";
import AuthTokenManager from "../../../../others/AuthTokenManager";
import useAxiosCancel from "../../../../hooks/AxiosCancel";
import ViewAttendanceRecords from "./ViewAttendanceRecords";
import ViewMissingDays from "./ViewMissingDays";
import ViewHours from "./ViewHours";

function Attendance() {
  const [isLoading, setLoading] = useState({
    attendanceRecords: true, missingDays: true, hours: true,
  });
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [missingDays, setMissingDays] = useState([]);
  const [hours, setHours] = useState({});
  const match = useRouteMatch();
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

  const fetchRecords = async () => {
    setLoading(prevState => ({ ...prevState, attendanceRecords: true }));
    await AxiosInstance.get("/staff/view-attendance-records", {
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
        const { data } = response;
        for (let i = 0; i < data.length; i++) {
          const attendanceRecord = data[i];
          attendanceRecord.signInTime = new Date(attendanceRecord.signInTime);
          attendanceRecord.signOutTime = new Date(attendanceRecord.signOutTime);
        }
        setAttendanceRecords(data);
        setLoading(prevState => ({ ...prevState, attendanceRecords: false }));
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(`Request cancelled: ${error.message}`);
        }
        else if (error.response) {
          console.log(error.response);
          setLoading(prevState => ({ ...prevState, attendanceRecords: false }));
        }
        else if (error.request) {
          console.log(error.request);
        }
        else {
          console.log(error.message);
        }
      });
  };
  const fetchDays = async () => {
    setLoading(prevState => ({ ...prevState, missingDays: true }));
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
        const { data } = response;
        for (let i = 0; i < data.length; i++) {
          data[i] = new Date(data[i]);
        }
        setMissingDays(data);
        setLoading(prevState => ({ ...prevState, missingDays: false }));
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(`Request cancelled: ${error.message}`);
        }
        else if (error.response) {
          console.log(error.response);
          setLoading(prevState => ({ ...prevState, missingDays: false }));
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
    setLoading(prevState => ({ ...prevState, hours: true }));
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
        setHours(response.data);
        setLoading(prevState => ({ ...prevState, hours: false }));
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(`Request cancelled: ${error.message}`);
        }
        else if (error.response) {
          console.log(error.response);
          setLoading(prevState => ({ ...prevState, hours: false }));
        }
        else if (error.request) {
          console.log(error.request);
        }
        else {
          console.log(error.message);
        }
      });
  };
  useEffect(fetchRecords, [month, year]);
  useEffect(fetchDays, [month, year]);
  useEffect(fetchHours, [month, year]);

  const getDropdownMonths = () => {
    const dropdownMonths = [];
    for (let i = 1; i <= 12; i++) {
      const dropdownMonth = (
        <Dropdown.Item
          onClick={() => { setMonth(i); }}
          key={i}
        >
          {i}
        </Dropdown.Item>
      );
      dropdownMonths.push(dropdownMonth);
    }
    return dropdownMonths;
  };
  const getDropdownYears = () => {
    const dropdownYears = [];
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < 5; i++) {
      const dropdownYear = (
        <Dropdown.Item
          onClick={() => { setYear(currentYear - i); }}
          key={currentYear - i}
        >
          {currentYear - i}
        </Dropdown.Item>
      );
      dropdownYears.push(dropdownYear);
    }
    return dropdownYears;
  };

  return (
    <Switch>
      <Route exact path={`${match.path}`}>
        <div className="view-container">
          <div className="attendance-dropdown">
            <span className="mr-2">Month</span>
            <DropdownButton bsPrefix="attendance-dropdown-button" title={month}>
              {getDropdownMonths()}
            </DropdownButton>
            <span className="ml-3 mr-2">Year</span>
            <DropdownButton bsPrefix="attendance-dropdown-button" title={year}>
              {getDropdownYears()}
            </DropdownButton>
          </div>
          <Tabs className="attendance-tabs" defaultActiveKey="attendanceRecords">
            <Tab className="attendance-tab" eventKey="attendanceRecords" title="Attendance Records">
              <ViewAttendanceRecords
                isLoading={isLoading.attendanceRecords}
                attendanceRecords={attendanceRecords}
              />
            </Tab>
            <Tab className="attendance-tab" eventKey="missingDays" title="Missing Days">
              <ViewMissingDays
                isLoading={isLoading.missingDays}
                missingDays={missingDays}
              />
            </Tab>
            <Tab className="attendance-tab" eventKey="hours" title="Hours">
              <ViewHours
                isLoading={isLoading.hours}
                hours={hours}
              />
            </Tab>
          </Tabs>
        </div>
      </Route>
    </Switch>
  );
}

export default Attendance;
