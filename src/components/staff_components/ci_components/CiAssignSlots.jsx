import React, { useEffect, useState } from "react";
import {
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Alert, Input
} from "reactstrap";
import AxiosInstance from "../../../others/AxiosInstance";
import AuthTokenManager from "../../../others/AuthTokenManager";
import SlotsTable from "../../list_components/SlotsTable";

const CIAssignSlots = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [course, setCourse] = useState("");
  const [courses, setCourses] = useState([]);
  const [slots, setSlots] = useState([]);
  const [active, setActive] = useState("");
  const [alert, setAlert] = useState("");
  const [error, setError] = useState("");
  const [academicMember, setAcademicMember] = useState("");

  useEffect(() => {
    AxiosInstance.get("staff/academic/get-my-courses", {
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    }).then(res => setCourses(res.data));
  }, []);
  const toggle = () => setDropdownOpen(prevState => !prevState);

  const chooseCourse = id => {
    setCourse(id);
    AxiosInstance.get(`staff/ci/course-slots/${id}`, {
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    }).then(res => {
      setSlots(res.data);
    });
  };
  const handleChange = event => {
    setAcademicMember(event.target.value);
  };

  const sendRequest = () => {
    AxiosInstance("staff/ci/assign-academic-member-to-slot", {
      method: "PUT",
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
      data: {
        id: academicMember,
        day: slots.filter(slot => slot._id === active)[0].day,
        room: slots.filter(slot => slot._id === active)[0].room,
        slotNumber: slots.filter(slot => slot._id === active)[0].slotNumber,
      },
    }).then(res => { console.log(res.data); setAlert(("Success")); }).catch(res => setError(res.data));
  };

  const dropdownCourses = courses.map(dropdownCourse => <DropdownItem onClick={() => chooseCourse(dropdownCourse.id)} key={dropdownCourse._id}>{`${dropdownCourse.id}: ${dropdownCourse.name}`}</DropdownItem>);
  if (slots) {
    return (
      <>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle caret>
            {course || "Select course"}
          </DropdownToggle>
          <DropdownMenu>
            {dropdownCourses}
          </DropdownMenu>
        </Dropdown>
        <h1>Choose a slot</h1>
        <SlotsTable slots={slots.filter(slot => slot.staffMember === "UNASSIGNED")} onClick={setActive} active={active} />
        {active ? <Input name="academicMember" value={academicMember} onChange={handleChange} /> : null}
        <Button type="submit" className={active ? "bg-primary" : ""} onClick={sendRequest}>Assign to slot</Button>
        {alert ? <Alert className="bg-success">{alert}</Alert> : null}
        {error ? <Alert className="bg-danger">{error}</Alert> : null}
      </>
    );
  }
  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>
        {course || "Choose course"}
      </DropdownToggle>
      <DropdownMenu>
        {dropdownCourses}
      </DropdownMenu>
    </Dropdown>
  );
};

export default CIAssignSlots;
