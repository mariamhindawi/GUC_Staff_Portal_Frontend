import React, { useEffect, useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import Axios from "axios";
import AxiosInstance from "../../../others/AxiosInstance";
import AuthTokenManager from "../../../others/AuthTokenManager";
import useAxiosCancel from "../../../hooks/AxiosCancel";
import Spinner from "../../helper_components/Spinner";
import SlotsTableList from "../../list_components/SlotsTableList";
import AssignAcademicModal from "../../helper_components/AssignAcademicModal";

function CiAssignSlots() {
  const [isLoading, setLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [courses, setCourses] = useState([]);
  const [slots, setSlots] = useState([]);
  const [activeSlot, setActiveSlot] = useState("");
  const [courseToAssign, setCourseToAssign] = useState({});
  const [assignModalIsOpen, setAssignModalOpen] = useState(false);
  const [assignModalState, setAssignModalState] = useState("will submit");
  const [assignModalBodyText, setAssignModalBodyText] = useState("");
  const [assignModalMessage, setAssignModalMessage] = useState({ messageText: "", messageStyle: "" }); const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

  const fetchCourses = async () => {
    const url = "/staff/academic/get-my-courses";
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
  const assignAcademic = async academic => {
    setAssignModalState("submitting");
    await AxiosInstance({
      method: "put",
      url: "staff/ci/assign-academic-member-to-slot",
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
      data: {
        id: academic,
        day: slots.filter(slot => slot._id === activeSlot)[0].day,
        room: slots.filter(slot => slot._id === activeSlot)[0].room,
        slotNumber: slots.filter(slot => slot._id === activeSlot)[0].slotNumber,
      },
    })
      .then(async response => {
        setAssignModalMessage({
          messageText: response.data,
          messageStyle: "success",
        });
        setAssignModalState("submitted");
        fetchSlots();
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(error.message);
        }
        else if (error.response) {
          setAssignModalMessage({
            messageText: error.response.data,
            messageStyle: "danger",
          });
          setAssignModalState("submitted");
        }
        else if (error.request) {
          console.log(error.request);
        }
        else {
          console.log(error.message);
        }
      });
  };
  const toggleAssignModal = slot => {
    if (slot) {
      setActiveSlot(slot);
      setAssignModalBodyText(`Assign academic to slot: ${activeSlot}`);
    }
    setAssignModalOpen(prevState => !prevState);
  };
  const resetAssignModal = () => {
    setCourseToAssign({});
    setAssignModalState("will submit");
    setAssignModalBodyText("");
    setAssignModalMessage({ messageText: "", messageStyle: "" });
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
          <SlotsTableList slots={slots.filter(slot => slot.staffMember === "UNASSIGNED")} onClick={toggleAssignModal} activeSlot={activeSlot} />
          <AssignAcademicModal
            isOpen={assignModalIsOpen}
            state={assignModalState}
            message={assignModalMessage}
            bodyText={assignModalBodyText}
            courseToAssign={courseToAssign}
            assignAcademic={assignAcademic}
            toggle={toggleAssignModal}
            reset={resetAssignModal}
            academicRole="Academic"
          />
        </div>
      )}
    </div>
  );
}

export default CiAssignSlots;
