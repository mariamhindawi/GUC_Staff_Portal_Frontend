import React, { useState } from "react";
import axios from '../axios';
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";

const AssignTaForm = props => {
    const [message, setMessage] = useState("");
    const [messageStyle, setMessageStyle] = useState("");

    const placeholders = {
        course: "Course",
        teachingAssistant: "ex: ac-1"
    }

    const initialValues = {
        course: props.course.id,
        teachingAssistant: ""
    }

    const validationSchema = Yup.object({
        course: Yup.string()
            .required("This field is required"),
        teachingAssistant: Yup.string()
            .required("This field is required")    
    });

    const handleSubmit = async values => {
        await axios({
            method: "post",
            url: `/ci/assign-ta-to-course/${values.teachingAssistant}/${values.course}`,
            headers: {
                token: sessionStorage.getItem("token")
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
                        <Field name="teachingAssistant" placeholder={placeholders.teachingAssistant}
                            onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                        <div className="form-input-error-message">
                            <ErrorMessage name="teachingAssistant" />
                        </div>
                        <div>
                            <button type="submit" disabled={formikProps.isSubmitting}>Assign Teaching Assistant</button>
                        </div>
                        <div className={messageStyle}>{message}</div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AssignTaForm;