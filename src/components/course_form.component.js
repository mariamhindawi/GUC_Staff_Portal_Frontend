import React, { useState } from "react";
import axios from '../axios';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from "formik";

const CourseForm = props => {
    const [message, setMessage] = useState("");
    const [messageStyle, setMessageStyle] = useState("");

    const placeholders = {
        id: "ID",
        name: "Course name",
        department: "Department"
    }

    const initialValues = {
        id: props.course.id,
        name: props.course.name,
        department: props.course.department
    }

    const validationSchema = Yup.object({
        id: Yup.string()
            .required("This field is required"),
        name: Yup.string()
            .required("This string is required"),
        department: Yup.string()
    });

    const handleSubmit = async values => {
        await axios({
            method: props.formType === "add" ? "post" : "put",
            url: `/hr/${props.formType}-course${props.formType === "add" ? "" : `/${props.course.id}`}`,
            headers: {
                token: sessionStorage.getItem("token")
            },
            data: {
                id: values.id,
                name: values.name,
                department: values.department
            }
        })
            .then(response => {
                setMessageStyle("form-success-message");
                setMessage(response.data);
            })
            .catch(error => {
                if (error.response) {
                    setMessageStyle("form-error-message");
                    setMessage(error.response.data);
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
                {formikProps => (
                    <Form>
                        <Field name="id" placeholder={placeholders.id}
                            onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                        <div className="form-input-error-message">
                            <ErrorMessage name="id" />
                        </div>
                        <Field name="name" placeholder={placeholders.name}
                            onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                        <div className="form-input-error-message">
                            <ErrorMessage name="name" />
                        </div>
                        <Field name="department" placeholder={placeholders.department}
                            onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                        <div className="form-input-error-message">
                            <ErrorMessage name="department" />
                        </div>
                        <div>
                            <button type="submit" disabled={formikProps.isSubmitting}>{props.formType === "add" ? "Add course" : "Update course"}</button>
                        </div>
                        <div className={messageStyle}>{message}</div>
                    </Form>
                )}
            </Formik>
        </div>
    );

};

export default CourseForm;