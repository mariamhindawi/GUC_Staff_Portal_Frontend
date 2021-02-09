import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import AxiosInstance from "../../others/AxiosInstance";
import AuthTokenManager from "../../others/AuthTokenManager";
import useAxiosCancel from "../../hooks/AxiosCancel";

const ResetPasswordForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  const axiosCancelSource = Axios.CancelToken.source();

  useAxiosCancel(axiosCancelSource);

  const placeholders = {
    oldPassword: "Old password",
    newPassword: "New password",
    confirmedNewPassword: "Confirm new password",
  };
  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmedNewPassword: "",
  };
  const validationSchema = Yup.object({
    oldPassword: Yup.string()
      .required("This field is required"),
    newPassword: Yup.string()
      .required("This field is required"),
    confirmedNewPassword: Yup.string()
      .required("This field is required"),
  });

  const handleSubmit = async (values, formikProps) => {
    if (values.newPassword !== values.confirmedNewPassword) {
      formikProps.setFieldValue("oldPassword", "", false);
      formikProps.setFieldTouched("oldPassword", false, false);
      formikProps.setFieldValue("newPassword", "", false);
      formikProps.setFieldTouched("newPassword", false, false);
      formikProps.setFieldValue("confirmedNewPassword", "", false);
      formikProps.setFieldTouched("confirmedNewPassword", false, false);
      setErrorMessage("Entered passwords do not match");
      return;
    }
    await AxiosInstance({
      method: "put",
      url: "/staff/reset-password",
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
      data: {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
        confirmedNewPassword: values.confirmedNewPassword,
      },
    })
      .then(response => {
        alert(`${response.data}\nPlease Login again`);
        AuthTokenManager.removeAuthAccessToken();
        localStorage.setItem("reset-password", Date.now());
        history.push("/login");
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(`Request cancelled: ${error.message}`);
        }
        else if (error.response) {
          formikProps.setFieldValue("oldPassword", "");
          formikProps.setFieldTouched("oldPassword", false, false);
          formikProps.setFieldValue("newPassword", "");
          formikProps.setFieldTouched("newPassword", false, false);
          formikProps.setFieldValue("confirmedNewPassword", "");
          formikProps.setFieldTouched("confirmedNewPassword", false, false);
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

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {formikProps => (
        <Form>
          <label htmlFor="oldPassword">
            Old Password
          </label>
          <Field
            className=""
            type="password"
            name="oldPassword"
            placeholder={placeholders.oldPassword}
            onFocus={e => handleFocus(e)}
            onBlur={e => handleBlur(e, formikProps)}
          />
          <span className="error-message">
            <ErrorMessage name="oldPassword" />
          </span>

          <label htmlFor="newPassword">
            New Password
          </label>
          <Field
            className=""
            type="password"
            name="newPassword"
            placeholder={placeholders.newPassword}
            onFocus={e => handleFocus(e)}
            onBlur={e => handleBlur(e, formikProps)}
          />
          <span className="error-message">
            <ErrorMessage name="newPassword" />
          </span>

          <label htmlFor="confirmedNewPassword">
            Confirmed New Password
          </label>
          <Field
            className=""
            type="password"
            name="confirmedNewPassword"
            placeholder={placeholders.confirmedNewPassword}
            onFocus={e => handleFocus(e)}
            onBlur={e => handleBlur(e, formikProps)}
          />
          <span className="error-message">
            <ErrorMessage name="confirmedNewPassword" />
          </span>

          <button
            type="submit"
            disabled={formikProps.isSubmitting}
            onClick={() => { setErrorMessage(""); }}
          >
            Reset Password
          </button>

          <span className="error-message">{errorMessage}</span>
        </Form>
      )}
    </Formik>
  );
};

export default ResetPasswordForm;
