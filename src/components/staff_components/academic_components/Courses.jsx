import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import Axios from "axios";
import AxiosInstance from "../../../others/AxiosInstance";
import AuthTokenManager from "../../../others/AuthTokenManager";
import useAxiosCancel from "../../../hooks/AxiosCancel";
import Spinner from "../../helper_components/Spinner";
import ViewCourses from "./ViewCourses";

function Courses() {
  const [isLoading, setLoading] = useState({ personalCourses: true, departmentCourses: true });
  const [personalCourses, setPersonalCourses] = useState({ courses: [], coursesCoverage: [] });
  const [departmentCourses, setDepartmentCourses] = useState([]);
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

  const fetchPersonalCourses = async () => {
    setLoading(prevState => ({ ...prevState, personalCourses: true }));
    await AxiosInstance.get("/staff/ci/get-my-courses-coverage", {
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    })
      .then(response => {
        setPersonalCourses(response.data);
        setLoading(prevState => ({ ...prevState, personalCourses: false }));
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(error.message);
        }
        else if (error.response) {
          console.log(error.response);
          setLoading(prevState => ({ ...prevState, personalCourses: false }));
        }
        else if (error.request) {
          console.log(error.request);
        }
        else {
          console.log(error.message);
        }
      });
  };
  const fetchDepartmentCourses = async () => {
    setLoading(prevState => ({ ...prevState, departmentCourses: true }));
    await AxiosInstance.get("/staff/academic/get-department-courses", {
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    })
      .then(response => {
        setDepartmentCourses(response.data);
        setLoading(prevState => ({ ...prevState, departmentCourses: false }));
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(error.message);
        }
        else if (error.response) {
          console.log(error.response);
          setLoading(prevState => ({ ...prevState, departmentCourses: false }));
        }
        else if (error.request) {
          console.log(error.request);
        }
        else {
          console.log(error.message);
        }
      });
  };

  useEffect(fetchPersonalCourses, []);
  useEffect(fetchDepartmentCourses, []);

  return (
    <div className="view-container">
      <Tabs className="view-tabs" defaultActiveKey="personalCourses">
        <Tab className="view-tab" eventKey="personalCourses" title="My Courses">
          {isLoading.personalCourses
            ? <Spinner />
            : (
              <ViewCourses
                isLoading={isLoading.personalCourses}
                courses={personalCourses.courses}
                updateCourses={fetchPersonalCourses}
                type="Personal"
              />
            )}
        </Tab>
        <Tab className="view-tab" eventKey="departmentCourses" title="Department Courses">
          {isLoading.departmentCourses
            ? <Spinner />
            : (
              <ViewCourses
                isLoading={isLoading.departmentCourses}
                courses={departmentCourses}
                updateCourses={fetchDepartmentCourses}
                type="General"
              />
            )}
        </Tab>
      </Tabs>
    </div>
  );
}

export default Courses;
