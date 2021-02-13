import React, { useState } from "react";
import PropTypes from "prop-types";
import Axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import AxiosInstance from "../../others/AxiosInstance";
import AuthTokenManager from "../../others/AuthTokenManager";
import useAxiosCancel from "../../hooks/AxiosCancel";
import FormButton from "../button_components/FormButton";
import RadioButton from "../helper_components/RadioButton";

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
  const handleFocus = e => {
    e.target.placeholder = "";
    setMessage({ messageText: "", messageStyle: "" });
  };
  const handleBlur = (e, formikProps) => {
    e.target.placeholder = placeholders[e.target.name];
    formikProps.setFieldTouched(e.target.name);
  };
  const renderPassword = formikProps => (
    <>
      <label htmlFor="password">
        Password
      </label>
      <Field
        type="password"
        id="password"
        name="password"
        placeholder={placeholders.password}
        onFocus={e => handleFocus(e)}
        onBlur={e => handleBlur(e, formikProps)}
      />
      <span className="form-input-message error-message">
        <ErrorMessage name="password" />
      </span>
    </>
  );

  return (
    <div className="form-container">
      <div className="form-card">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {formikProps => (
            <Form>
              <div className="form-title">
                {props.formType === "add" ? "Add HR Member" : `Update HR Member "${props.hrMember.id}"`}
              </div>

              <label htmlFor="name">
                Name
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                placeholder={placeholders.name}
                onFocus={e => handleFocus(e)}
                onBlur={e => handleBlur(e, formikProps)}
              />
              <span className="form-input-message error-message">
                <ErrorMessage name="name" />
              </span>

              <label htmlFor="email">
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder={placeholders.email}
                onFocus={e => handleFocus(e)}
                onBlur={e => handleBlur(e, formikProps)}
              />
              <span className="form-input-message error-message">
                <ErrorMessage name="email" />
              </span>

              <label htmlFor="gender">
                Gender
              </label>
              <div className="gender-radio-group" id="gender">
                <div>
                  <RadioButton name="gender" value="Male" onFocus={e => handleFocus(e)}>
                    Male
                  </RadioButton>
                </div>
                <div>
                  <RadioButton name="gender" value="Female" onFocus={e => handleFocus(e)}>
                    Female
                  </RadioButton>
                </div>
              </div>
              <span className="form-input-message error-message">
                <ErrorMessage name="gender" />
              </span>

              <label htmlFor="office">
                Office
              </label>
              <Field
                type="text"
                id="office"
                name="office"
                placeholder={placeholders.office}
                onFocus={e => handleFocus(e)}
                onBlur={e => handleBlur(e, formikProps)}
              />
              <span className="form-input-message error-message">
                <ErrorMessage name="office" />
              </span>

              <label htmlFor="salary">
                Salary
              </label>
              <Field
                type="text"
                id="salary"
                name="salary"
                placeholder={placeholders.salary}
                onFocus={e => handleFocus(e)}
                onBlur={e => handleBlur(e, formikProps)}
              />
              <span className="form-input-message error-message">
                <ErrorMessage name="salary" />
              </span>

              {props.formType === "update" && renderPassword(formikProps)}

              <div className="form-submit">
                <span className={`form-message ${message.messageStyle}`}>{message.messageText}</span>

                <FormButton
                  isSubmiting={formikProps.isSubmitting}
                  onClick={() => { setMessage({ messageText: "", messageStyle: "" }); }}
                >
                  {props.formType === "add" && (formikProps.isSubmitting ? "Saving" : "Save")}
                  {props.formType === "update" && (formikProps.isSubmitting ? "Saving changes" : "Save changes")}
                </FormButton>
              </div>
            </Form>
          )}
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
