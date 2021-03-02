import React, { useEffect, useState } from "react";
import Axios from "axios";
import {
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Alert
} from "reactstrap";
import AxiosInstance from "../../../../others/AxiosInstance";
import AuthTokenManager from "../../../../others/AuthTokenManager";
import SlotsTable from "../../../list_components/SlotsTable";
import useAxiosCancel from "../../../../hooks/AxiosCancel";

function SlotLinkingForm() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [course, setCourse] = useState("");
  const [courses, setCourses] = useState([]);
  const [slots, setSlots] = useState([]);
  const [active, setActive] = useState("");
  const [alert, setAlert] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

  const fetchMyCourses = async () => {
    await AxiosInstance.get("/staff/academic/get-my-courses", {
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    })
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(error.message);
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
  const chooseCourse = async id => {
    setCourse(id);
    await AxiosInstance.get(`/staff/ci/course-slots/${id}`, {
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    }).then(response => {
      setSlots(response.data);
    });
  };
  const sendRequest = async () => {
    await AxiosInstance.get("/staff/academic/send-slot-linking-request", {
      cancelToken: axiosCancelSource.token,
      method: "POST",
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
      data: {
        day: slots.filter(slot => slot._id === active)[0].day,
        room: slots.filter(slot => slot._id === active)[0].room,
        slot: slots.filter(slot => slot._id === active)[0].slotNumber,
      },
    }).then(response => setAlert(response.data)).catch(error => {
      setErrorMessage(error.data);
      if (Axios.isCancel(error)) {
        console.log(error.message);
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
  const dropdownCourses = courses.map(dropdownCourse => <DropdownItem onClick={() => chooseCourse(dropdownCourse.id)} key={dropdownCourse._id}>{`${dropdownCourse.id}: ${dropdownCourse.name}`}</DropdownItem>);
  const toggle = () => setDropdownOpen(prevState => !prevState);
  useEffect(fetchMyCourses, []);
  if (slots) {
    return (
      <div className="container">
        <div className="pl-8">
          <Dropdown className="bg-info" isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>
              {course || "Select course"}
            </DropdownToggle>
            <DropdownMenu>
              {dropdownCourses}
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="text-center"><h1>Choose a slot</h1></div>
        <SlotsTable slots={slots.filter(slot => slot.staffMember === "UNASSIGNED")} onClick={setActive} active={active} />
        <div className="form-button-div mb-2">
          <Button type="submit" className={active ? "bg-success" : ""} onClick={sendRequest}>Send Request</Button>
        </div>
        {alert ? <Alert className="bg-success">{alert}</Alert> : null}
        {errorMessage ? <Alert className="bg-danger">{errorMessage}</Alert> : null}
      </div>
    );
  }
  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>
        {course || "Select course"}
      </DropdownToggle>
      <DropdownMenu>
        {dropdownCourses}
      </DropdownMenu>
    </Dropdown>
  );
}
export default SlotLinkingForm;
