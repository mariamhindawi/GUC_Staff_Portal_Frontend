import React from "react";
import axios from "../axios";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoginForm = () => {
    const history = useHistory();

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
            console.log("done");
            alert(res.data);
            sessionStorage.setItem("token", res.headers["token"]);
            history.push("/staff/home");
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
    };
    
    const handleFocus = (e) => {
        e.target.placeholder = "";
    };
    
    const handleBlur = (e, setFieldTouched) => {
        const name = e.target.name;
        e.target.placeholder = name.charAt(0).toUpperCase() + name.slice(1);
        setFieldTouched(e.target.name);
    };

    return (
        <div id="login-container" className="container">
            <div className="row">
                <div className="card col-10 offset-1 col-sm-6 offset-sm-3 col-lg-4 offset-lg-4 align-items-center rounded-border">
                    <div id="login-card-title" className="card-title">
                        User Login
                    </div>
                    <div className="card-body">
                        <Formik
                            initialValues={{ email: "", password: "" }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ setFieldTouched }) => (
                                <Form>
                                    <FontAwesomeIcon className="login-icon" icon="user"/>
                                    <Field className="bottom-border" name="email" type="email" placeholder="Email"  
                                        onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, setFieldTouched)} /> <br/>
                                    <ErrorMessage name="email" /> <br/> <br/>
                                    <label htmlFor="password">
                                        <FontAwesomeIcon className="login-icon" icon="lock"/>
                                    </label>
                                    <Field className="bottom-border" name="password" type="password" placeholder="Password" 
                                        onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, setFieldTouched)} /> <br/>
                                    <ErrorMessage name="password" /> <br/>
                                    <div className="text-center">
                                        <button id="login-button" className="rounded-border border-0"type="submit">LOG IN</button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;