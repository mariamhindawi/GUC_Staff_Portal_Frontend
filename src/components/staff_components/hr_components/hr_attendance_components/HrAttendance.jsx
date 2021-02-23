import React, { useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { Dropdown, Button } from "react-bootstrap";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AxiosInstance from "../../../../others/AxiosInstance";
import AuthTokenManager from "../../../../others/AuthTokenManager";
import useAxiosCancel from "../../../../hooks/AxiosCancel";
import ViewAttendance from "../../general_staff_components/ViewAttendance";

function HrAttendance() {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [userId, setUserId] = useState("");
  const [initialState, setInitialState] = useState(true);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [isLoading, setLoading] = useState(true);
  const match = useRouteMatch();
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

  const handleUserChange = e => {
    setUserId(e.target.value);
  };

  const fetchRecords = async () => {
    setLoading(true);
    await AxiosInstance.get("/staff/hr/view-staff-attendance-records", {
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
      params: {
        id: userId,
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
        setInitialState(false);
        setAttendanceRecords(result);
        setLoading(false);
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(`Request cancelled: ${error.message}`);
        }
        else if (error.response) {
          setLoading(false);
          setMessage({ messageText: error.response.data, messageStyle: "error-message" });
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
                  <Dropdown.Item onClick={() => { setMonth(1); }}>
                    1
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => { setMonth(2); }}>
                    2
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => { setMonth(3); }}>
                    3
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => { setMonth(4); }}>
                    4
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => { setMonth(5); }}>
                    5
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => { setMonth(6); }}>
                    6
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => { setMonth(7); }}>
                    7
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => { setMonth(8); }}>
                    8
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => { setMonth(9); }}>
                    9
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => { setMonth(10); }}>
                    10
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => { setMonth(11); }}>
                    11
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => { setMonth(12); }}>
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
                  }}
                  >
                    {new Date().getFullYear()}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => {
                    setYear(new Date().getFullYear() - 1);
                  }}
                  >
                    {new Date().getFullYear() - 1}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => {
                    setYear(new Date().getFullYear() - 2);
                  }}
                  >
                    {new Date().getFullYear() - 2}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => {
                    setYear(new Date().getFullYear() - 3);
                  }}
                  >
                    {new Date().getFullYear() - 3}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="d-flex mt-1">
              <input
                className="attendance-input"
                type="search"
                id="search"
                name="user"
                placeholder="Enter User ID"
                value={userId}
                onChange={handleUserChange}
              />
              <Button
                type="button"
                className="hr-attendance-button"
                onClick={() => { fetchRecords(); setInitialState(false); }}
              >
                Search
                <FontAwesomeIcon className="ml-2" icon="search" />

              </Button>
            </div>
            {initialState === true ? <></> : (
              <ViewAttendance
                isLoading={isLoading}
                records={attendanceRecords}
              />
            )}
          </div>
        </>
      </Route>
    </Switch>
  );
}
export default HrAttendance;
