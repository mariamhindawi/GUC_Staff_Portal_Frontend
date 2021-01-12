import React, { useState } from "react";
import axios from "../axios";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";

const FacultyForm = props => {
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const placeholders = {
        name: "Faculty name"
    }

    const initialValues = { 
        name: props.faculty.name
    }

    const validationSchema = Yup.object({
        name: Yup.string()
            .required("This field is required")
    });

    const handleSubmit = values => {
        axios({
            method: props.formType === "add" ? "post" : "put",
            url: `/hr/${props.formType}-faculty${props.formType === "add" ? "" : `/${props.faculty.name}`}`,
            headers: {
                token: sessionStorage.getItem("token")
            },
            data: {
                name: values.name
            }
        })
            .then(response => {
                setErrorMessage("");
                setSuccessMessage(response.data);
            })
            .catch(error => {
                if (error.response) {
                    setErrorMessage(error.response.data);
                    setSuccessMessage("");
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

    const handleFocus = (e) => {
        e.target.placeholder = "";
    };

    const handleBlur = (e, formikProps) => {
        e.target.placeholder = placeholders[e.target.name];
        formikProps.setFieldTouched(e.target.name);
    };
    
    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                { formikProps => (
                    <Form>
                        <Field name="name" placeholder={placeholders.name}
                            onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                        <div className="form-input-error-message">
                            <ErrorMessage name="name"/>
                        </div>
                        <div>
                            <button type="submit">{props.formType === "add" ? "Add faculty" : "Update faculty"}</button>
                        </div>
                        <div className="form-error-message">{errorMessage}</div>
                        <div className="form-success-message">{successMessage}</div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default FacultyForm;