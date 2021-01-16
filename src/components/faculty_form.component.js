import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../axios";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Button } from "reactstrap";

const FacultyForm = props => {
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
        name: "Faculty name"
    }

    const initialValues = {
        name: props.faculty.name
    }

    const validationSchema = Yup.object({
        name: Yup.string()
            .required("This field is required")
    });

    const handleSubmit = async values => {
        await axiosInstance({
            method: props.formType === "add" ? "post" : "put",
            url: `/hr/${props.formType}-faculty${props.formType === "add" ? "" : `/${props.faculty.name}`}`,
            cancelToken: axiosCancelSource.token,
            headers: {
                token: sessionStorage.getItem("token")
            },
            data: {
                name: values.name
            }
        })
            .then(response => {
                setMessageStyle("form-success-message");
                setMessage(response.data);
                props.updateFaculties();
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
        <div className="input-form add-room-form rounded-border container">
            <div className="pt-3 pb-3">
                <Formik className="row"
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {formikProps => (
                        <Form>
                            <label className="form-input-label col-sm-4" htmlFor="name">Faculty name</label>
                            <Field className="rounded form-input-border col-sm-8" name="name" placeholder={placeholders.name}
                                onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                            <div className="form-input-error-message">
                                <ErrorMessage name="name" />
                            </div>
                            <div className="form-button-div mb-2">
                                <Button className="bg-info" type="submit" disabled={formikProps.isSubmitting}>{props.formType === "add" ? "Add faculty" : "Update faculty"}</Button>
                            </div>
                            <div className={messageStyle}>{message}</div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default FacultyForm;