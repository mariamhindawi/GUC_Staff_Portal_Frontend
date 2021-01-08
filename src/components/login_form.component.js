import React from "react";
import axios from "../axios";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useHistory } from "react-router-dom"

const LoginForm = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="card col-12 col-sm-6 offset-sm-3">
                    <div className="card-title d-flex justify-content-center">
                        Login
                    </div>
                    <div className="card-body">
                        <Formik
                            initialValues={{
                                email: "",
                                password: ""
                            }}
                            validationSchema={Yup.object({
                                email: Yup.string()
                                    .email("Invalid email address")
                                    .required("Required"),
                                password: Yup.string()
                                    .required("Required")
                            })}
                            onSubmit={values => {
                                axios.post("/staff/login", {
                                    "email": values.email,
                                    "password": values.password
                                })
                                .then(res => {
                                    alert(res.data);
                                    console.log(res.headers["token"]);
                                    history.push("/");
                                })
                                .catch(err => {
                                    if (err.response) {
                                        alert(err.response.data);
                                        console.log(err.response);
                                    }
                                    else if (err.request) {
                                        console.log(err.request);
                                    }
                                    else {
                                        console.log(err.message);
                                    }
                                    console.log(err.toJSON());
                                });
                            }}
                        >
                            <Form>
                            <label htmlFor="email">Email Address</label> <br/>
                            <Field name="email" type="email" /> <br/>
                            <ErrorMessage name="email" /> <br/> <br/>
                            <label htmlFor="password">Password</label> <br/>
                            <Field name="password" type="password" /> <br/>
                            <ErrorMessage name="password" /> <br/> <br/>
                            <button type="submit">Submit</button> <br/>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;