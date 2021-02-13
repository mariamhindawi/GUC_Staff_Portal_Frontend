import React, { useState } from "react";
import PropTypes from "prop-types";
import Axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import AxiosInstance from "../../others/AxiosInstance";
import AuthTokenManager from "../../others/AuthTokenManager";
import useAxiosCancel from "../../hooks/AxiosCancel";
import FormButton from "../button_components/FormButton";

function RoomForm(props) {
  const [message, setMessage] = useState({ messageText: "", messageStyle: "" });
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

  const placeholders = {
    name: "Room Name",
    capacity: "Room Capacity",
  };
  const initialValues = {
    name: props.room.name,
    type: props.room.type,
    capacity: props.room.capacity,
  };
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("This field is required"),
    type: Yup.string()
      .required("This field is required")
      .oneOf(["Office", "Tutorial", "Lab", "Lecture"], "Invalid room type"),
    capacity: Yup.number()
      .typeError("Capacity must be a number")
      .required("This field is required")
      .positive("Capacity must be a positive number")
      .integer("Capacity must be an integer"),
  });

  const handleSubmit = async values => {
    setMessage({ messageText: "", messageStyle: "" });
    await AxiosInstance({
      method: props.formType === "add" ? "post" : "put",
      url: `/staff/hr/${props.formType}-room${props.formType === "add" ? "" : `/${props.room.name}`}`,
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
      data: {
        name: values.name,
        capacity: values.capacity,
        type: values.type,
      },
    })
      .then(response => {
        setMessage({ messageText: response.data, messageStyle: "success-message" });
        props.updateRooms();
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(`Request cancelled: ${error.message}`);
        }
        else if (error.response) {
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
  const handleFocus = e => {
    e.target.placeholder = "";
    setMessage({ messageText: "", messageStyle: "" });
  };
  const handleBlur = (e, formikProps) => {
    e.target.placeholder = placeholders[e.target.name];
    formikProps.setFieldTouched(e.target.name);
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {formikProps => (
            <Form>
              <div className="form-title">
                {props.formType === "add" ? "Add Room" : `Update Room "${props.room.name}"`}
              </div>

              <label htmlFor="name">
                Name
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                placeholder={placeholders.name}
                onFocus={e => handleFocus(e)}
                onBlur={e => handleBlur(e, formikProps)}
              />
              <span className="form-input-message error-message">
                <ErrorMessage name="name" />
              </span>

              <label htmlFor="type">
                Type
              </label>
              <Field
                className={formikProps.values.type === "" ? "disabled-selected" : ""}
                as="select"
                id="type"
                name="type"
                onFocus={e => handleFocus(e)}
              >
                <option disabled value="">Room Type</option>
                <option value="Office">Office</option>
                <option value="Tutorial">Tutorial Room</option>
                <option value="Lab">Lab</option>
                <option value="Lecture">Lecture Hall</option>
              </Field>
              <span className="form-input-message error-message">
                <ErrorMessage name="type" />
              </span>

              <label htmlFor="capacity">
                Capacity
              </label>
              <Field
                type="text"
                id="capacity"
                name="capacity"
                placeholder={placeholders.capacity}
                onFocus={e => handleFocus(e)}
                onBlur={e => handleBlur(e, formikProps)}
              />
              <span className="form-input-message error-message">
                <ErrorMessage name="capacity" />
              </span>

              <div className="form-submit">
                <span className={`form-message ${message.messageStyle}`}>{message.messageText}</span>

                <FormButton
                  isSubmiting={formikProps.isSubmitting}
                  onClick={() => { setMessage({ messageText: "", messageStyle: "" }); }}
                >
                  {props.formType === "add" && (formikProps.isSubmitting ? "Saving" : "Save")}
                  {props.formType === "update" && (formikProps.isSubmitting ? "Saving changes" : "Save changes")}
                </FormButton>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

RoomForm.propTypes = {
  formType: PropTypes.oneOf(["add", "update"]).isRequired,
  room: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    capacity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  updateRooms: PropTypes.func.isRequired,
};

RoomForm.defaultProps = {
  room: {
    name: "",
    type: "",
    capacity: "",
  },
};

export default RoomForm;
