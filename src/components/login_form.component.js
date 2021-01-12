import React from "react";
import axios from "../axios";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GUC from "../GUC_Building.jpg";
import {Button} from 'reactstrap'

const LoginForm = () => {
    const history = useHistory();

    const placeholders = {
        email: "Email",
        password: "Password"
    }
    const error="";
    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email address")
            .required("This field is required"),
        password: Yup.string()
            .required("This field is required")
    });

    const handleSubmit = values => {
        axios.post("/staff/login", {
            "email": values.email,
            "password": values.password
        })
            .then(res => {
                document.getElementById("login-form-error-message").innerHTML = res.data;
                sessionStorage.setItem("token", res.headers["token"]);
                history.push("/staff/home");
            })
            .catch(err => {
                if (err.response) {
                    document.getElementById("login-form-error-message").innerHTML = err.response.data;
                    console.log(err.response);
                }
                else if (err.request) {
                    console.log(err.request);
                }
                else {
                    console.log(err.message);
                }
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
        <div id="login-container" className="container">
            <div className="row">
                <div className="col-10 offset-1 col-sm-6 offset-sm-3 col-lg-4 offset-lg-4">
                    <div className="card align-items-center rounded-border">
                        <img className="card-img-top rounded-top-border" src={GUC}></img>
                        <div className="card-body">
                            <Formik
                                initialValues={{ email: "", password: "" }}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                { formikProps => (
                                    <Form>
                                        <FontAwesomeIcon className="login-icon" icon="user" />
                                        <Field className="bottom-border" name="email" type="email" placeholder={placeholders.email}
                                            onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                                        <div className="form-input-error-message">
                                            <ErrorMessage name="email" />
                                        </div>
                                        <br />
                                        <label htmlFor="password">
                                            <FontAwesomeIcon className="login-icon" icon="lock" />
                                        </label>
                                        <Field className="bottom-border" name="password" type="password" placeholder={placeholders.password}
                                            onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                                        <div className="form-input-error-message">
                                            <ErrorMessage name="password" />
                                        </div>
                                        <div className="text-center">
                                            <Button id="login-button" className="rounded border-0" type="submit">LOG IN</Button>
                                            <div className="form-error-message" id="login-form-error-message"></div>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;