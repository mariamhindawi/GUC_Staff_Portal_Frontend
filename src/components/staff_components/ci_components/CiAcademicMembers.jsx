import React, { useEffect, useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import Axios from "axios";
import AxiosInstance from "../../../others/AxiosInstance";
import AuthTokenManager from "../../../others/AuthTokenManager";
import useAxiosCancel from "../../../hooks/AxiosCancel";
import Spinner from "../../helper_components/Spinner";
import CiViewAcademics from "./CiViewAcademicMembers";

function CiAcademicMembers() {
  const [isLoading, setLoading] = useState(true);
  const [myCourses, setMyCourses] = useState([]);
  const [departmentCourses, setDepartmentCourses] = useState([]);
  const [departmentCourse, setDepartmentCourse] = useState("All Courses");
  const [academics, setAcademics] = useState([]);
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

  const fetchDepartmentCourses = async () => {
    await AxiosInstance.get("/staff/fe/get-courses-by-department", {
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    })
      .then(response => {
        setDepartmentCourses(response.data.courses);
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(`Request cancelled: ${error.message}`);
        }
        else if (error.response) {
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
  const fetchAcademics = async () => {
    setLoading(true);
    if (departmentCourse === "All Courses") {
      await AxiosInstance.get("/staff/ci/view-staff", {
        cancelToken: axiosCancelSource.token,
        headers: {
          "auth-access-token": AuthTokenManager.getAuthAccessToken(),
        },
      })
        .then(response => {
          setAcademics(response.data);
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
    }
    else {
      await AxiosInstance.get(`/staff/ci/view-staff/${departmentCourse}`, {
        cancelToken: axiosCancelSource.token,
        headers: {
          "auth-access-token": AuthTokenManager.getAuthAccessToken(),
        },
      })
        .then(response => {
          setAcademics(response.data);
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
    }
  };
  const fetchMyCourses = async () => {
    await AxiosInstance.get("/staff/fe/get-my-courses", {
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    })
      .then(response => {
        for (let i = 0; i < response.data.length; i++) {
          response.data[i] = response.data[i].id;
        }
        setMyCourses(response.data);
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(`Request cancelled: ${error.message}`);
        }
        else if (error.response) {
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

  useEffect(fetchDepartmentCourses, []);
  useEffect(fetchAcademics, [departmentCourse]);
  useEffect(fetchMyCourses, []);

  const mapCoursesToDropdownItems = courses => {
    if (courses.length === 0) {
      return <Dropdown.Item as="span">No Courses</Dropdown.Item>;
    }
    return courses.map(course => (
      <Dropdown.Item
        key={course.id}
        onClick={() => { setDepartmentCourse(course.id); }}
      >
        {course.id}
      </Dropdown.Item>
    ));
  };

  return (
    <div className="view-container">
      <div className="course-select">
        <div>
          <span className="mr-2">Course</span>
          <DropdownButton bsPrefix="course-dropdown-button" title={departmentCourse}>
            <Dropdown.Item
              key="All Courses"
              onClick={() => { setDepartmentCourse("All Courses"); }}
            >
              All Courses
            </Dropdown.Item>
            {mapCoursesToDropdownItems(departmentCourses)}
          </DropdownButton>
        </div>
      </div>
      {isLoading
        ? <Spinner />
        : (
          <CiViewAcademics
            isLoading={isLoading}
            academics={academics}
            course={departmentCourse}
            updateAcademics={fetchAcademics}
            myCourses={myCourses}
          />
        )}

    </div>
  );
}

export default CiAcademicMembers;
