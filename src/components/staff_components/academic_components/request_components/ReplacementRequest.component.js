import React, { useEffect, useState } from "react";
import { Button, Input, Label } from "reactstrap";
import {
  Formik, Field, Form, ErrorMessage, useField, useFormikContext
} from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import jwt from "jsonwebtoken";
import Axios from "axios";
import * as Yup from "yup";
import AxiosInstance from "../../../../others/AxiosInstance";
import AuthTokenManager from "../../../../others/AuthTokenManager";
import SlotsTable from "../../../list_components/SlotsTable";
import { useUserContext } from "../../../../contexts/UserContext";

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

const ReplacementRequestComponent = ({ }) => {
  const [slots, setSlots] = useState([]);
  const [active, setActive] = useState("");
  const user = useUserContext();

  const placeholders = {
    replacement: "ac-x",
  };

  const initialValues = {
    replacement: "",
  };

  const validationSchema = Yup.object({
    replacement: Yup.string()
      .required("This field is required")
      .matches(/([a][c][\-][0-9]+)$/),
  });

  const handleSubmit = values => {
    AxiosInstance({
      method: "post",
      url: "staff/academic/send-replacement-request",
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
      data: {
        replacementID: values.replacement,
        slot: slots.filter(slot => slot._id === active)[0].slotNumber,
        day: `${values.day.getFullYear()}-${values.day.getMonth() < 9 ? `0${values.day.getMonth() + 1}` : values.day.getMonth() + 1}-${values.day.getDate() < 10 ? `0${values.day.getDate()}` : values.day.getDate()}`,
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

  useEffect(() => {
    AxiosInstance.get("staff/academic/schedule", {
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    }).then(res => {setSlots(res.data); console.log(res.data);});
  }, []);

  return (
    <>
      <SlotsTable slots={slots.filter(slot => slot.staffMember === user.id)} active={active} onClick={setActive} />
      <Formik
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        initialValues={initialValues}
      >
        {active ? formikProps => (
          <Form>
            <Label for="day">Date:</Label>
            <DatePickerField name="day" />
            <div className="form-input-error-message">
              <ErrorMessage name="day" />
            </div>
            <Label for="replacement">Replacement:</Label>
            <Field
              name="replacement"
              placeholder={placeholders.replacement}
              onFocus={e => handleFocus(e)}
              onBlur={e => handleBlur(e, formikProps)}
            />
            <div className="form-input-error-message">
              <ErrorMessage name="replacement" />
            </div>
            <div>
              <Button className="bg-success" type="submit">Send request</Button>
            </div>
            <div className="form-error-message" id="room-form-error-message" />
          </Form>
        ) : null}
      </Formik>
    </>
  );
};

export default ReplacementRequestComponent;
