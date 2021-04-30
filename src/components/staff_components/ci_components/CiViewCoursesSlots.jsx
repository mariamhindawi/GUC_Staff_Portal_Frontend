import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Dropdown, DropdownButton } from "react-bootstrap";
import AxiosInstance from "../../../others/AxiosInstance";
import AuthTokenManager from "../../../others/AuthTokenManager";
import useAxiosCancel from "../../../hooks/AxiosCancel";
import { useUserContext } from "../../../contexts/UserContext";
import Spinner from "../../helper_components/Spinner";
import SlotsTableList from "../../list_components/SlotsTableList";
import ScheduleDetailsModal from "../../helper_components/ScheduleDetailsModal";

function CiViewCoursesSlots() {
  const [isLoading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [slots, setSlots] = useState([]);
  const [activeSlot, setActiveSlot] = useState("");
  const [unassignModalIsOpen, setUnassignModalOpen] = useState(false);
  const [unassignModalState, setUnassignModalState] = useState("will submit");
  const [unassignModalMessage, setUnassignModalMessage] = useState({ messageText: "", messageStyle: "" });
  const user = useUserContext();
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

  const fetchCourses = async () => {
    const url = user.role === "Course Instructor" ? "/staff/academic/get-my-courses" : "/staff/academic/get-department-courses";
    setLoading(true);
    await AxiosInstance.get(url, {
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    })
      .then(response => {
        setCourses(response.data);
        setLoading(false);
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(error.message);
        }
        else if (error.response) {
          console.log(error.response);
          setLoading(false);
        }
        else if (error.request) {
          console.log(error.request);
        }
        else {
          console.log(error.message);
        }
      });
  };
  const fetchSlots = async id => {
    setLoading(true);
    await AxiosInstance({
      method: "get",
      url: `staff/academic/get-slots/${id}`,
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    })
      .then(response => {
        setSlots(response.data);
        setLoading(false);
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(error.message);
        }
        else if (error.response) {
          console.log(error.response);
          setLoading(false);
        }
        else if (error.request) {
          console.log(error.request);
        }
        else {
          console.log(error.message);
        }
      });
  };
  const unassignAcademic = async () => {
    setUnassignModalState("submitting");
    await AxiosInstance({
      method: "delete",
      url: "staff/ci/unassign-academic-member-from-slot",
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
      data: {
        day: slots.filter(slot => slot._id === activeSlot)[0].day,
        room: slots.filter(slot => slot._id === activeSlot)[0].room,
        slotNumber: slots.filter(slot => slot._id === activeSlot)[0].slotNumber,
      },
    })
      .then(response => {
        setUnassignModalMessage({
          messageText: response.data,
          messageStyle: "success",
        });
        setUnassignModalState("submitted");
        fetchSlots();
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(error.message);
        }
        else if (error.response) {
          setUnassignModalMessage({
            messageText: error.response.data,
            messageStyle: "danger",
          });
          setUnassignModalState("submitted");
        }
        else if (error.request) {
          console.log(error.request);
        }
        else {
          console.log(error.message);
        }
      });
  };
  const toggleUnassignModal = () => {
    setUnassignModalOpen(prevState => !prevState);
  };
  const resetUnassignModal = () => {
    setUnassignModalState("will submit");
    setUnassignModalMessage({ messageText: "", messageStyle: "" });
  };

  const toggle = slot => {
    setActiveSlot(slot);
    toggleUnassignModal();
  };

  useEffect(fetchCourses, []);
  const mapCoursesToDropdownItems = dropdownCourses => {
    if (dropdownCourses.length === 0) {
      return <Dropdown.Item className="list-dropdown-item" as="span">No Assigned Courses</Dropdown.Item>;
    }
    const dropdownItems = dropdownCourses.map(course => (
      <Dropdown.Item
        key={course.id}
        onClick={() => { setSelectedCourse(course.id); fetchSlots(course.id); }}
      >
        {course.id}
      </Dropdown.Item>
    ));
    const defaultItem = (
      <Dropdown.Item
        key=""
        onClick={() => { setSelectedCourse(""); setLoading(false); }}
      >
        Select Course
      </Dropdown.Item>
    );
    dropdownItems.unshift(defaultItem);
    return dropdownItems;
  };
  if (isLoading) {
    return (
      <div className="view-container">
        <div className="view-select">
          <span className="mr-2">Course</span>
          <DropdownButton bsPrefix="view-dropdown-button" title={selectedCourse || "Choose course"}>
            {mapCoursesToDropdownItems(courses)}
          </DropdownButton>
        </div>
        <Spinner />
      </div>
    );
  }
  return (
    <div className="view-container">
      <div className="view-select">
        <span className="mr-2">Course</span>
        <DropdownButton bsPrefix="view-dropdown-button" title={selectedCourse || "Choose course"}>
          {mapCoursesToDropdownItems(courses)}
        </DropdownButton>
      </div>
      {selectedCourse === "" ? null : (
        <div className=" view-container text-center">
          <SlotsTableList slots={slots.filter(sl => sl.staffMember !== "UNASSIGNED")} activeSlot={activeSlot} onClick={toggle} />
          <ScheduleDetailsModal
            isOpen={unassignModalIsOpen}
            state={unassignModalState}
            message={unassignModalMessage}
            slots={slots}
            toggle={toggleUnassignModal}
            reset={resetUnassignModal}
            activeSlot={activeSlot}
            unassignAcademic={unassignAcademic}
            unassign="unassignAcademic"
          />
        </div>
      )}
    </div>
  );
}

export default CiViewCoursesSlots;
