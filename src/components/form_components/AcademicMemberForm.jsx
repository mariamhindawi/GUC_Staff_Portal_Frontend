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

function AcademicMemberForm(props) {
  const [message, setMessage] = useState({ messageText: "", messageStyle: "" });
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

  const placeholders = {
    name: "Full Name",
    email: "Email Address",
    department: "Department Name",
    office: "Room Name",
    salary: "Salary in EGP",
    password: "New Password",
  };
  const initialValues = {
    name: props.academic.name,
    email: props.academic.email,
    gender: props.academic.gender,
    role: props.academic.role,
    department: props.academic.department === "UNASSIGNED" ? "" : props.academic.department,
    office: props.academic.office,
    salary: props.academic.salary,
    dayOff: props.academic.dayOff,
    password: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("This field is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("This field is required"),
    department: Yup.string(),
    office: Yup.string()
      .required("This field is required"),
    salary: Yup.number()
      .typeError("Salary must be a number")
      .required("This field is required")
      .positive("Salary must be a positive number")
      .integer("Salary must be an integer"),
    gender: Yup.string()
      .required("This field is required")
      .oneOf(["Male", "Female"], "Invalid gender"),
    role: Yup.string()
      .required("This field is required")
      .oneOf(["Course Instructor", "Head of Department", "Teaching Assistant", "Course Coordinator"], "Invalid role"),
    dayOff: Yup.string()
      .required("This field is required")
      .oneOf(["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"], "Invalid day off"),
    password: Yup.string(),
  });
  const handleSubmit = async values => {
    setMessage({ messageText: "", messageStyle: "" });
    await AxiosInstance({
      method: props.formType === "add" ? "post" : "put",
      url: `/staff/hr/${props.formType}-academic-member${props.formType === "add" ? "" : `/${props.academic.id}`}`,
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
      data: {
        name: values.name,
        email: values.email,
        gender: values.gender,
        role: values.role,
        department: values.department,
        office: values.office,
        salary: values.salary,
        dayOff: values.dayOff,
        password: values.password,
      },
    })
      .then(response => {
        setMessage({ messageText: response.data, messageStyle: "success-message" });
        props.updateAcademics();
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
              {props.formType === "add" ? "Add Academic" : `Update Academic "${props.academic.id}"`}
            </div>

            <Input label="Name" name="name" placeholder={placeholders.name} setMessage={setMessage} />
            <Input label="Email" name="email" type="email" placeholder={placeholders.email} setMessage={setMessage} />
            <RadioGroup label="Gender" name="gender" className="gender-radio-group">
              <div><RadioButton name="gender" value="Male" setMessage={setMessage}>Male</RadioButton></div>
              <div><RadioButton name="gender" value="Female" setMessage={setMessage}>Female</RadioButton></div>
            </RadioGroup>
            <Select label="Role" name="role" setMessage={setMessage}>
              <option disabled value="">Choose Role</option>
              <option value="Course Instructor">Course Instructor</option>
              <option value="Head of Department">Head of Department</option>
              <option value="Teaching Assistant">Teaching Assistant</option>
              <option disabled value="Course Coordinator">Course Coordinator</option>
            </Select>
            <Input label="Department" name="department" placeholder={placeholders.department} setMessage={setMessage} />
            <Input label="Office" name="office" placeholder={placeholders.office} setMessage={setMessage} />
            <Input label="Salary" name="salary" placeholder={placeholders.salary} setMessage={setMessage} />
            <Select label="Day Off" name="dayOff" setMessage={setMessage}>
              <option disabled value="">Choose Day Off</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
            </Select>
            {props.formType === "update"
              && <Input label="Password" name="password" type="password" placeholder={placeholders.password} setMessage={setMessage} />}

            <FormSubmit formType={props.formType} message={message} setMessage={setMessage} />
          </Form>
        </Formik>
      </div>
    </div>
  );
}

AcademicMemberForm.propTypes = {
  formType: PropTypes.oneOf(["add", "update"]).isRequired,
  academic: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    gender: PropTypes.string,
    salary: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    role: PropTypes.string,
    department: PropTypes.string,
    dayOff: PropTypes.string,
    office: PropTypes.string,
  }),
  updateAcademics: PropTypes.func.isRequired,
};

AcademicMemberForm.defaultProps = {
  academic: {
    id: "",
    name: "",
    email: "",
    gender: "",
    salary: "",
    role: "",
    department: "",
    office: "",
    dayOff: "",
  },
};

export default AcademicMemberForm;
