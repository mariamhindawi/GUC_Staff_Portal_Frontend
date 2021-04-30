import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Dropdown, DropdownButton } from "react-bootstrap";
import AxiosInstance from "../../../../others/AxiosInstance";
import useAxiosCancel from "../../../../hooks/AxiosCancel";
import AuthTokenManager from "../../../../others/AuthTokenManager";
import SlotsTableList from "../../../list_components/SlotsTableList";
import Spinner from "../../../helper_components/Spinner";
import FormButton from "../../../button_components/FormButton";

function SlotLinkingRequest() {
  const [isLoading, setLoading] = useState(true);
  const [personalCourses, setPersonalCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [message, setMessage] = useState({ messageText: "", messageStyle: "" });
  const [slots, setSlots] = useState([]);
  const [activeSlot, setActiveSlot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

  const fetchPersonalCourses = async () => {
    const url = "/staff/academic/get-my-courses";
    setLoading(true);
    await AxiosInstance.get(url, {
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    })
      .then(response => {
        setPersonalCourses(response.data);
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
  const sendRequest = async () => {
    setIsSubmitting(true);
    await AxiosInstance({
      method: "post",
      url: "staff/academic/send-slot-linking-request",
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
      data: {
        day: slots.filter(slot => slot._id === activeSlot)[0].day,
        room: slots.filter(slot => slot._id === activeSlot)[0].room,
        slot: slots.filter(slot => slot._id === activeSlot)[0].slotNumber,
      },
    })
      .then(response => {
        setMessage({ messageText: response.data, messageStyle: "success-message" });
        setIsSubmitting(false);
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(error.message);
        }
        else if (error.response) {
          setMessage({ messageText: error.response.data, messageStyle: "error-message" });
          setIsSubmitting(false);
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
  useEffect(fetchPersonalCourses, []);

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
      <>
        <div className="view-select">
          <span className="mr-2">Course</span>
          <DropdownButton bsPrefix="view-dropdown-button" title={selectedCourse || "Choose course"}>
            {mapCoursesToDropdownItems(personalCourses)}
          </DropdownButton>
        </div>
        <Spinner />
      </>
    );
  }

  return (
    <>
      <div className="view-select">
        <span className="mr-2">Course</span>
        <DropdownButton bsPrefix="view-dropdown-button" title={selectedCourse || "Choose course"}>
          {mapCoursesToDropdownItems(personalCourses)}
        </DropdownButton>
      </div>
      {selectedCourse === "" ? null : (
        <div className="view-container text-center">
          <SlotsTableList
            slots={slots.filter(slot => slot.staffMember === "UNASSIGNED")}
            onClick={setActiveSlot}
            activeSlot={activeSlot}
            request="slotLinkingRequest"
          />
          {activeSlot !== "" ? (
            <div className="form-submit slot-linking-send-button">
              <FormButton
                isSubmiting={isSubmitting}
                onClick={() => { setMessage({ messageText: "", messageStyle: "" }); sendRequest(); }}
              >
                {isSubmitting ? "Sending" : "Send"}
              </FormButton>
              <span className={message.messageStyle}>{message.messageText}</span>
            </div>
          )
            : null}
        </div>
      )}
    </>
  );
}

export default SlotLinkingRequest;
