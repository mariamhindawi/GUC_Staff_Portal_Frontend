import React, { useState } from "react";
import Axios from "axios";
import * as Yup from "yup";
import {
  Formik, Field, Form, ErrorMessage, useField, useFormikContext
} from "formik";
import {
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Label, Button
} from "reactstrap";
import DatePicker from "react-datepicker";
import AxiosInstance from "../../others/AxiosInstance";
import AuthTokenManager from "../../others/AuthTokenManager";
import "react-datepicker/dist/react-datepicker.css";

export const DatePickerField = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  return (
    <DatePicker
      {...field}
      {...props}
      dateFormat="yyyy-MM-dd"
      selected={(field.value && new Date(field.value)) || null}
      onChange={val => {
        setFieldValue(field.name, val);
      }}
    />
  );
};

const LeaveRequestForm = props => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [request, setRequest] = useState("");
  const toggle = () => setDropdownOpen(prevState => !prevState);

  const placeholders = {
    day: "",
    reason: "Reason",
    document: "googledrive.com/uploadedProofDocument",
    duration: 60,
    compensationDate: ""
  };

  const initialValues = {
    day: new Date(),
    compensationDate: new Date(),
    reason: "",
    document: ""
  };

  const validationSchema = Yup.object({
    day: Yup.date()
      .required("This field is required"),
    document: request === "sickLeave" || request === "maternityLeave" ? Yup.string()
      .required("This field is required") : Yup.string(),
    compensationDate: request === "Compensation Leave" ? Yup.date()
      .required("This field is required") : Yup.string(),
    duration: request === "maternityLeave" ? Yup.number()
      .required("This field is required")
      .typeError("Duration must be a number")
      .integer("Duration must be an integer")
      .positive("Duration must be positive") : Yup.number(),
    reason: request === "Compensation Leave" ? Yup.string().required("This field is required") : Yup.string(),

  });

  const handleSubmit = values => {
    AxiosInstance({
      method: "post",
      url: "staff/academic/send-leave-request",
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
      data: {
        type: request === "Compensation Leave" ? "compensationRequest" : request.substring(0, 1).toLowerCase() + request.substring(1, request.length).replace(" ", ""),
        day: `${values.day.getFullYear()}-${values.day.getMonth() < 9 ? `0${values.day.getMonth() + 1}` : values.day.getMonth() + 1}-${values.day.getDate() < 10 ? `0${values.day.getDate()}` : values.day.getDate()}`,
        duration: values.duration,
        document: values.document,
        reason: values.reason,
        compensationDate: `${values.compensationDate.getFullYear()}-${values.compensationDate.getMonth() < 9 ? `0${values.compensationDate.getMonth() + 1}` : values.compensationDate.getMonth() + 1}-${values.compensationDate.getDate() < 10 ? `0${values.compensationDate.getDate()}` : values.compensationDate.getDate()}`,

      },
    })
      .then(response => {
        document.getElementById("room-form-error-message").innerHTML = response.data;
        console.log(response.data);
      })
      .catch(error => {
        if (error.response) {
          document.getElementById("room-form-error-message").innerHTML = error.response.data;
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
  };

  const handleBlur = (e, formikProps) => {
    e.target.placeholder = placeholders[e.target.name];
    formikProps.setFieldTouched(e.target.name);
  };

  return (
    <div className="add-request-form rounded-border container">
      <div className="pt-3 pb-3">

        <label className="form-input-label col-sm-4">Request Type</label>
        <Dropdown className="col-sm-8 bg-info" isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle caret>
            {request || "Select request type"}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => setRequest("Annual Leave")}>Annual Leave</DropdownItem>
            <DropdownItem onClick={() => setRequest("Accidental Leave")}>Accidental Leave</DropdownItem>
            <DropdownItem onClick={() => setRequest("Compensation Leave")}>Compensation Leave</DropdownItem>
            <DropdownItem onClick={() => setRequest("Maternity Leave")}>Maternity Leave</DropdownItem>
            <DropdownItem onClick={() => setRequest("Sick Leave")}>Sick Leave</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Formik
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          initialValues={initialValues}
        >
          {request ? formikProps => (
            <Form>
              <Label className="form-input-label col-sm-4" for="day">Date</Label>
              <DatePickerField className="rounded form-input-border col-sm-8" name="day" />
              <div className="form-input-error-message">
                <ErrorMessage name="day" />
              </div>
              {request === "Compensation Leave" ? (
                <>
                  <Label className="form-input-label col-sm-4" for="duration">Compensation date:</Label>
                  <DatePickerField className="rounded form-input-border col-sm-8" name="compensationDate" />
                  <div className="form-input-error-message">
                    <ErrorMessage name="compensationDate" />
                  </div>
                </>
              ) : null}
              {request === "Maternity Leave" ? (
                <>
                  <Label className="form-input-label col-sm-4" for="duration">Duration:</Label>
                  <Field
                    className="rounded form-input-border col-sm-8"
                    name="duration"
                    placeholder={placeholders.capacity}
                    onFocus={e => handleFocus(e)}
                    onBlur={e => handleBlur(e, formikProps)}
                  />
                  <div className="form-input-error-message">
                    <ErrorMessage name="duration" />
                  </div>
                </>
              ) : null}
              {request === "Maternity Leave" || request === "Sick Leave" ? (
                <>
                  <Label className="form-input-label col-sm-4" for="document">Document Link</Label>
                  <Field
                    className="rounded form-input-border col-sm-8"
                    name="document"
                    placeholder={placeholders.capacity}
                    onFocus={e => handleFocus(e)}
                    onBlur={e => handleBlur(e, formikProps)}
                  />
                  <div className="form-input-error-message">
                    <ErrorMessage name="document" />
                  </div>
                </>
              ) : null}
              {request !== "Maternity Leave" ? (
                <>
                  <Label className="form-input-label col-sm-4" for="reason">Reason</Label>
                  <Field
                    className="rounded form-input-border col-sm-8"
                    name="reason"
                    placeholder={placeholders.capacity}
                    onFocus={e => handleFocus(e)}
                    onBlur={e => handleBlur(e, formikProps)}
                  />
                  <div className="form-input-error-message">
                    <ErrorMessage name="reason" />
                  </div>
                </>
              ) : null}
              <div className="form-button-div mb-2">
                <Button type="submit" className="bg-success">Send request</Button>
              </div>
              <div className="form-error-message" id="room-form-error-message" />
            </Form>
          ) : null}
        </Formik>
      </div>

    </div>
  );
};

export default LeaveRequestForm;
