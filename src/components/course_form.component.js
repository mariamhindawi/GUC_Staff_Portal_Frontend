import React from 'react';
import axios from '../axios';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from "formik";

const CourseForm = props => {
    const placeholders = {
        id: "ID",
        name: "name",
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

    const handleSubmit = values => {
        console.log(props.course.id);
        axios({
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
            document.getElementById("course-form-message").innerHTML = response.data;
        })
        .catch(error => {
            if (error.response) {
                document.getElementById("course-form-error-message").innerHTML = error.response.data;
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
                        <Field name="id" placeholder={placeholders.id}
                            onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                        <div className="form-input-error-message">
                            <ErrorMessage name="id"/>
                        </div>
                        <Field name="name" placeholder={placeholders.name}
                            onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                        <div className="form-input-error-message">
                            <ErrorMessage name="name"/>
                        </div>
                        <Field name="department" placeholder={placeholders.department}
                            onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                        <div className="form-input-error-message">
                            <ErrorMessage name="department"/>
                        </div>
                        <div>
                            <button type="submit">{props.formType === "add" ? "Add course" : "Update course"}</button>
                        </div>
                        <div className="form-error-message" id="course-form-error-message"></div>
                        <div className="form-message" id="course-form-message"></div>
                    </Form>
                )}
            </Formik>
        </div>
    );

};

export default CourseForm;