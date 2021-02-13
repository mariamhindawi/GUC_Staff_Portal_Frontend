import React, { useState } from "react";
import Axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import AxiosInstance from "../../others/AxiosInstance";
import AuthTokenManager from "../../others/AuthTokenManager";
import useAxiosCancel from "../../hooks/AxiosCancel";
import FormButton from "../button_components/FormButton";

const ResetPasswordForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

  const placeholders = {
    oldPassword: "Enter old password",
    newPassword: "Enter new password",
    confirmedNewPassword: "Re-enter new password",
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
      .then(() => {
        window.dispatchEvent(new Event("reset-password"));
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
            type="password"
            id="oldPassword"
            name="oldPassword"
            placeholder={placeholders.oldPassword}
            onFocus={e => handleFocus(e)}
            onBlur={e => handleBlur(e, formikProps)}
          />
          <span className="form-input-message error-message">
            <ErrorMessage name="oldPassword" />
          </span>

          <label htmlFor="newPassword">
            New Password
          </label>
          <Field
            type="password"
            id="newPassword"
            name="newPassword"
            placeholder={placeholders.newPassword}
            onFocus={e => handleFocus(e)}
            onBlur={e => handleBlur(e, formikProps)}
          />
          <span className="form-input-message error-message">
            <ErrorMessage name="newPassword" />
          </span>

          <label htmlFor="confirmedNewPassword">
            Confirm New Password
          </label>
          <Field
            type="password"
            id="confirmedNewPassword"
            name="confirmedNewPassword"
            placeholder={placeholders.confirmedNewPassword}
            onFocus={e => handleFocus(e)}
            onBlur={e => handleBlur(e, formikProps)}
          />
          <span className="form-input-message error-message">
            <ErrorMessage name="confirmedNewPassword" />
          </span>

          <div className="form-submit">
            <span className="form-message error-message">{errorMessage}</span>

            <FormButton
              isSubmiting={formikProps.isSubmitting}
              onClick={() => { setErrorMessage(""); }}
            >
              {formikProps.isSubmitting ? "Saving changes" : "Save changes"}
            </FormButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ResetPasswordForm;
