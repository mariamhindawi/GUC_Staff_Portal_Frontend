import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AxiosInstance from "../../others/AxiosInstance";
import AuthTokenManager from "../../others/AuthTokenManager";
import ErrorMessages from "../../others/ErrorMessages";

function LoginForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const axiosCancelSource = Axios.CancelToken.source();

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
        localStorage.setItem("login", Date.now());
        dispatchEvent(new Event("login"));
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
  const cancelRequests = () => (
    () => { axiosCancelSource.cancel(ErrorMessages.requestCancellation); }
  );

  useEffect(cancelRequests, []);

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
            className="login-input"
            name="email"
            placeholder={placeholders.email}
            onFocus={e => handleFocus(e)}
            onBlur={e => handleBlur(e, formikProps)}
          />
          <div className="form-input-error-message">
            <ErrorMessage name="email" />
          </div>
          <br />

          <label htmlFor="password">
            <FontAwesomeIcon className="login-form-icon" icon="lock" />
          </label>
          <Field
            className="login-input"
            type="password"
            name="password"
            placeholder={placeholders.password}
            onFocus={e => handleFocus(e)}
            onBlur={e => handleBlur(e, formikProps)}
          />
          <div className="form-input-error-message">
            <ErrorMessage name="password" />
          </div>

          <div className="text-center">
            <button
              className="login-button"
              type="submit"
              disabled={formikProps.isSubmitting}
              onClick={() => { setErrorMessage(""); }}
            >
              LOG IN
            </button>
            <div className="form-error-message">{errorMessage}</div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;
