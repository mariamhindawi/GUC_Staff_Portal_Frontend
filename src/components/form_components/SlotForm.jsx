import React, { useState } from "react";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import AxiosInstance from "../../others/AxiosInstance";
import AuthTokenManager from "../../others/AuthTokenManager";
import useAxiosCancel from "../../hooks/AxiosCancel";
import Input from "./form_input_components/Input";
import Select from "./form_input_components/Select";
import RadioGroup from "./form_input_components/RadioGroup";
import RadioButton from "./form_input_components/RadioButton";
import FormSubmit from "./form_helper_components/FormSubmit";

function SlotForm(props) {
  const [message, setMessage] = useState({ messageText: "", messageStyle: "" });
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

  const placeholders = {
    room: "Room Name",
  };
  const initialValues = {
    day: props.slot.day,
    slotNumber: props.slot.slotNumber,
    room: props.slot.room,
    type: props.slot.type,
    course: props.slot.course,
  };
  const validationSchema = Yup.object({
    day: Yup.string()
      .required("This field is required")
      .oneOf(["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"], "Invalid day off"),
    slotNumber: Yup.string()
      .required("This field is required")
      .oneOf(["1", "2", "3", "4", "5"], "Invalid slot number"),
    room: Yup.string()
      .required("This field is required"),
    type: Yup.string()
      .required("This field is required")
      .oneOf(["Lecture", "Tutorial", "Lab"], "Invalid type"),
    course: Yup.string()
      .required("This field is required"),
  });
  const handleSubmit = async values => {
    setMessage({ messageText: "", messageStyle: "" });
    await AxiosInstance({
      method: props.formType === "add" ? "post" : "put",
      url: `/staff/cc/${props.formType}-course-slot${props.formType === "add" ? "" : `/${props.slot._id}`}`,
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
      data: {
        day: values.day,
        slotNumber: values.slotNumber,
        room: values.room,
        type: values.type,
        course: values.course,
      },
    })
      .then(response => {
        setMessage({ messageText: response.data, messageStyle: "success-message" });
        props.updateSlots();
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(error.message);
        }
        else if (error.response) {
          setMessage({ messageText: error.response.data, messageStyle: "error-message" });
        }
        else if (error.request) {
          console.log(error.request);
        }
        else {
          console.log(error.message);
        }
      });
  };

  const mapCoursesToDropdownItems = dropdwonCourses => {
    if (dropdwonCourses.length === 0) {
      return <option value="">No Assigned Courses</option>;
    }
    return dropdwonCourses.map(dropdwonCourse => (
      <option value={dropdwonCourse.id} key={dropdwonCourse.id}>{dropdwonCourse.id}</option>
    ));
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="form-title">
              {props.formType === "add" ? "Add Slot" : "Update Slot"}
            </div>

            <Select label="Day" name="day" setMessage={setMessage}>
              <option disabled value="">Choose Day</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
            </Select>
            <Select label="Slot number" name="slotNumber" setMessage={setMessage}>
              <option disabled value="">Choose slot number</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Select>
            <Input label="Room" name="room" placeholder={placeholders.room} setMessage={setMessage} />
            <RadioGroup label="Type" name="type" className="gender-radio-group">
              <div><RadioButton name="type" value="Tutorial" setMessage={setMessage}>Tutorial</RadioButton></div>
              <div><RadioButton name="type" value="Lab" setMessage={setMessage}>Lab</RadioButton></div>
              <div><RadioButton name="type" value="Lecture" setMessage={setMessage}>Lecture</RadioButton></div>
            </RadioGroup>
            <Select label="Course" name="course" setMessage={setMessage}>
              <option disabled value="">Choose Courses</option>
              {mapCoursesToDropdownItems(props.courses)}
            </Select>

            <FormSubmit formType={props.formType} message={message} setMessage={setMessage} />
          </Form>
        </Formik>
      </div>
    </div>
  );
}

SlotForm.propTypes = {
  formType: PropTypes.oneOf(["add", "update"]).isRequired,
  slot: PropTypes.shape({
    _id: PropTypes.string,
    day: PropTypes.string,
    slotNumber: PropTypes.string,
    room: PropTypes.string,
    type: PropTypes.string,
    course: PropTypes.string,
    staffMember: PropTypes.string,
  }),
  updateSlots: PropTypes.func.isRequired,
  courses: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    department: PropTypes.string,
    courseInstructors: PropTypes.arrayOf(PropTypes.string),
    teachingAssistants: PropTypes.arrayOf(PropTypes.string),
    courseCoordinator: PropTypes.string,
  })).isRequired,
};

SlotForm.defaultProps = {
  slot: {
    day: "",
    slotNumber: "",
    room: "",
    type: "",
    course: "",
    staffMember: "",
  },
};

export default SlotForm;
