import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import AxiosInstance from "../../others/AxiosInstance";
import AuthTokenManager from "../../others/AuthTokenManager";
import useAxiosCancel from "../../hooks/AxiosCancel";
import FormButton from "../button_components/FormButton";

function DepartmentForm(props) {
  const [message, setMessage] = useState({ messageText: "", messageStyle: "" });
  const [faculties, setFaculties] = useState([]);
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

  const fetchFaculties = () => {
    AxiosInstance.get("/staff/hr/get-faculties", {
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    })
      .then(response => {
        setFaculties(response.data.map(faculty => (
          <option value={faculty.name} key={faculty._id}>{faculty.name}</option>
        )));
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(`Request cancelled: ${error.message}`);
        }
        else if (error.response) {
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
  useEffect(fetchFaculties, []);

  const placeholders = {
    name: "Department Name",
    headOfDepartment: "Head of Department ID",
  };
  const initialValues = {
    name: props.department.name,
    faculty: props.department.faculty,
    headOfDepartment: props.department.headOfDepartment,
  };
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("This field is required"),
    faculty: Yup.string()
      .required("This field is required"),
    headOfDepartment: Yup.string(),
  });

  const handleSubmit = async values => {
    setMessage({ messageText: "", messageStyle: "" });
    await AxiosInstance({
      method: props.formType === "add" ? "post" : "put",
      url: `/staff/hr/${props.formType}-department${props.formType === "add" ? "" : `/${props.department.name}`}`,
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
      data: {
        name: values.name,
        faculty: values.faculty !== "UNASSIGNED" ? values.faculty : "",
        headOfDepartment: values.headOfDepartment !== "UNASSIGNED" ? values.headOfDepartment : "",
      },
    })
      .then(response => {
        setMessage({ messageText: response.data, messageStyle: "success-message" });
        props.updateDepartments();
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
                {props.formType === "add" ? "Add Department" : `Update Department "${props.department.name}"`}
              </div>

              <label htmlFor="name">
                Name
              </label>
              <Field
                name="name"
                placeholder={placeholders.name}
                onFocus={e => handleFocus(e)}
                onBlur={e => handleBlur(e, formikProps)}
              />
              <span className="form-input-message error-message">
                <ErrorMessage name="name" />
              </span>

              <label htmlFor="faculty">
                Faculty
              </label>
              <Field
                className={formikProps.values.type === "" ? "disabled-selected" : ""}
                as="select"
                name="faculty"
                onFocus={e => handleFocus(e)}
                onBlur={e => handleBlur(e, formikProps)}
              >
                <option disabled value="">Choose Faculty</option>
                <option value="UNASSIGNED">UNASSIGNED</option>
                {faculties}
              </Field>
              <span className="form-input-message error-message">
                <ErrorMessage name="faculty" />
              </span>

              <label htmlFor="headOfDepartment">
                Head of Department
              </label>
              <Field
                name="headOfDepartment"
                placeholder={placeholders.headOfDepartment}
                onFocus={e => handleFocus(e)}
                onBlur={e => handleBlur(e, formikProps)}
              />
              <span className="form-input-message error-message">
                <ErrorMessage name="headOfDepartment" />
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

DepartmentForm.propTypes = {
  formType: PropTypes.oneOf(["add", "update"]).isRequired,
  department: PropTypes.shape({
    name: PropTypes.string,
    faculty: PropTypes.string,
    headOfDepartment: PropTypes.string,
  }),
  updateDepartments: PropTypes.func.isRequired,
};

DepartmentForm.defaultProps = {
  department: {
    name: "",
    faculty: "",
    headOfDepartment: "",
  },
};

export default DepartmentForm;
