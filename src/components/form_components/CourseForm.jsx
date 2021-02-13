import React, { useState } from "react";
import PropTypes from "prop-types";
import Axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import AxiosInstance from "../../others/AxiosInstance";
import AuthTokenManager from "../../others/AuthTokenManager";
import useAxiosCancel from "../../hooks/AxiosCancel";
import FormButton from "../button_components/FormButton";

function CourseForm(props) {
  const [message, setMessage] = useState({ messageText: "", messageStyle: "" });
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

  const placeholders = {
    id: "Course ID",
    name: "Course Name",
    department: "Department Name",
  };
  const initialValues = {
    id: props.course.id,
    name: props.course.name,
    department: props.course.department,
  };
  const validationSchema = Yup.object({
    id: Yup.string()
      .required("This field is required"),
    name: Yup.string()
      .required("This field is required"),
    department: Yup.string(),
  });

  const handleSubmit = async values => {
    setMessage({ messageText: "", messageStyle: "" });
    await AxiosInstance({
      method: props.formType === "add" ? "post" : "put",
      url: `/staff/hr/${props.formType}-course${props.formType === "add" ? "" : `/${props.course.id}`}`,
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
      data: {
        id: values.id,
        name: values.name,
        department: values.department,
      },
    })
      .then(response => {
        setMessage({ messageText: response.data, messageStyle: "success-message" });
        props.updateCourses();
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
                {props.formType === "add" ? "Add Course" : `Update Course "${props.course.id}"`}
              </div>

              <label htmlFor="id">
                ID
              </label>
              <Field
                type="text"
                id="id"
                name="id"
                placeholder={placeholders.id}
                onFocus={e => handleFocus(e)}
                onBlur={e => handleBlur(e, formikProps)}
              />
              <span className="form-input-message error-message">
                <ErrorMessage name="id" />
              </span>

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

              <label htmlFor="department">
                Department
              </label>
              <Field
                type="text"
                id="department"
                name="department"
                placeholder={placeholders.department}
                onFocus={e => handleFocus(e)}
                onBlur={e => handleBlur(e, formikProps)}
              />
              <span className="form-input-message error-message">
                <ErrorMessage name="department" />
              </span>

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

CourseForm.propTypes = {
  formType: PropTypes.oneOf(["add", "update"]).isRequired,
  course: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    department: PropTypes.string,
  }),
  updateCourses: PropTypes.func.isRequired,
};

CourseForm.defaultProps = {
  course: {
    id: "",
    name: "",
    department: "",
  },
};

export default CourseForm;