import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../axios";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Button } from "reactstrap";

const HrMemberForm = props => {
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
        office: props.office,
        salary: props.hrMember.salary,
        password: ""
    }

    const validationSchema = Yup.object({
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
    });

    const handleSubmit = async values => {
        await axiosInstance({
            method: props.formType === "add" ? "post" : "put",
            url: `/hr/${props.formType}-hr-member${props.formType === "add" ? "" : `/${props.hrMember.id}`}`,
            cancelToken: axiosCancelSource.token,
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
                this.updateHrMembers();
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
                <label className="form-input-label col-sm-4" htmlFor="password">Password</label>
                <Field name="password" type="password" placeholder={placeholders.password}
                    onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                <div className="form-input-error-message">
                    <ErrorMessage name="password" />
                </div>
            </>
        );
    }

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
                            <label className="form-input-label col-sm-4" htmlFor="name">Name</label>
                            <Field className="rounded form-input-border col-sm-8" name="name" placeholder={placeholders.name}
                                onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                            <div className="form-input-error-message">
                                <ErrorMessage name="name" />
                            </div>
                            <label className="form-input-label col-sm-4" htmlFor="email">Email</label>
                            <Field className="rounded form-input-border col-sm-8" name="email" type="email" placeholder={placeholders.email}
                                onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                            <div className="form-input-error-message">
                                <ErrorMessage name="email" />
                            </div>
                            <label className="form-input-label col-sm-4" htmlFor="gender">Gender</label>
                            <Field className="rounded form-input-border col-sm-8" name="gender" as="select" onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)}>
                                <option disabled value="">Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </Field>
                            <div className="form-input-error-message">
                                <ErrorMessage name="gender" />
                            </div>
                            <label className="form-input-label col-sm-4" htmlFor="office">Office</label>
                            <Field className="rounded form-input-border col-sm-8" name="office" placeholder={placeholders.office}
                                onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                            <div className="form-input-error-message">
                                <ErrorMessage name="office" />
                            </div>
                            <label className="form-input-label col-sm-4" htmlFor="salary">Salary</label>
                            <Field className="rounded form-input-border col-sm-8" name="salary" placeholder={placeholders.salary}
                                onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                            <div className="form-input-error-message">
                                <ErrorMessage name="salary" />
                            </div>
                            {props.formType === "update" ? renderPassword(formikProps) : <></>}
                            <div className="form-button-div mb-2">
                                <Button className="rounded bg-info"type="submit" disabled={formikProps.isSubmitting}>{props.formType === "add" ? "Add hr member" : "Update hr member"}</Button>
                            </div>
                            <div className={messageStyle}>{message}</div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default HrMemberForm;