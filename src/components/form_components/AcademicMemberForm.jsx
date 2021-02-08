import React, { useState } from "react";
import PropTypes from "prop-types";
import Axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "react-bootstrap";
import AxiosInstance from "../../others/AxiosInstance";
import AuthTokenManager from "../../others/AuthTokenManager";
import useAxiosCancel from "../../hooks/AxiosCancel";

const AcademicMemberForm = props => {
  const [message, setMessage] = useState({ messageText: "", messageStyle: "" });
  const axiosCancelSource = Axios.CancelToken.source();

  useAxiosCancel(axiosCancelSource);

  const placeholders = {
    name: "Name",
    email: "Email",
    department: "Department",
    office: "Office",
    salary: "Salary",
    password: "Password",
  };
  const initialValues = {
    name: props.academic.name,
    email: props.academic.email,
    gender: props.academic.gender,
    role: props.academic.role,
    department: props.academic.department,
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
      .required("This feild is required"),
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
      .oneOf(["Course Instructor", "Head of Department", "Teaching Assistant"], "Invalid role"),
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
        setMessage({ messageText: response.data, messageStyle: "form-success-message" });
        props.updateAcademics();
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(`Request cancelled: ${error.message}`);
        }
        else if (error.response) {
          setMessage({ messageText: error.response.data, messageStyle: "form-error-message" });
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
  };
  const handleBlur = (e, formikProps) => {
    e.target.placeholder = placeholders[e.target.name];
    formikProps.setFieldTouched(e.target.name);
  };
  const renderPassword = formikProps => (
    <>
      <label className="form-input-label col-sm-4" htmlFor="password">
        Password
      </label>
      <Field
        className="rounded form-input-border col-sm-8"
        name="password"
        type="password"
        placeholder={placeholders.password}
        onFocus={e => handleFocus(e)}
        onBlur={e => handleBlur(e, formikProps)}
      />
      <div className="form-input-error-message">
        <ErrorMessage name="password" />
      </div>
    </>
  );

  return (
    <div className="input-form add-room-form rounded-border container">
      <div className="pt-3 pb-3">
        <Formik
          className="row"
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {formikProps => (
            <Form>
              <label className="form-input-label col-sm-4" htmlFor="name">
                Name
              </label>
              <Field
                className="rounded form-input-border col-sm-8"
                name="name"
                placeholder={placeholders.name}
                onFocus={e => handleFocus(e)}
                onBlur={e => handleBlur(e, formikProps)}
              />
              <div className="form-input-error-message">
                <ErrorMessage name="name" />
              </div>

              <label className="form-input-label col-sm-4" htmlFor="email">
                Email
              </label>
              <Field
                className="rounded form-input-border col-sm-8"
                name="email"
                type="email"
                placeholder={placeholders.email}
                onFocus={e => handleFocus(e)}
                onBlur={e => handleBlur(e, formikProps)}
              />
              <div className="form-input-error-message">
                <ErrorMessage name="email" />
              </div>

              <label className="form-input-label col-sm-4" htmlFor="gender">
                Gender
              </label>
              <Field
                className="rounded form-input-border col-sm-8"
                as="select"
                name="gender"
                onFocus={e => handleFocus(e)}
                onBlur={e => handleBlur(e, formikProps)}
              >
                <option disabled value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Field>
              <div className="form-input-error-message">
                <ErrorMessage name="gender" />
              </div>

              <label className="form-input-label col-sm-4" htmlFor="role">
                Role
              </label>
              <Field
                className="rounded form-input-border col-sm-8"
                as="select"
                name="role"
                onFocus={e => handleFocus(e)}
                onBlur={e => handleBlur(e, formikProps)}
              >
                <option disabled value="">Role</option>
                <option value="Course Instructor">Course Instructor</option>
                <option value="Head of Department">Head of Department</option>
                <option value="Teaching Assistant">Teaching Assistant</option>
              </Field>
              <div className="form-input-error-message">
                <ErrorMessage name="role" />
              </div>

              <label className="form-input-label col-sm-4" htmlFor="department">
                Department
              </label>
              <Field
                className="rounded form-input-border col-sm-8"
                name="department"
                placeholder={placeholders.department}
                onFocus={e => handleFocus(e)}
                onBlur={e => handleBlur(e, formikProps)}
              />
              <div className="form-input-error-message">
                <ErrorMessage name="department" />
              </div>

              <label className="form-input-label col-sm-4" htmlFor="office">
                Office
              </label>
              <Field
                className="rounded form-input-border col-sm-8"
                name="office"
                placeholder={placeholders.office}
                onFocus={e => handleFocus(e)}
                onBlur={e => handleBlur(e, formikProps)}
              />
              <div className="form-input-error-message">
                <ErrorMessage name="office" />
              </div>

              <label className="form-input-label col-sm-4" htmlFor="salray">
                Salary
              </label>
              <Field
                className="rounded form-input-border col-sm-8"
                name="salary"
                placeholder={placeholders.salary}
                onFocus={e => handleFocus(e)}
                onBlur={e => handleBlur(e, formikProps)}
              />
              <div className="form-input-error-message">
                <ErrorMessage name="salary" />
              </div>

              <label className="form-input-label col-sm-4" htmlFor="dayOff">
                Day Off
              </label>
              <Field
                className="rounded form-input-border col-sm-8"
                as="select"
                name="dayOff"
                onFocus={e => handleFocus(e)}
                onBlur={e => handleBlur(e, formikProps)}
              >
                <option disabled value="">Day Off</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
              </Field>
              <div className="form-input-error-message">
                <ErrorMessage name="dayOff" />
              </div>

              {props.formType === "update" && renderPassword(formikProps)}

              <div className="form-button-div mb-2">
                <Button type="submit" disabled={formikProps.isSubmitting}>
                  {props.formType === "add" ? "Add academic member" : "Update academic member"}
                </Button>
              </div>

              <div className={message.messageStyle}>{message.messageText}</div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

AcademicMemberForm.propTypes = {
  formType: PropTypes.string.isRequired,
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
  updateAcademics: PropTypes.func,
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
  updateAcademics: () => { },
};

export default AcademicMemberForm;
