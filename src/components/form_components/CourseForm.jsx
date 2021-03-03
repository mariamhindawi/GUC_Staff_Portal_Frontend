import React, { useState } from "react";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import AxiosInstance from "../../others/AxiosInstance";
import AuthTokenManager from "../../others/AuthTokenManager";
import useAxiosCancel from "../../hooks/AxiosCancel";
import Input from "./form_input_components/Input";
import FormSubmit from "./form_helper_components/FormSubmit";

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
    department: props.course.department === "UNASSIGNED" ? "" : props.course.department,
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
              {props.formType === "add" ? "Add Course" : `Update Course "${props.course.id}"`}
            </div>

            <Input label="ID" name="id" placeholder={placeholders.id} setMessage={setMessage} />
            <Input label="Name" name="name" placeholder={placeholders.name} setMessage={setMessage} />
            <Input label="Department" name="department" placeholder={placeholders.department} setMessage={setMessage} />

            <FormSubmit formType={props.formType} message={message} setMessage={setMessage} />
          </Form>
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
