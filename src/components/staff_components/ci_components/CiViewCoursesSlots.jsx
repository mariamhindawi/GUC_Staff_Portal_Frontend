import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Dropdown, DropdownButton, Tab, Tabs } from "react-bootstrap";
import AxiosInstance from "../../../others/AxiosInstance";
import AuthTokenManager from "../../../others/AuthTokenManager";
import useAxiosCancel from "../../../hooks/AxiosCancel";
import Spinner from "../../helper_components/Spinner";
import SlotsTableList from "../../list_components/SlotsTableList";
import ScheduleDetailsModal from "../../helper_components/ScheduleDetailsModal";
import AssignAcademicModal from "../../helper_components/AssignAcademicModal";

function CiViewCoursesSlots() {
  const [isLoading, setLoading] = useState({
    personalCourses: true,
    departmentCourses: true,
    slots: false,
  });
  const [slots, setSlots] = useState([]);
  const [activeSlot, setActiveSlot] = useState("");
  const [unassignModalIsOpen, setUnassignModalOpen] = useState(false);
  const [unassignModalState, setUnassignModalState] = useState("will submit");
  const [unassignModalMessage, setUnassignModalMessage] = useState({ messageText: "", messageStyle: "" });
  const [personalCourses, setPersonalCourses] = useState([]);
  const [departmentCourses, setDepartmentCourses] = useState([]);
  const [selectedPersonalCourse, setSelectedPersonalCourse] = useState("");
  const [selectedDepartmentCourse, setSelectedDepartmentCourse] = useState("");
  const [courseToAssign, setCourseToAssign] = useState({});
  const [assignModalIsOpen, setAssignModalOpen] = useState(false);
  const [assignModalState, setAssignModalState] = useState("will submit");
  const [assignModalBodyText, setAssignModalBodyText] = useState("");
  const [assignModalMessage, setAssignModalMessage] = useState({ messageText: "", messageStyle: "" });
  const [modalVariable, setModalVariable] = useState("unassignAcademic");
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

  const fetchPersonalCourses = async () => {
    const url = "/staff/academic/get-my-courses";
    await AxiosInstance.get(url, {
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
    const url = "/staff/academic/get-department-courses";
    await AxiosInstance.get(url, {
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
  const fetchSlots = async id => {
    setLoading(prevState => ({ ...prevState, slots: true }));
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
        if (selectedDepartmentCourse === "") {
          fetchSlots(selectedPersonalCourse);
        }
        else {
          fetchSlots(selectedDepartmentCourse);
        }
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
      setAssignModalBodyText(`Assign academic to slot: ${slot}`);
    }
    setAssignModalOpen(prevState => !prevState);
  };
  const resetAssignModal = () => {
    setCourseToAssign({});
    setAssignModalState("will submit");
    setAssignModalBodyText("");
    setAssignModalMessage({ messageText: "", messageStyle: "" });
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
        if (selectedDepartmentCourse === "") {
          fetchSlots(selectedPersonalCourse);
        }
        else {
          fetchSlots(selectedDepartmentCourse);
        }
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
  const toggle = (slot, staffMember) => {
    setActiveSlot(slot);
    if (selectedDepartmentCourse !== "") {
      setModalVariable("schedule");
      toggleUnassignModal();
    }
    else if (staffMember !== "UNASSIGNED") {
      setModalVariable("unassignAcademic");
      toggleUnassignModal();
    }
    else {
      toggleAssignModal(slot);
    }
  };

  useEffect(fetchPersonalCourses, []);
  useEffect(fetchDepartmentCourses, []);

  const mapCoursesToDropdownItems = (courses, personal) => {
    if (courses.length === 0) {
      return <Dropdown.Item className="list-dropdown-item" as="span">No Assigned Courses</Dropdown.Item>;
    }
    const setCourse = personal ? setSelectedPersonalCourse : setSelectedDepartmentCourse;
    const removeSelected = personal ? setSelectedDepartmentCourse : setSelectedPersonalCourse;
    const dropdownItems = courses.map(course => (
      <Dropdown.Item
        key={course.id}
        onClick={() => { setCourse(course.id); fetchSlots(course.id); removeSelected(""); }}
      >
        {course.id}
      </Dropdown.Item>
    ));
    const defaultItem = (
      <Dropdown.Item
        key=""
        onClick={() => { setCourse(""); setLoading(false); removeSelected(""); }}
      >
        Select Course
      </Dropdown.Item>
    );
    dropdownItems.unshift(defaultItem);
    return dropdownItems;
  };
  const renderSelect = personal => {
    const courses = personal ? personalCourses : departmentCourses;
    const selectedCourse = personal ? (selectedPersonalCourse || "Select Course") : (selectedDepartmentCourse || "Select Course");

    return (
      <div className="view-select mt-3">
        <div>
          <span className="mr-2">Course</span>
          <DropdownButton bsPrefix="view-dropdown-button" title={selectedCourse}>
            {mapCoursesToDropdownItems(courses, personal)}
          </DropdownButton>
        </div>
      </div>
    );
  };

  return (
    <div className="view-container">
      { isLoading.personalCourses || isLoading.departmentCourses ? <Spinner /> : (
        <>
          <Tabs className="view-tabs" defaultActiveKey="personalCourses">
            <Tab className="view-tab" eventKey="personalCourses" title="My Courses">
              {renderSelect(true)}
              {selectedPersonalCourse !== ""
                ? (
                  <div className=" text-center">
                    {isLoading.slots ? <Spinner /> : (
                      <SlotsTableList slots={slots} activeSlot={activeSlot} onClick={toggle} />
                    )}
                  </div>
                )
                : null}
            </Tab>
            <Tab className="view-tab" eventKey="departmentCourses" title="Department Courses">
              {renderSelect(false)}
              {selectedDepartmentCourse !== ""
                ? (
                  <div className="text-center">
                    {isLoading.slots ? <Spinner /> : (
                      <SlotsTableList slots={slots} activeSlot={activeSlot} onClick={toggle} />
                    )}
                  </div>
                )
                : null}
            </Tab>
          </Tabs>
          <ScheduleDetailsModal
            isOpen={unassignModalIsOpen}
            state={unassignModalState}
            message={unassignModalMessage}
            slots={slots}
            toggle={toggleUnassignModal}
            reset={resetUnassignModal}
            activeSlot={activeSlot}
            unassignAcademic={unassignAcademic}
            unassign={modalVariable}
          />
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
        </>
      )}
    </div>
  );
}

export default CiViewCoursesSlots;
