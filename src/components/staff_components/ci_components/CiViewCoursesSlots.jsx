import React, { useState, useEffect } from "react";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody, ModalFooter } from "reactstrap";
import Axios from "axios";
import AxiosInstance from "../../../others/AxiosInstance";
import AuthTokenManager from "../../../others/AuthTokenManager";
import SlotsTableList from "../../list_components/SlotsTableList";

const CICoursesSlotsComponent = () => {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState("");
  const [slots, setSlots] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [active, setActive] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const toggle = (id) => { setActive(id); setModalOpen(!modalOpen); };

  useEffect(() => {
    AxiosInstance.get("staff/academic/get-my-courses", {
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken()
      }
    }).then(res => setCourses(res.data));
  }, []);

  const getCourseSlots = (id) => {
    setCourse(id);
    AxiosInstance.get(`staff/academic/course-slots/${id}`, {
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken()
      },
    }).then(res => setSlots(res.data)).catch(err => console.log(err));
  };
  const handleSubmit = (event) => {
    toggle("");
    AxiosInstance("staff/ci/delete-academic-member-from-slot", {
      method: "DELETE",
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken()
      },
      data: {
        day: slots.filter(slot => slot._id === active)[0].day,
        room: slots.filter(slot => slot._id === active)[0].room,
        slotNumber: slots.filter(slot => slot._id === active)[0].slotNumber
      }
    }).then(() => AxiosInstance.get(`staff/academic/course-slots/${course}`, {
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken()
      },
    }).then(res => setSlots(res.data)).catch(err => console.log(err)));
  };
  let dropdownItems = courses.map(course => <DropdownItem onClick={() => getCourseSlots(course.id)} key={course._id}>{course.name}</DropdownItem>);
  return <>
    <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
      <DropdownToggle caret>
        {course ? courses.filter(cou => cou.id === course)[0].name : "Choose course"}
      </DropdownToggle>
      <DropdownMenu>
        {dropdownItems}
      </DropdownMenu>
    </Dropdown>
    <SlotsTableList slots={slots.filter(sl => sl.staffMember !== "UNASSIGNED")} active={active} onClick={toggle} />
    <Modal isOpen={modalOpen} toggle={toggle}>
      <ModalBody>
        {slots.filter(slot => slot._id === active).map(slot => {
          return <ul key={slot._id} className="unstyled">
            <li key={slot._id + "k1"}>Slot: {slot.slotNumber}</li>
            <li key={slot._id + "k2"}>Day: {slot.day}</li>
            <li key={slot._id + "k3"}>Course: {slot.course}</li>
            <li key={slot._id + "k4"}>Room: {slot.room}</li>
            <li key={slot._id + "k5"}>Academic Member: {slot.staffMember}</li>
          </ul>;
        })}
      </ModalBody>
      <ModalFooter>
        <Button type="submit" className="bg-danger" onClick={handleSubmit}>
          Unassign
                </Button>
      </ModalFooter>
    </Modal>
  </>;
};

export default CICoursesSlotsComponent;