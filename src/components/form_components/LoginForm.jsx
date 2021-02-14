import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import AxiosInstance from "../../others/AxiosInstance";
import AuthTokenManager from "../../others/AuthTokenManager";
import useAxiosCancel from "../../hooks/AxiosCancel";

function LoginForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

  const placeholders = {
    email: "Email",
    password: "Password",
  };
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("This field is required"),
    password: Yup.string()
      .required("This field is required"),
  });

  const handleSubmit = async (values, formikProps) => {
    await AxiosInstance({
      method: "post",
      url: "/staff/login",
      cancelToken: axiosCancelSource.token,
      data: {
        email: values.email,
        password: values.password,
      },
    })
      .then(response => {
        AuthTokenManager.setAuthAccessToken(response.headers["auth-access-token"]);
        window.dispatchEvent(new Event("login"));
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(`Request cancelled: ${error.message}`);
        }
        else if (error.response) {
          formikProps.setFieldValue("password", "");
          formikProps.setFieldTouched("password", false, false);
          setErrorMessage(error.response.data);
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
    setErrorMessage("");
  };
  const handleBlur = (e, formikProps) => {
    e.target.placeholder = placeholders[e.target.name];
    formikProps.setFieldTouched(e.target.name);
  };

  if (AuthTokenManager.getAuthAccessToken()) {
    return <Redirect to="/staff" />;
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {formikProps => (
        <Form>
          <label htmlFor="email">
            <FontAwesomeIcon className="login-form-icon" icon="user" />
          </label>
          <Field
            type="email"
            id="email"
            name="email"
            placeholder={placeholders.email}
            onFocus={e => handleFocus(e)}
            onBlur={e => handleBlur(e, formikProps)}
          />
          <span className="login-input-message error-message mb-2">
            <ErrorMessage name="email" />
          </span>

          <label htmlFor="password">
            <FontAwesomeIcon className="login-form-icon" icon="lock" />
          </label>
          <Field
            type="password"
            id="password"
            name="password"
            placeholder={placeholders.password}
            onFocus={e => handleFocus(e)}
            onBlur={e => handleBlur(e, formikProps)}
          />
          <span className="login-input-message error-message mb-3">
            <ErrorMessage name="password" />
          </span>

          <button
            type="submit"
            disabled={formikProps.isSubmitting}
            onClick={() => { setErrorMessage(""); }}
          >
            {formikProps.isSubmitting ? "LOGGING IN" : "LOG IN"}
            {formikProps.isSubmitting
              && <Spinner className="ml-2" variant="light" animation="border" size="sm" as="span" />}
          </button>

          <span className="error-message justify-content-center mt-1">{errorMessage}</span>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;
