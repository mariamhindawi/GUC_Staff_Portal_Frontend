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

function FacultyForm(props) {
  const [message, setMessage] = useState({ messageText: "", messageStyle: "" });
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

  const placeholders = {
    name: "Faculty Name",
  };
  const initialValues = {
    name: props.faculty.name,
  };
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("This field is required"),
  });
  const handleSubmit = async values => {
    setMessage({ messageText: "", messageStyle: "" });
    await AxiosInstance({
      method: props.formType === "add" ? "post" : "put",
      url: `/staff/hr/${props.formType}-faculty${props.formType === "add" ? "" : `/${props.faculty.name}`}`,
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
      data: {
        name: values.name,
      },
    })
      .then(response => {
        setMessage({ messageText: response.data, messageStyle: "success-message" });
        props.updateFaculties();
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
              {props.formType === "add" ? "Add Faculty" : `Update Faculty "${props.faculty.name}"`}
            </div>

            <Input label="Name" name="name" placeholder={placeholders.name} setMessage={setMessage} />

            <FormSubmit formType={props.formType} message={message} setMessage={setMessage} />
          </Form>
        </Formik>
      </div>
    </div>
  );
}

FacultyForm.propTypes = {
  formType: PropTypes.oneOf(["add", "update"]).isRequired,
  faculty: PropTypes.shape({
    name: PropTypes.string,
  }),
  updateFaculties: PropTypes.func.isRequired,
};

FacultyForm.defaultProps = {
  faculty: {
    name: "",
  },
};

export default FacultyForm;
