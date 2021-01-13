import React, { useState } from "react";
import axios from '../axios';
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";

const HrMemberForm = props => {
    const [message, setMessage] = useState("");
    const [messageStyle, setMessageStyle] = useState("");

    const placeholders = {
        name: "Name",
        email: "Email",
        office: "Office",
        salary: "Salary",
        password: "Password"
    }

    const initialValues = {
        name: props.hrMember.name,
        email: props.hrMember.email,
        gender: props.hrMember.gender,
        office: props.hrMember.office,
        salary: props.hrMember.salary,
        password: props.hrMember.password
    }

    const validationSchemaAdd = Yup.object({
        name: Yup.string()
            .required("This field is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("This field is required"),
        gender: Yup.string()
            .required("This field is required")
            .oneOf(["Male", "Female"], "Invalid gender"),
        office: Yup.string()
            .required("This feild is required"),
        salary: Yup.number()
            .typeError("Salary must be a number")
            .required("This field is required")
            .positive("Salary must be a positive number")
            .integer("Salary must be an integer")
    });

    const validationSchemaUpdate = Yup.object({
        name: Yup.string()
            .required("This field is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("This field is required"),
        gender: Yup.string()
            .required("This field is required")
            .oneOf(["Male", "Female"], "Invalid gender"),
        office: Yup.string()
            .required("This feild is required"),
        salary: Yup.number()
            .typeError("Salary must be a number")
            .required("This field is required")
            .positive("Salary must be a positive number")
            .integer("Salary must be an integer"),
        password: Yup.string()
            .required("This field is required")
    });

    const validationSchema = props.formType === "add" ? validationSchemaAdd : validationSchemaUpdate;

    const handleSubmit = values => {
        axios({
            method: props.formType === "add" ? "post" : "put",
            url: `/hr/${props.formType}-hr-member${props.formType === "add" ? "" : `/${props.hrMember.id}`}`,
            headers: {
                token: sessionStorage.getItem("token")
            },
            data: {
                name: values.name,
                email: values.email,
                gender: values.gender,
                office: values.office,
                salary: values.salary,
                password: values.password
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

    const renderPassword = (formikProps) => {
        return (
            <>
                <Field name="password" type="password" placeholder={placeholders.password}
                    onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                <div className="form-input-error-message">
                    <ErrorMessage name="password" />
                </div>
            </>
        );
    }

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {formikProps => (
                    <Form>
                        <Field name="name" placeholder={placeholders.name}
                            onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                        <div className="form-input-error-message">
                            <ErrorMessage name="name" />
                        </div>
                        <Field name="email" type="email" placeholder={placeholders.email}
                            onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                        <div className="form-input-error-message">
                            <ErrorMessage name="email" />
                        </div>
                        <Field name="gender" as="select" onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)}>
                            <option disabled value="">Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </Field>
                        <div className="form-input-error-message">
                            <ErrorMessage name="gender" />
                        </div>
                        <Field name="office" placeholder={placeholders.office}
                            onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                        <div className="form-input-error-message">
                            <ErrorMessage name="office" />
                        </div>
                        <Field name="salary" placeholder={placeholders.salary}
                            onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                        <div className="form-input-error-message">
                            <ErrorMessage name="salary" />
                        </div>
                        {props.formType === "update" ? renderPassword(formikProps) : <></>}
                        <div>
                            <button type="submit">{props.formType === "add" ? "Add hr member" : "Update hr member"}</button>
                        </div>
                        <div className={messageStyle}>{message}</div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default HrMemberForm;