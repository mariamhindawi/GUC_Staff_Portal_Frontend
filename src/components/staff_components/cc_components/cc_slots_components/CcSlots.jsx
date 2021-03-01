import React, { useEffect, useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { Dropdown, DropdownButton } from "react-bootstrap";
import Axios from "axios";
import AxiosInstance from "../../../../others/AxiosInstance";
import AuthTokenManager from "../../../../others/AuthTokenManager";
import useAxiosCancel from "../../../../hooks/AxiosCancel";
import Spinner from "../../../helper_components/Spinner";
import CcViewSlots from "./CcViewSlots";
import CcAddSlot from "./CcAddSlot";
import CcUpdateSlot from "./CcUpdateSlot";

function CcSlots() {
  const [isLoading, setLoading] = useState({ courses: true, slots: true });
  const [slots, setSlots] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const match = useRouteMatch();
  const axiosCancelSource = Axios.CancelToken.source();
  const axiosCancelSource2 = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);
  useAxiosCancel(axiosCancelSource2, [selectedCourse]);

  const fetchCourses = async () => {
    setLoading(prevState => ({ ...prevState, courses: true }));
    await AxiosInstance.get("/staff/cc/get-course-coordinator-courses/", {
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    })
      .then(response => {
        setCourses(response.data);
        setSelectedCourse("");
        setLoading(prevState => ({ ...prevState, courses: false }));
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(error.message);
        }
        else if (error.response) {
          console.log(error.response);
          setLoading(prevState => ({ ...prevState, courses: false }));
        }
        else if (error.request) {
          console.log(error.request);
        }
        else {
          console.log(error.message);
        }
      });
  };
  const fetchSlots = async () => {
    if (selectedCourse === "") {
      setLoading(prevState => ({ ...prevState, slots: false }));
      return;
    }
    setLoading(prevState => ({ ...prevState, slots: true }));
    await AxiosInstance(`/staff/academic/get-slots/${selectedCourse}`, {
      cancelToken: axiosCancelSource2.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    })
      .then(response => {
        setSlots(response.data);
        setLoading(prevState => ({ ...prevState, slots: false }));
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(error.message);
        }
        else if (error.response) {
          console.log(error.response);
          setLoading(prevState => ({ ...prevState, slots: false }));
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
  useEffect(fetchSlots, [selectedCourse]);

  const mapCoursesToDropdownItems = dropdownCourses => {
    if (dropdownCourses.length === 0) {
      return <Dropdown.Item className="list-dropdown-item" as="span">No Assigned Courses</Dropdown.Item>;
    }
    const dropdownItems = dropdownCourses.map(course => (
      <Dropdown.Item
        key={course.id}
        onClick={() => { setSelectedCourse(course.id); }}
      >
        {course.id}
      </Dropdown.Item>
    ));
    const defaultItem = (
      <Dropdown.Item
        key=""
        onClick={() => { setSelectedCourse(""); }}
      >
        Select Course
      </Dropdown.Item>
    );
    dropdownItems.unshift(defaultItem);
    return dropdownItems;
  };

  if (isLoading.courses) {
    return <Spinner />;
  }
  return (
    <Switch>
      <Route exact path={`${match.path}`}>
        <div className="view-container slot-list-container">
          <div className="view-select">
            <span className="mr-2">Course</span>
            <DropdownButton bsPrefix="view-dropdown-button" title={selectedCourse || "Choose course"}>
              {mapCoursesToDropdownItems(courses)}
            </DropdownButton>
          </div>
          {isLoading.slots ? <Spinner /> : selectedCourse && (
            <CcViewSlots
              isLoading={isLoading.slots}
              slots={slots}
              updateSlots={fetchSlots}
            />
          )}
        </div>
      </Route>

      <Route exact path={`${match.path}/add`}>
        <CcAddSlot courses={courses} updateSlots={fetchSlots} />
      </Route>

      <Route exact path={`${match.path}/update/:_id`}>
        <CcUpdateSlot slots={slots} courses={courses} updateSlots={fetchSlots} />
      </Route>
    </Switch>
  );
}

export default CcSlots;
