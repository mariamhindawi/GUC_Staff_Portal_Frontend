import React, { useState, useEffect } from "react";
import {
  Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody
} from "reactstrap";
import Axios from "axios";
import AxiosInstance from "../../../others/AxiosInstance";
import AuthTokenManager from "../../../others/AuthTokenManager";
import SlotsTableList from "../../list_components/SlotsTableList";

const ViewTeachingAssignmentsComponent = () => {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState("");
  const [slots, setSlots] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [active, setActive] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const toggle = id => { setActive(id); setModalOpen(!modalOpen); };

  useEffect(() => {
    AxiosInstance.get("/staff/academic/get-academic-department", {
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    }).then(() => AxiosInstance.get("/staff/academic/get-department-courses", {
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    })).then(res => setCourses(res.data));
  }, []);

  const getCourseSlots = id => {
    AxiosInstance.get(`/staff/ci/course-slots/${id}`, {
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
      params: {
        id,
      },
    }).then(res => setSlots(res.data)).catch(err => console.log(err));
  };

  return (
    <>
      <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
        <DropdownToggle caret>
          {course ? courses.filter(cou => cou.id === course)[0].name : "Choose course"}
        </DropdownToggle>
        <DropdownMenu>
          {courses.map(cou => <DropdownItem onClick={() => {getCourseSlots(cou.id); setCourse(cou.id);}} key={cou._id}>{cou.name}</DropdownItem>)}
        </DropdownMenu>
      </Dropdown>
      <SlotsTableList slots={slots} active={active} onClick={toggle} />
      <Modal isOpen={modalOpen} toggle={toggle}>
        <ModalBody>
          {slots.filter(slot => slot._id === active).map(slot => (
            <ul key="slot._id" className="unstyled">
              <li key="k1">
                Slot:
                {slot.slotNumber}
              </li>
              <li key="k2">
                Day:
                {slot.day}
              </li>
              <li key="k3">
                Course:
                {slot.course}
              </li>
              <li key="k4">
                Room:
                {slot.room}
              </li>
              <li key="k5">
                Academic Member:
                {slot.staffMember}
              </li>
            </ul>
          ))}
        </ModalBody>
      </Modal>
    </>
  );
};

export default ViewTeachingAssignmentsComponent;
