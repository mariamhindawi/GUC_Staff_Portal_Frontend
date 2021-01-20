import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../others/axios_instance";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import jwt from "jsonwebtoken";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormImage from "../../images/guc_building.jpg";

const LoginForm = () => {

    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState("");
    const axiosCancelSource = axios.CancelToken.source();

    const componentDidMount = () => {
        return () => {
            axiosCancelSource.cancel("Operation canceled by the user");
        }
    };
    useEffect(componentDidMount, []);

    if (sessionStorage.token) {
        history.push("/");
        return <></>;
    }

    const placeholders = {
        email: "Email",
        password: "Password"
    }

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email address")
            .required("This field is required"),
        password: Yup.string()
            .required("This field is required")
    });

    const handleSubmit = async (values, formikProps) => {
        await axiosInstance({
            method: "post",
            url: "/staff/login",
            cancelToken: axiosCancelSource.token,
            data: {
                "email": values.email,
                "password": values.password
            }
        })
            .then(res => {
                sessionStorage.setItem("token", res.headers["token"]);
                const token = jwt.decode(res.headers["token"]);
                if (token.role === "Head of Department") {
                    history.push("/staff/hod");
                }
                else if (token.role === "Course Instructor") {
                    history.push("/staff/ci");
                }
                else if (token.role === "Teaching Assistant") {
                    history.push("/staff/ta");
                }
                else if (token.role === "Course Coordinator") {
                    history.push("/staff/cc")
                }
                else if (token.role === "HR") {
                    history.push("/staff/hr");
                }
            })
            .catch(error => {
                if (error.response) {
                    setErrorMessage(error.response.data);
                    console.log(error.response);
                }
                else if (error.request) {
                    console.log(error.request);
                }
                else {
                    console.log(error.message);
                }
                formikProps.setFieldValue("password", "", false);
            });
    };

    const handleFocus = (e) => {
        e.target.placeholder = "";
    };

    const handleBlur = (e, formikProps) => {
        e.target.placeholder = placeholders[e.target.name]
        formikProps.setFieldTouched(e.target.name);
    };

    return (
        <div className="login-container">
            <div className="container-fluid login-form">
                <div className="row">
                    <div className="col-10 offset-1 col-sm-6 offset-sm-3 col-lg-4 offset-lg-4">
                        <div className="card align-items-center rounded-border">
                            <img className="card-img-top rounded-top-border" src={FormImage}></img>
                            <div className="card-body">
                                <Formik
                                    initialValues={{ email: "", password: "" }}
                                    validationSchema={validationSchema}
                                    onSubmit={handleSubmit}
                                >
                                    {formikProps => (
                                        <Form>
                                            <label htmlFor="email">
                                                <FontAwesomeIcon className="login-form-icon" icon="user" />
                                            </label>
                                            <Field className="bottom-border" name="email" placeholder={placeholders.email}
                                                onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                                            <div className="form-input-error-message">
                                                <ErrorMessage name="email" />
                                            </div>
                                            <br />
                                            <label htmlFor="password">
                                                <FontAwesomeIcon className="login-form-icon" icon="lock" />
                                            </label>
                                            <Field className="bottom-border" name="password" type="password" placeholder={placeholders.password}
                                                onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                                            <div className="form-input-error-message">
                                                <ErrorMessage name="password" />
                                            </div>
                                            <div className="text-center">
                                                <button type="submit" disabled={formikProps.isSubmitting}>LOG IN</button>
                                                <div className="form-error-message">{errorMessage}</div>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;