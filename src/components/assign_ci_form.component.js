import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../axios";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";

const AssignCiForm = props => {
    const [message, setMessage] = useState("");
    const [messageStyle, setMessageStyle] = useState("");
    const axiosCancelSource = axios.CancelToken.source();

    const componentDidMount = () => {
        return () => {
            axiosCancelSource.cancel("Operation canceled by the user");
        }
    };
    useEffect(componentDidMount, []);

    const placeholders = {
        course: "Course",
        courseInstructor: "ex: ac-1"
    }

    const initialValues = {
        course: props.course.id,
        courseInstructor: ""
    }

    const validationSchema = Yup.object({
        course: Yup.string()
            .required("This field is required"),
        courseInstructor: Yup.string()
            .required("This field is required")    
    });

    const handleSubmit = async values => {
        await axiosInstance({
            method: "post",
            url: "/hod/assign-course-instructor",
            cancelToken: axiosCancelSource.token,
            headers: {
                token: sessionStorage.getItem("token")
            },
            data: {
                course: values.course,
                id: values.courseInstructor
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
                        <Field name="course" placeholder={placeholders.course}
                            onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                        <div className="form-input-error-message">
                            <ErrorMessage name="course" />
                        </div>
                        <Field name="courseInstructor" placeholder={placeholders.courseInstructor}
                            onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                        <div className="form-input-error-message">
                            <ErrorMessage name="courseInstructor" />
                        </div>
                        <div>
                            <button type="submit" disabled={formikProps.isSubmitting}>Assign Course Instructor</button>
                        </div>
                        <div className={messageStyle}>{message}</div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AssignCiForm;