import React, { useEffect, useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { Dropdown, Button } from "react-bootstrap";
import Axios from "axios";
import AxiosInstance from "../../../others/AxiosInstance";
import AuthTokenManager from "../../../others/AuthTokenManager";
import useAxiosCancel from "../../../hooks/AxiosCancel";
import ViewCiAcadeicMembers from "./ViewCiAcademicMembers";
import Spinner from "../../helper_components/Spinner";

function CiAcademicMembers() {
  const [departmentCourses, setDepartmentCourses] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [dropdownChoice, setDropdownChoice] = useState("My Department");
  const [initialIsLoading, setIninitialIsLoading] = useState(true);
  const [initialState, setInitialState] = useState(true);
  const [academics, setAcademics] = useState([]);
  const match = useRouteMatch();
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

  const fetchCourses = async () => {
    setLoading(true);
    setIninitialIsLoading(true);
    await AxiosInstance.get("/staff/fe/get-courses-by-department", {
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    })
      .then(response => {
        setDepartmentCourses(response.data);
        setLoading(false);
        setIninitialIsLoading(false);
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(`Request cancelled: ${error.message}`);
        }
        else if (error.response) {
          setLoading(false);
          setIninitialIsLoading(false);
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

  useEffect(fetchCourses, []);

  const courseList = () => (
    <Dropdown.Menu>
      <Dropdown.Item onClick={() => { setDropdownChoice("My Department"); }}>
        My Department
      </Dropdown.Item>
      {departmentCourses.map(course => (
        <Dropdown.Item onClick={() => { setDropdownChoice(course); }}>
          {course}
        </Dropdown.Item>
      ))}
    </Dropdown.Menu>
  );

  if (initialIsLoading) {
    return <Spinner />;
  }
  return (
    <Switch>
      <Route exact path={`${match.path}`}>
        <>
          <Dropdown className="mr-2">
            <span className="mr-2">View Staff In</span>
            <Dropdown.Toggle className="attendance-dropdown">
              {dropdownChoice}
            </Dropdown.Toggle>
            {courseList()}
          </Dropdown>
          <Button>View</Button>
          {initialState
            ? (
              <>
              </>
            )
            : (
              <ViewCiAcadeicMembers
                isLoading={isLoading}
                academics={academics}
              />
            )}
        </>
      </Route>
    </Switch>
  );
}

export default CiAcademicMembers;
