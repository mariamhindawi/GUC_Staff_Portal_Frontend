import React, { useState } from "react";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import AxiosInstance from "../../others/AxiosInstance";
import AuthTokenManager from "../../others/AuthTokenManager";
import useAxiosCancel from "../../hooks/AxiosCancel";
import Input from "./form_input_components/Input";
import RadioGroup from "./form_input_components/RadioGroup";
import RadioButton from "./form_input_components/RadioButton";
import FormSubmit from "./form_helper_components/FormSubmit";

function HrMemberForm(props) {
  const [message, setMessage] = useState({ messageText: "", messageStyle: "" });
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

  const placeholders = {
    name: "Full Name",
    email: "Email Address",
    office: "Room Name",
    salary: "Salary in EGP",
    password: "New Password",
  };
  const initialValues = {
    name: props.hrMember.name,
    email: props.hrMember.email,
    gender: props.hrMember.gender,
    office: props.hrMember.office,
    salary: props.hrMember.salary,
    password: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("This field is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("This field is required"),
    gender: Yup.string()
      .required("This field is required")
      .oneOf(["Male", "Female"], "Invalid gender"),
    office: Yup.string()
      .required("This feild is required"),
    salary: Yup.number()
      .typeError("Salary must be a number")
      .required("This field is required")
      .positive("Salary must be a positive number")
      .integer("Salary must be an integer"),
    password: Yup.string(),
  });
  const handleSubmit = async values => {
    setMessage({ messageText: "", messageStyle: "" });
    await AxiosInstance({
      method: props.formType === "add" ? "post" : "put",
      url: `/staff/hr/${props.formType}-hr-member${props.formType === "add" ? "" : `/${props.hrMember.id}`}`,
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
      data: {
        name: values.name,
        email: values.email,
        gender: values.gender,
        office: values.office,
        salary: values.salary,
        password: values.password,
      },
    })
      .then(response => {
        setMessage({ messageText: response.data, messageStyle: "success-message" });
        props.updateHrMembers();
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(`Request cancelled: ${error.message}`);
        }
        else if (error.response) {
          setMessage({ messageText: error.response.data, messageStyle: "error-message" });
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
              {props.formType === "add" ? "Add HR Member" : `Update HR Member "${props.hrMember.id}"`}
            </div>

            <Input label="Name" name="name" placeholder={placeholders.name} setMessage={setMessage} />
            <Input label="Email" name="email" type="email" placeholder={placeholders.email} setMessage={setMessage} />
            <RadioGroup label="Gender" name="gender" className="gender-radio-group">
              <div><RadioButton name="gender" value="Male" setMessage={setMessage}>Male</RadioButton></div>
              <div><RadioButton name="gender" value="Female" setMessage={setMessage}>Female</RadioButton></div>
            </RadioGroup>
            <Input label="Office" name="office" placeholder={placeholders.office} setMessage={setMessage} />
            <Input label="Salary" name="salary" placeholder={placeholders.salary} setMessage={setMessage} />
            {props.formType === "update"
              && <Input label="Password" name="password" type="password" placeholder={placeholders.password} setMessage={setMessage} />}

            <FormSubmit formType={props.formType} message={message} setMessage={setMessage} />
          </Form>
        </Formik>
      </div>
    </div>
  );
}

HrMemberForm.propTypes = {
  formType: PropTypes.oneOf(["add", "update"]).isRequired,
  hrMember: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    gender: PropTypes.string,
    salary: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    office: PropTypes.string,
  }),
  updateHrMembers: PropTypes.func.isRequired,
};

HrMemberForm.defaultProps = {
  hrMember: {
    id: "",
    name: "",
    email: "",
    gender: "",
    salary: "",
    office: "",
  },
};

export default HrMemberForm;
