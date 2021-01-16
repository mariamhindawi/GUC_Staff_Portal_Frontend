import React, { useState } from "react";
import axios from '../axios';
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Button } from "reactstrap";

const DeleteTaForm = props => {
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
            method: "delete",
            url: `/ci/delete-ta-from-course/${values.teachingAssistant}/${values.course}`,
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
        <div className="input-form delete-ta-form rounded-border container">
            <div className="pt-3 pb-3"></div>
            <Formik className="row"
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {formikProps => (
                    <Form>
                        <label className="form-input-label col-sm-4" htmlFor="course">Course</label>
                        <Field className="rounded form-input-border col-sm-8" name="course" placeholder={placeholders.course}
                            onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                        <div className="form-input-error-message">
                            <ErrorMessage name="course" />
                        </div>
                        <label className="form-input-label col-sm-4" htmlFor="teachingAssistant">Teaching Assistant</label>
                        <Field className="rounded form-input-border col-sm-8" name="teachingAssistant" placeholder={placeholders.teachingAssistant}
                            onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                        <div className="form-input-error-message">
                            <ErrorMessage name="teachingAssistant" />
                        </div>
                        <div>
                            <Button className="rounded bg-success"type="submit" disabled={formikProps.isSubmitting}>Assign Teaching Assistant</Button>
                        </div>
                        <div className={messageStyle}>{message}</div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default DeleteTaForm;