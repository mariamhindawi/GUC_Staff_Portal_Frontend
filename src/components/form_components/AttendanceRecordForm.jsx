import React, { useState } from "react";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { addDays, set } from "date-fns";
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
    day: "Select day",
    signInTime: "Select sign-in time",
    signOutTime: "Select sign-out time",
  };
  const initialValues = {
    user: "",
    day: addDays(Date.now(), -1),
    signInTime: set(Date.now(), { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }),
    signOutTime: set(Date.now(), { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }),
  };
  const validationSchema = Yup.object({
    user: props.attendanceRecord._id ? null : Yup.string()
      .required("This field is required")
      .matches(/(([a][c]|[h][r])[-][0-9]+)$/, "Invalid user id"),
    day: !props.attendanceRecord._id && Yup.date()
      .typeError("Invalid date")
      .required("This field is required")
      .max(addDays(Date.now(), -1), "Date must be before current day"),
    signInTime: (!props.attendanceRecord._id || !props.attendanceRecord.signInTime.getTime())
    && Yup.date()
      .typeError("Invalid time")
      .required("Sign in time is required"),
    signOutTime: (!props.attendanceRecord._id || !props.attendanceRecord.signOutTime.getTime())
    && Yup.date()
      .typeError("Invalid time")
      .required("Sign out time is required"),
  });
  const handleSubmit = async values => {
    let date;
    let type;
    let signInTime;
    let signOutTime;
    if (!props.attendanceRecord._id) {
      date = values.day;
      type = "Full Record";
      signInTime = set(values.signInTime,
        { year: date.getFullYear(), month: date.getMonth(), date: date.getDate() });
      signOutTime = set(values.signOutTime,
        { year: date.getFullYear(), month: date.getMonth(), date: date.getDate() });
    }
    else if (props.attendanceRecord.signInTime.getTime()) {
      date = new Date(props.attendanceRecord.signInTime);
      type = "Sign Out";
      signOutTime = set(values.signOutTime,
        { year: date.getFullYear(), month: date.getMonth(), date: date.getDate() });
    }
    else {
      date = new Date(props.attendanceRecord.signOutTime);
      type = "Sign In";
      signInTime = set(values.signInTime,
        { year: date.getFullYear(), month: date.getMonth(), date: date.getDate() });
    }
    await AxiosInstance({
      method: "post",
      url: "/staff/hr/add-missing-attendance-record",
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
      data: {
        userId: props.attendanceRecord._id ? props.attendanceRecord.user : values.user,
        recordType: type,
        recordId: type !== "Full Record" && props.attendanceRecord._id,
        signInTime,
        signOutTime,
      },
    })
      .then(response => {
        setMessage({ messageText: response.data, messageStyle: "success-message" });
        props.updateAttendanceRecords();
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
    <div className="add-missing-record-form">
      <Formik
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        initialValues={initialValues}
      >
        <Form>
          <div className="form-title">
            {!props.attendanceRecord._id && "Add Missing Attendance Record"}
            {props.attendanceRecord._id && !props.attendanceRecord.signInTime.getTime() && "Add Missing Sign-in"}
            {props.attendanceRecord._id && !props.attendanceRecord.signOutTime.getTime() && "Add Missing Sign-out"}
          </div>

          {!props.attendanceRecord._id && (
            <Input
              className="input"
              label="User"
              name="user"
              placeholder={placeholders.user}
              setMessage={setMessage}
            />
          )}
          {!props.attendanceRecord._id && (
            <DatePickerField
              label="Day"
              name="day"
              placeholder={placeholders.day}
              setMessage={setMessage}
              variant="inline"
              maxDate={addDays(Date.now(), -1)}
            />
          )}
          {(!props.attendanceRecord._id || !props.attendanceRecord.signInTime.getTime()) && (
            <TimePickerField
              label="Sign In Time"
              name="signInTime"
              placeholder={placeholders.signInTime}
              setMessage={setMessage}
              variant="inline"
            />
          )}
          {(!props.attendanceRecord._id || !props.attendanceRecord.signOutTime.getTime()) && (
            <TimePickerField
              label="Sign Out Time"
              name="signOutTime"
              placeholder={placeholders.signOutTime}
              setMessage={setMessage}
              variant="inline"
            />
          )}

          <FormSubmit formType={!props.attendanceRecord._id ? "add" : "update"} message={message} setMessage={setMessage} />
        </Form>
      </Formik>
    </div>
  );
}

AttendanceRecordForm.propTypes = {
  attendanceRecord: PropTypes.shape({
    _id: PropTypes.string,
    user: PropTypes.string,
    signInTime: PropTypes.instanceOf(Date),
    signOutTime: PropTypes.instanceOf(Date),
  }),
  updateAttendanceRecords: PropTypes.func.isRequired,
};

AttendanceRecordForm.defaultProps = {
  attendanceRecord: PropTypes.shape({
    _id: "",
    user: "",
    signInTime: Date.now(),
    signOutTime: Date.now(),
  }),
};

export default AttendanceRecordForm;
