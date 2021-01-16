import React, { useState } from "react";
import axios from '../axios';
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Button } from "reactstrap";

const AssignCcForm = props => {
    const [message, setMessage] = useState("");
    const [messageStyle, setMessageStyle] = useState("");

    const placeholders = {
        course: "Course",
        courseCoordinator: "ex: ac-1"
    }

    const initialValues = {
        course: props.course.id,
        courseInstructor: ""
    }

    const validationSchema = Yup.object({
        course: Yup.string()
            .required("This field is required"),
        courseCoordinator: Yup.string()
            .required("This field is required")    
    });

    const handleSubmit = async values => {
        await axios({
            method: "post",
            url: "/ci/assign-course-coordinator",
            headers: {
                token: sessionStorage.getItem("token")
            },
            data: {
                course: values.course,
                id: values.courseCoordinator
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
        <div className="input-form assign-cc-form rounded-border container">
            <div className="pt-3 pb-3">
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
                        <label className="form-input-label col-sm-4" htmlFor="courseCoordinator">Course Coordinator</label>
                        <Field className="rounded form-input-border col-sm-8" name="courseCoordinator" placeholder={placeholders.courseCoordinator}
                            onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                        <div className="form-input-error-message">
                            <ErrorMessage name="courseCoordinator" />
                        </div>
                        <div className="form-button-div mb-2">
                            <Button className="rounded bg-success" type="submit" disabled={formikProps.isSubmitting}>Assign Course Coordinator</Button>
                        </div >
                        <div className={messageStyle}>{message}</div>
                    </Form>
                )}
            </Formik>
            </div>
        </div>
    );
};

export default AssignCcForm;