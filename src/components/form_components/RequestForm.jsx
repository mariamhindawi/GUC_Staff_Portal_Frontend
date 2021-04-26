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
import DatePickerField from "./form_input_components/DatePickerField";
import Select from "./form_input_components/Select";
import ReplacementRequest from "../staff_components/academic_components/request_components/ReplacementRequest";
import SlotLinkingRequest from "../staff_components/academic_components/request_components/SlotLinkingRequest";

function RequestForm(props) {
  const [message, setMessage] = useState({ messageText: "", messageStyle: "" });
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

  const placeholders = {
    dayOff: "Day off",
    reason: "Reason",
    day: "Date",
    document: "Document link",
    duration: "Duration",
    compensationDate: "Compensation date",
  };
  const initialValues = {
    day: new Date(),
    compensationDate: new Date(),
    reason: "",
    document: "",
    dayOff: "Saturday",
  };
  const validationSchema = Yup.object({
    day: Yup.date()
      .required("This field is required"),
    document: props.requestType === "sickLeave" || props.requestType === "maternityLeave" ? Yup.string()
      .required("This field is required") : Yup.string(),
    compensationDate: props.requestType === "Compensation Leave" ? Yup.date()
      .required("This field is required") : Yup.string(),
    duration: props.requestType === "maternityLeave" ? Yup.number()
      .required("This field is required")
      .typeError("Duration must be a number")
      .integer("Duration must be an integer")
      .positive("Duration must be positive") : Yup.number(),
    reason: props.requestType === "compensationRequest" ? Yup.string().required("This field is required") : Yup.string(),

  });
  const handleSubmit = async values => {
    setMessage({ messageText: "", messageStyle: "" });
    await AxiosInstance({
      method: "post",
      // eslint-disable-next-line no-nested-ternary
      url: props.requestType !== "dayOffChangeRequest" ? "/staff/academic/send-leave-request" : "/staff/academic/change-day-off-request",
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
      data: {
        type: props.requestType,
        day: `${values.day.getFullYear()}-${values.day.getMonth() < 9 ? `0${values.day.getMonth() + 1}` : values.day.getMonth() + 1}-${values.day.getDate() < 10 ? `0${values.day.getDate()}` : values.day.getDate()}`,
        duration: values.duration,
        document: values.document,
        reason: values.reason,
        compensationDate: `${values.compensationDate.getFullYear()}-${values.compensationDate.getMonth() < 9 ? `0${values.compensationDate.getMonth() + 1}` : values.compensationDate.getMonth() + 1}-${values.compensationDate.getDate() < 10 ? `0${values.compensationDate.getDate()}` : values.compensationDate.getDate()}`,
        dayOff: values.dayOff,
      },
    })
      .then(response => {
        setMessage({ messageText: response.data, messageStyle: "success-message" });
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

  if (props.requestType === "replacementRequest") {
    return (
      <ReplacementRequest />
    );
  }
  if (props.requestType === "slotLinkingRequest") {
    return (
      <SlotLinkingRequest />
    );
  }
  return (
    <div className="form-container request-form">
      <div className="form-card">
        <Formik
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          initialValues={initialValues}
        >
          <Form>
            <div className="form-title">
              Send Request
            </div>

            {props.requestType !== "dayOffChangeRequest" ? (
              <DatePickerField
                label="Date"
                name="day"
                placeholder={placeholders.day}
                setMessage={setMessage}
                variant="inline"
              />
            ) : (
              <Select label="Day Off" name="dayOff" setMessage={setMessage}>
                <option disabled value="">Choose Day</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
              </Select>
            )}
            {props.requestType === "compensationRequest" ? (
              <DatePickerField
                label="Compensation Day"
                name="compensationDate"
                placeholder={placeholders.compensationDate}
                setMessage={setMessage}
                variant="inline"
              />
            ) : null}
            {props.requestType === "maternityLeave" ? (
              <Input label="Duration" name="duration" placeholder={placeholders.duration} setMessage={setMessage} />
            ) : null}
            {props.requestType === "maternityLeave" || props.requestType === "sickLeave" ? (
              <Input label="Document Link" name="document" placeholder={placeholders.document} setMessage={setMessage} />

            ) : null}
            {props.requestType !== "maternityLeave" ? (
              <Input label="Reason" name="reason" placeholder={placeholders.reason} setMessage={setMessage} />
            ) : null}
            <FormSubmit formType="add" message={message} setMessage={setMessage} />
          </Form>
        </Formik>
      </div>
    </div>
  );
}

RequestForm.propTypes = {
  requestType: PropTypes.oneOf(["replacementRequest", "annualLeave", "accidentalLeave", "sickLeave",
    "maternityLeave", "compensationRequest", "dayOffChangeRequest", "slotLinkingRequest"]).isRequired,
};

export default RequestForm;
