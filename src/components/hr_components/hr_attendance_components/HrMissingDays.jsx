import React, { useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { Dropdown, Button } from "react-bootstrap";
import Axios from "axios";
import AxiosInstance from "../../../others/AxiosInstance";
import AuthTokenManager from "../../../others/AuthTokenManager";
import useAxiosCancel from "../../../hooks/AxiosCancel";
import HrViewMissingDays from "./HrViewMissingDays";

function HrMissingDays() {
  const [missingDays, setMissingDays] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [isLoading, setLoading] = useState(true);
  const [firstRender, setFirstRender] = useState(true);
  const match = useRouteMatch();
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

  const fetchMissingDays = async () => {
    setLoading(true);
    await AxiosInstance.get("/staff/hr/view-staff-missing-days", {
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
        setMissingDays(response.data);
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

  return (
    <Switch>
      <Route exact path={`${match.path}`}>
        <>
          <div className="attendance-container">
            <div className="attendance-button-container">
              <div className="d-flex">
                <Dropdown className="mr-2">
                  <span className="mr-2">Month</span>
                  <Dropdown.Toggle className="attendance-dropdown">
                    {month}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => { setMonth(1); }}>1</Dropdown.Item>
                    <Dropdown.Item onClick={() => { setMonth(2); }}>2</Dropdown.Item>
                    <Dropdown.Item onClick={() => { setMonth(3); }}>3</Dropdown.Item>
                    <Dropdown.Item onClick={() => { setMonth(4); }}>4</Dropdown.Item>
                    <Dropdown.Item onClick={() => { setMonth(5); }}>5</Dropdown.Item>
                    <Dropdown.Item onClick={() => { setMonth(6); }}>6</Dropdown.Item>
                    <Dropdown.Item onClick={() => { setMonth(7); }}>7</Dropdown.Item>
                    <Dropdown.Item onClick={() => { setMonth(8); }}>8</Dropdown.Item>
                    <Dropdown.Item onClick={() => { setMonth(9); }}>9</Dropdown.Item>
                    <Dropdown.Item onClick={() => { setMonth(10); }}>10</Dropdown.Item>
                    <Dropdown.Item onClick={() => { setMonth(11); }}>11</Dropdown.Item>
                    <Dropdown.Item onClick={() => { setMonth(12); }}>12</Dropdown.Item>
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
              <div>
                <Button className="hr-attendance-button hr-view-attendance-button" onClick={() => { fetchMissingDays(); setFirstRender(false); }}>
                  View Staff
                </Button>
              </div>
            </div>
            {firstRender ? <> </> : (
              <HrViewMissingDays
                isLoading={isLoading}
                missingDays={missingDays}
              />
            )}
          </div>
        </>
      </Route>
    </Switch>
  );
}
export default HrMissingDays;
