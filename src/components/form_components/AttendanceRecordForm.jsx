import React, { useState } from "react";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import AxiosInstance from "../../others/AxiosInstance";
import AuthTokenManager from "../../others/AuthTokenManager";
import useAxiosCancel from "../../hooks/AxiosCancel";
import Input from "./form_input_components/Input";
import DatePickerField from "./form_input_components/DatePickerField";
import TimePickerField from "./form_input_components/TimePickerField";
import FormSubmit from "./form_helper_components/FormSubmit";

function AttendanceRecordForm(props) {
  const [message, setMessage] = useState({ messageText: "", messageStyle: "" });
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

  const placeholders = {
    user: "User ID",
    day: "Choose day",
    signInTime: "",
    signOutTime: "",
  };
  const initialValues = {
    user: "",
    day: "",
    signInTime: "",
    signOutTime: "",
  };
  const validationSchema = Yup.object({
    user: props.record ? null : Yup.string()
      .required("This field is required")
      .matches(/(([a][c]|[h][r])[-][0-9]+)$/, "Invalid user id"),
    day: !props.record && Yup.date()
      .typeError("Invalid date")
      .required("This field is required")
      .max(new Date(Date.now() - 24 * 60 * 60 * 1000), "Date must be before current day"),
    signIn: (!props.record || !props.record.signInTime) && Yup.date()
      .typeError("Invalid date")
      .required("Sign in time is required"),
    signOut: (!props.record || !props.record.signOutTime) && Yup.date()
      .typeError("Invalid date")
      .required("Sign out time is required"),
  });
  const handleSubmit = values => {
    let type;
    let signInTime;
    let signOutTime;
    if (!props.record) {
      type = "Full Record";
      signInTime = new Date(values.signIn.setDate(values.day.getDate()));
      signOutTime = new Date(values.signOut.setDate(values.day.getDate()));
    }
    else if (props.record.signInTime) {
      type = "Sign Out";
      signOutTime = values.signOut.setDate(props.record.signInTime).getDate();
    }
    else {
      type = "Sign In";
      signInTime = values.signIn.setDate(props.record.signOutTime).getDate();
    }
    AxiosInstance({
      method: "post",
      url: "/staff/hr/add-missing-attendance-record",
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
      data: {
        userId: props.record ? props.record.user : values.user,
        recordType: type,
        recordId: type === "Full Record" && props.record._id,
        signInTime,
        signOutTime,
      },
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        if (error.response) {
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
    <div className="form-container">
      <div className="form-card">
        <Formik
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          initialValues={initialValues}
        >
          <Form>
            <div className="form-title">
              Add missing sign in record
            </div>

            {!props.record && (
              <Input label="User" name="user" placeholder={placeholders.user} setMessage={setMessage} />
            )}
            {!props.record && (
              <DatePickerField label="Day" name="day" setMessage={setMessage} />
            )}
            {(!props.record || !props.record.signInTime) && (
              <TimePickerField label="Sign In Time" name="signInTime" setMessage={setMessage} />
            )}
            {(!props.record || !props.record.signOutTime) && (
              <TimePickerField label="Sign Out Time" name="signOutTime" setMessage={setMessage} />
            )}

            <FormSubmit formType="update" message={message} setMessage={setMessage} />
          </Form>
        </Formik>
      </div>
    </div>
  );
}

AttendanceRecordForm.propTypes = {
  record: PropTypes.shape({
    _id: PropTypes.string,
    user: PropTypes.string,
    signInTime: PropTypes.instanceOf(Date),
    signOutTime: PropTypes.instanceOf(Date),
  }),
};

AttendanceRecordForm.defaultProps = {
  record: null,
};

export default AttendanceRecordForm;
