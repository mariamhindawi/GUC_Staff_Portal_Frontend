import React, { useEffect, useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { Dropdown, ButtonGroup, Button } from "react-bootstrap";
import Axios from "axios";
import AxiosInstance from "../../../others/AxiosInstance";
import AuthTokenManager from "../../../others/AuthTokenManager";
import useAxiosCancel from "../../../hooks/AxiosCancel";
import ViewAttendance from "./ViewAttendance";
import ViewMissingDays from "./ViewMissingDays";
import ViewHours from "./ViewHours";

function Attendance() {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [missingDays, setMissingDays] = useState([]);
  const [hours, setHours] = useState({});
  const [attendanceButtonStyle, setAttendanceButtonStyle] = useState("attendance-button-clicked");
  const [daysButtonStyle, setDaysButtonStyle] = useState("");
  const [hoursButtonStyle, setHoursButtonStyle] = useState("");
  const [viewRecords, setViewRecords] = useState(1);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [isLoading, setLoading] = useState(true);
  const match = useRouteMatch();
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

  const fetchRecords = async () => {
    setLoading(true);
    setAttendanceButtonStyle("attendance-button-clicked");
    setDaysButtonStyle("");
    setHoursButtonStyle("");
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
        const result = response.data;
        for (let i = 0; i < result.length; i++) {
          if (result[i].signInTime !== null) {
            result[i].signInTime = new Date(result[i].signInTime).toString().substring(0, 24);
          }
          if (result[i].signOutTime !== null) {
            result[i].signOutTime = new Date(result[i].signOutTime).toString().substring(0, 24);
          }
        }
        setAttendanceRecords(result);
        setLoading(false);
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(`Request cancelled: ${error.message}`);
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
  const fetchDays = async () => {
    setLoading(true);
    setAttendanceButtonStyle("");
    setDaysButtonStyle("attendance-button-clicked");
    setHoursButtonStyle("");
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
        const result = response.data;
        for (let i = 0; i < result.length; i++) {
          result[i] = new Date(result[i]).toString().substring(0, 15);
        }
        setMissingDays(result);
        setLoading(false);
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(`Request cancelled: ${error.message}`);
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
  const fetchHours = async () => {
    setLoading(true);
    setAttendanceButtonStyle("");
    setDaysButtonStyle("");
    setHoursButtonStyle("attendance-button-clicked");
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
        setLoading(false);
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(`Request cancelled: ${error.message}`);
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
  const changeData = () => {
    setViewRecords(0);
    setAttendanceButtonStyle("");
    setDaysButtonStyle("");
    setHoursButtonStyle("");
  };

  useEffect(fetchRecords, []);
  return (
    <Switch>
      <Route exact path={`${match.path}`}>
        <>
          <div className="attendance-container">
            <div className="d-flex pb-2">
              <Dropdown className="mr-2">
                <span className="mr-2">Month</span>
                <Dropdown.Toggle className="attendance-dropdown">
                  {month}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => { setMonth(1); changeData(); }}>
                    1
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => { setMonth(2); changeData(); }}>
                    2
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => { setMonth(3); changeData(); }}>
                    3
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => { setMonth(4); changeData(); }}>
                    4
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => { setMonth(5); changeData(); }}>
                    5
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => { setMonth(6); changeData(); }}>
                    6
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => { setMonth(7); changeData(); }}>
                    7
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => { setMonth(8); changeData(); }}>
                    8
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => { setMonth(9); changeData(); }}>
                    9
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => { setMonth(10); changeData(); }}>
                    10
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => { setMonth(11); changeData(); }}>
                    11
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => { setMonth(12); changeData(); }}>
                    12
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown>
                <span className="mr-2">Year</span>
                <Dropdown.Toggle className="attendance-dropdown">
                  {year}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => {
                    setYear(new Date().getFullYear());
                    changeData();
                  }}
                  >
                    {new Date().getFullYear()}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => {
                    setYear(new Date().getFullYear() - 1);
                    changeData();
                  }}
                  >
                    {new Date().getFullYear() - 1}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => {
                    setYear(new Date().getFullYear() - 2);
                    changeData();
                  }}
                  >
                    {new Date().getFullYear() - 2}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => {
                    setYear(new Date().getFullYear() - 3);
                    changeData();
                  }}
                  >
                    {new Date().getFullYear() - 3}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div>
              <ButtonGroup size="md" className="w-100">
                <Button className={`attendance-button ${attendanceButtonStyle}`} onClick={() => { fetchRecords(); setViewRecords(1); }}>
                  Attendance
                </Button>
                <Button className={`attendance-button ${daysButtonStyle}`} onClick={() => { fetchDays(); setViewRecords(2); }}>
                  Missing Days
                </Button>
                <Button className={`attendance-button ${hoursButtonStyle}`} onClick={() => { fetchHours(); setViewRecords(3); }}>
                  Hours
                </Button>
              </ButtonGroup>
            </div>
            {viewRecords === 1
              ? (
                <ViewAttendance
                  isLoading={isLoading}
                  records={attendanceRecords}
                  initialIsLoading

                />
              )
              : (
                <>
                </>
              )}
            {viewRecords === 2
              ? (
                <ViewMissingDays
                  isLoading={isLoading}
                  records={missingDays}
                />
              )
              : (
                <>
                </>
              )}
            {viewRecords === 3
              ? (
                <ViewHours
                  isLoading={isLoading}
                  hours={hours}
                />
              )
              : (
                <>
                </>
              )}
          </div>
        </>
      </Route>
    </Switch>
  );
}

export default Attendance;
