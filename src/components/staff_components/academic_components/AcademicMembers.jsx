import React, { useEffect, useState } from "react";
import { Dropdown, DropdownButton, Tab, Tabs } from "react-bootstrap";
import Axios from "axios";
import AxiosInstance from "../../../others/AxiosInstance";
import AuthTokenManager from "../../../others/AuthTokenManager";
import useAxiosCancel from "../../../hooks/AxiosCancel";
import Spinner from "../../helper_components/Spinner";
import ViewAcademics from "./ViewAcademicMembers";

function AcademicMembers() {
  const [isLoading, setLoading] = useState({
    personalCourses: true,
    departmentCourses: true,
    personalCourseAcademics: true,
    departmentCourseAcademics: true,
  });
  const [personalCourses, setPersonalCourses] = useState([]);
  const [selectedPersonalCourse, setSelectedPersonalCourse] = useState("");
  const [personalCourseAcademics, setPersonalCourseAcademics] = useState({
    courseInstructors: [], teachingAssistants: [],
  });
  const [departmentCourses, setDepartmentCourses] = useState([]);
  const [selectedDepartmentCourse, setSelectedDepartmentCourse] = useState("");
  const [departmentCourseAcademics, setDepartmentCourseAcademics] = useState({
    courseInstructors: [], teachingAssistants: [],
  });
  const [academicsType, setAcademicsType] = useState("All");

  const axiosCancelSource = Axios.CancelToken.source();
  const axiosCancelSourcePersonalCourse = Axios.CancelToken.source();
  const axiosCancelSourceDepartmentCourse = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);
  useAxiosCancel(axiosCancelSourcePersonalCourse, [selectedPersonalCourse]);
  useAxiosCancel(axiosCancelSourceDepartmentCourse, [selectedDepartmentCourse]);

  const fetchPersonalCourses = async () => {
    setLoading(prevState => ({ ...prevState, personalCourses: true }));
    await AxiosInstance.get("/staff/academic/get-my-courses", {
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    })
      .then(response => {
        setSelectedPersonalCourse("");
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
        setSelectedDepartmentCourse("");
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
  const fetchPersonalCourseAcademics = async () => {
    setLoading(prevState => ({ ...prevState, personalCourseAcademics: true }));
    if (selectedPersonalCourse === "") {
      setPersonalCourseAcademics({
        courseInstructors: [], teachingAssistants: [],
      });
      setLoading(prevState => ({ ...prevState, personalCourseAcademics: false }));
      return;
    }
    await AxiosInstance.get(`/staff/academic/get-staff/${selectedPersonalCourse}`, {
      cancelToken: axiosCancelSourcePersonalCourse.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    })
      .then(response => {
        setPersonalCourseAcademics(response.data);
        setLoading(prevState => ({ ...prevState, personalCourseAcademics: false }));
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(error.message);
        }
        else if (error.response) {
          console.log(error.response);
          setLoading(prevState => ({ ...prevState, personalCourseAcademics: false }));
        }
        else if (error.request) {
          console.log(error.request);
        }
        else {
          console.log(error.message);
        }
      });
  };
  const fetchDepartmentCourseAcademics = async () => {
    setLoading(prevState => ({ ...prevState, departmentCourseAcademics: true }));
    await AxiosInstance({
      method: "get",
      url: selectedDepartmentCourse === "" ? "/staff/academic/get-department-staff" : `/staff/academic/get-staff/${selectedDepartmentCourse}`,
      cancelToken: axiosCancelSourceDepartmentCourse.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    })
      .then(response => {
        setDepartmentCourseAcademics(response.data);
        setLoading(prevState => ({ ...prevState, departmentCourseAcademics: false }));
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(error.message);
        }
        else if (error.response) {
          console.log(error.response);
          setLoading(prevState => ({ ...prevState, departmentCourseAcademics: false }));
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
  useEffect(fetchPersonalCourseAcademics, [selectedPersonalCourse]);
  useEffect(fetchDepartmentCourseAcademics, [selectedDepartmentCourse]);

  const mapCoursesToDropdownItems = (courses, personal) => {
    if (courses.length === 0) {
      return <Dropdown.Item as="span">No Courses</Dropdown.Item>;
    }

    const setCourse = personal ? setSelectedPersonalCourse : setSelectedDepartmentCourse;
    const defaultItem = (
      <Dropdown.Item
        key=""
        onClick={() => { setCourse(""); }}
      >
        {personal ? "Select Course" : "All Staff"}
      </Dropdown.Item>
    );

    const dropdownItems = courses.map(course => (
      <Dropdown.Item
        key={course.id}
        onClick={() => { setCourse(course.id); }}
      >
        {course.id}
      </Dropdown.Item>
    ));
    dropdownItems.unshift(defaultItem);
    return dropdownItems;
  };
  const renderSelect = personal => {
    const courses = personal ? personalCourses : departmentCourses;
    const selectedCourse = personal ? (selectedPersonalCourse || "Select Course") : (selectedDepartmentCourse || "All Staff");

    return (
      <div className="view-select mt-3">
        <div>
          <span className="mr-2">Course</span>
          <DropdownButton bsPrefix="view-dropdown-button" title={selectedCourse}>
            {mapCoursesToDropdownItems(courses, personal)}
          </DropdownButton>
          <span className="ml-3 mr-2">Academic Type</span>
          <DropdownButton bsPrefix="view-dropdown-button" title={academicsType}>
            <Dropdown.Item
              key="All"
              onClick={() => { setAcademicsType("All"); }}
            >
              All
            </Dropdown.Item>
            <Dropdown.Item
              key="Course Instructor"
              onClick={() => { setAcademicsType("Course Instructor"); }}
            >
              Course Instructor
            </Dropdown.Item>
            <Dropdown.Item
              key="Teaching Assistant"
              onClick={() => { setAcademicsType("Teaching Assistant"); }}
            >
              Teaching Assistant
            </Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
    );
  };

  return (
    <div className="view-container">
      { isLoading.departmentCourses ? <Spinner /> : (
        <Tabs className="view-tabs" defaultActiveKey="personalCourses">
          <Tab className="view-tab" eventKey="personalCourses" title="My Courses">
            {renderSelect(true)}
            <ViewAcademics
              isLoading={isLoading.personalCourseAcademics}
              academics={personalCourseAcademics}
              course={selectedPersonalCourse}
              listType="Personal"
              academicsType={academicsType}
              updateAcademics={fetchPersonalCourseAcademics}
            />
          </Tab>
          <Tab className="view-tab" eventKey="departmentCourses" title="Department Courses">
            {renderSelect(false)}
            <ViewAcademics
              isLoading={isLoading.departmentCourseAcademics}
              academics={departmentCourseAcademics}
              course={selectedDepartmentCourse}
              listType="General"
              academicsType={academicsType}
              updateAcademics={fetchDepartmentCourseAcademics}
              updateCourses={fetchPersonalCourses}
            />
          </Tab>
        </Tabs>
      )}
    </div>
  );
}

export default AcademicMembers;
