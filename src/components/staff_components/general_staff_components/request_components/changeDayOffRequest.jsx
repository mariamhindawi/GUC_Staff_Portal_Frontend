import React from "react";
import { Button, Label } from "reactstrap";
import Axios from "axios";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import AxiosInstance from "../../../../others/AxiosInstance";
import AuthTokenManager from "../../../../others/AuthTokenManager";
import useAxiosCancel from "../../../../hooks/AxiosCancel";

function changeDayOffRequest() {
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);
  const placeholders = {
    dayoff: "Day",
    reason: "Reason",
  };

  const initialValues = {
    dayoff: "",
    reason: "",
  };

  const validationSchema = Yup.object({
    dayoff: Yup.string()
      .required("This field is required")
      .oneOf(["Saturday", "Monday", "Sunday", "Tuesday", "Wednesday", "Thursday"], "Invalid day"),
    reason: Yup.string(),
  });

  const handleSubmit = async values => {
    await AxiosInstance({
      method: "post",
      url: "staff/academic/change-day-off-request",
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
      data: {
        dayOff: values.dayoff,
        reason: values.reason,
      },
    })
      .then(response => {
        document.getElementById("room-form-error-message").innerHTML = response.data;
        console.log(response.data);
      })
      .catch(error => {
        if (error.response) {
          document.getElementById("room-form-error-message").innerHTML = error.response;
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
    <div className="input-form change-day-off rounded-border container">
      <div className="pt-3 pb-3">
        <Formik
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          initialValues={initialValues}
        >
          {formikProps => (
            <Form>
              <Label className="form-input-label col-sm-4" for="dayoff">Day off:</Label>
              <Field
                className="rounded form-input-border col-sm-8"
                name="dayoff"
                as="select"
                placeholder={placeholders.dayoff}
                onFocus={e => handleFocus(e)}
                onBlur={e => handleBlur(e, formikProps)}
              >
                <option disabled value="">Day off</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
              </Field>
              <div className="form-input-error-message">
                <ErrorMessage name="dayoff" />
              </div>
              <Label className="form-input-label col-sm-4" for="reason">Reason:</Label>
              <Field
                className="rounded form-input-border col-sm-8"
                name="reason"
                type="textarea"
                placeholder={placeholders.reason}
                onFocus={e => handleFocus(e)}
                onBlur={e => handleBlur(e, formikProps)}
              />
              <div className="form-input-error-message">
                <ErrorMessage name="reason" />
              </div>
              <div className="form-button-div mb-2">
                <Button className="rounded bg-success" type="submit">Send request</Button>
              </div>
              <div className="form-error-message" id="room-form-error-message" />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
export default changeDayOffRequest;
