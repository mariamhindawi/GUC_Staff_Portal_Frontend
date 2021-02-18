import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import AxiosInstance from "../../others/AxiosInstance";
import AuthTokenManager from "../../others/AuthTokenManager";
import useAxiosCancel from "../../hooks/AxiosCancel";
import Input from "./form_input_components/Input";
import FormSubmit from "./form_helper_components/FormSubmit";

const ResetPasswordForm = () => {
  const [message, setMessage] = useState({ messageText: "", messageStyle: "" });
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
      setMessage({ messageText: "Entered passwords do not match", messageStyle: "error-message" });
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

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <Input label="Old Password" name="oldPassword" type="password" placeholder={placeholders.oldPassword} setMessage={setMessage} />
        <Input label="New Password" name="newPassword" type="password" placeholder={placeholders.newPassword} setMessage={setMessage} />
        <Input label="Confirm New Password" name="confirmedNewPassword" type="password" placeholder={placeholders.confirmedNewPassword} setMessage={setMessage} />

        <FormSubmit formType="update" message={message} setMessage={setMessage} />
      </Form>
    </Formik>
  );
};

export default ResetPasswordForm;
