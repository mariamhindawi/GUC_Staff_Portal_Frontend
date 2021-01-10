import React from "react";
import axios from "../axios";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GUC from "../GUC_Building.jpg";

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
            document.getElementById('login-error-messages').innerHTML=res.data;
            sessionStorage.setItem("token", res.headers["token"]);
            history.push("/staff/home");
        })
        .catch(err => {
            if (err.response) {
                document.getElementById('login-error-messages').innerHTML=err.response.data;
                console.log(err.response);
            }
            else if (err.request) {
                console.log(err.request);
            }
            else {
                console.log(err.message);
            }
            console.log(err);
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
                <div className="col-10 offset-1 col-sm-6 offset-sm-3 col-lg-4 offset-lg-4">
                <div className="card align-items-center rounded-border">
                <img className="card-img-top rounded-top-border" src={GUC}></img>
                    <div className="card-body">
                    {/* <div id="login-card-title" className="card-title">
                        User Login
                    </div>
    */}
                        <Formik
                            initialValues={{ email: "", password: "" }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ setFieldTouched }) => (
                                <Form>
                                    <FontAwesomeIcon className="login-icon" icon="user"/>
                                    <Field className="bottom-border" name="email" type="email" placeholder="Email"  
                                        onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, setFieldTouched)} />
                                    <div className="login-input-error-message">
                                    <ErrorMessage name="email" /> 
                                    </div>
                                    <br/>
                                    <label htmlFor="password">
                                        <FontAwesomeIcon className="login-icon" icon="lock"/>
                                    </label>
                                    <Field className="bottom-border" name="password" type="password" placeholder="Password" 
                                        onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, setFieldTouched)} />
                                    <div className="login-input-error-message">
                                    <ErrorMessage name="password" />
                                    </div>
                                    <div className="text-center">
                                        <button id="login-button" className="rounded-border border-0"type="submit">LOG IN</button>
                                        <div id="login-error-messages"></div>
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