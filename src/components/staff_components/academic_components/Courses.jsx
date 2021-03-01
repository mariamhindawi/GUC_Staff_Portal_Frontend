import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import Axios from "axios";
import AxiosInstance from "../../../others/AxiosInstance";
import AuthTokenManager from "../../../others/AuthTokenManager";
import useAxiosCancel from "../../../hooks/AxiosCancel";
import ViewCourses from "./ViewCourses";
import { useUserContext } from "../../../contexts/UserContext";

function Courses() {
  const [isLoading, setLoading] = useState({ personalCourses: true, departmentCourses: true });
  const [personalCourses, setPersonalCourses] = useState({ courses: [], coursesCoverage: [] });
  const [departmentCourses, setDepartmentCourses] = useState({ courses: [], coursesCoverage: [] });
  const user = useUserContext();
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

  const fetchPersonalCourses = async () => {
    const url = user.role === "Course Instructor" || user.role === "Head of Department"
      ? "/staff/ci/get-my-courses-coverage" : "/staff/academic/get-my-courses";
    setLoading(prevState => ({ ...prevState, personalCourses: true }));
    await AxiosInstance.get(url, {
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    })
      .then(response => {
        if (user.role === "Course Instructor" || user.role === "Head of Department") {
          setPersonalCourses(response.data);
        }
        else {
          setPersonalCourses({ courses: response.data, coursesCoverage: [] });
        }
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
    const url = user.role === "Head of Department"
      ? "/staff/hod/get-department-courses-coverage" : "/staff/academic/get-department-courses";
    setLoading(prevState => ({ ...prevState, departmentCourses: true }));
    await AxiosInstance.get(url, {
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    })
      .then(response => {
        if (user.role === "Head of Department") {
          setDepartmentCourses(response.data);
        }
        else {
          setDepartmentCourses({ courses: response.data, coursesCoverage: [] });
        }
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
          <ViewCourses
            isLoading={isLoading.personalCourses}
            courses={personalCourses.courses}
            coursesCoverage={personalCourses.coursesCoverage}
            updateCourses={() => {
              fetchPersonalCourses();
              fetchDepartmentCourses();
            }}
            listType="Personal"
          />
        </Tab>
        <Tab className="view-tab" eventKey="departmentCourses" title="Department Courses">
          <ViewCourses
            isLoading={isLoading.departmentCourses}
            courses={departmentCourses.courses}
            coursesCoverage={departmentCourses.coursesCoverage}
            updateCourses={() => {
              fetchPersonalCourses();
              fetchDepartmentCourses();
            }}
            listType="General"
          />
        </Tab>
      </Tabs>
    </div>
  );
}

export default Courses;
