import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import AxiosInstance from "../../others/AxiosInstance";
import AuthTokenManager from "../../others/AuthTokenManager";
import useAxiosCancel from "../../hooks/AxiosCancel";
import Input from "./form_input_components/Input";

function LoginForm() {
  const [errorMessage, setErrorMessage] = useState({ messageText: "" });
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
          setErrorMessage({ messageText: error.response.data });
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
          <Input name="email" type="email" placeholder={placeholders.email} setMessage={setErrorMessage} />

          <label htmlFor="password">
            <FontAwesomeIcon className="login-form-icon" icon="lock" />
          </label>
          <Input name="password" type="password" placeholder={placeholders.password} setMessage={setErrorMessage} />

          <button
            type="submit"
            disabled={formikProps.isSubmitting}
            onClick={() => { setErrorMessage({ messageText: "" }); }}
          >
            {formikProps.isSubmitting ? "LOGGING IN" : "LOG IN"}
            {formikProps.isSubmitting
              && <Spinner className="ml-2" variant="light" animation="border" size="sm" as="span" />}
          </button>

          <span className="error-message justify-content-center mt-1">{errorMessage.messageText}</span>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;
