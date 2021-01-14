import React, { useState } from "react";
import axios from "../axios";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Button } from "reactstrap";

const AttendanceRecordForm = props => {
    const [message, setMessage] = useState("");
    const [messageStyle, setMessageStyle] = useState("");

    const placeholders = {
        
    }

    const initialValues = {
        
    }

    const validationSchema = Yup.object({

    });

    const handleSubmit = async values => {
        
    };

    const handleFocus = (e) => {
        e.target.placeholder = "";
    };

    const handleBlur = (e, formikProps) => {
        e.target.placeholder = placeholders[e.target.name];
        formikProps.setFieldTouched(e.target.name);
    };

    return (
        <div className="input-form add-room-form rounded-border container">
            <div className="pt-3 pb-3">
                <Formik  className="row"
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {formikProps => (
                        <Form>
                            <label className="form-input-label col-sm-4" htmlFor="name">Room name</label>
                            <Field className="rounded form-input-border col-sm-8" name="name" placeholder={placeholders.name}
                                onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                            <div className="form-input-error-message">
                                <ErrorMessage name="name" />
                            </div>

                            <div className="form-button-div mb-2">
                                <Button type="submit" disabled={formikProps.isSubmitting}>{props.formType === "add" ? "Add room" : "Update Room"}</Button>
                            </div>
                            <div className={messageStyle}>{message}</div>
                    </Form>
                )}
            </Formik>
            </div>
        </div>
        
    );
};

export default AttendanceRecordForm;