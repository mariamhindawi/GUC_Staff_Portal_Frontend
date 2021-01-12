import React from 'react';
import axios from '../axios';
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";

const AcademicMemberFormU = props => {
    
    const placeholders = {
        name: "Name",
        email: "Email",
        password: "Password",
        department: "Department",
        office: "Office",
        salary: "Salary",
        dayOff: "Day Off"
    }

    const initialValues = {
        name: props.academic.name,
        email: props.academic.email,
        password: props.academic.password,
        department: props.academic.department,
        office: props.academic.office,
        salary: props.academic.salary,
        dayOff: props.academic.dayOff
    }

    const validationSchema = Yup.object({
        name: Yup.string()
            .required("This field is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("This field is required"),
        password: Yup.string()
            .required("This field is required"),    
        department: Yup.string(),
        office: Yup.string()
            .required("This feild is required"),
        salary: Yup.number()
            .typeError("Capacity must be a number")
            .required("This field is required")
            .positive("Capacity must be a positive number")
            .integer("Capacity must be an integer"),
        gender: Yup.string()
            .required("This field is required")
            .oneOf(["Male", "Female"], "Invalid Gender Type"),
        role: Yup.string()
            .required("This field is required")
            .oneOf(["Course Instructor", "Head of Department", "Teaching Assistant"], "Invalid role")    
    });

    const handleSubmit = values => {
        axios({
            method: props.formType === "add" ? "post" : "put",
            url: `/hr/${props.formType}-academic-member${props.formType === "add" ? "" : `/${props.academic.id}`}`,
            headers: {
                token: sessionStorage.getItem("token")
            },
            data: {
                name: values.name,
                email: values.email,
                password: values.password,
                department: values.department,
                office: values.office,
                salary: values.salary,
                gender: values.gender,
                role: values.role
            }
        })
            .then(response => {
                document.getElementById("academic-member-form-message").innerHTML = response.data;
            })
            .catch(error => {
                if (error.response) {
                    document.getElementById("academic-member-form-error-message").innerHTML = error.response.data;
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
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema= {validationSchema} 
                onSubmit={handleSubmit}
            >
                { formikProps => (
                    <Form>
                        <Field name="name" placeholder={placeholders.name}
                            onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                        <div className="form-input-error-message">
                            <ErrorMessage name="name"/>
                        </div>
                        <Field name="email" placeholder={placeholders.email}
                            onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                        <div className="form-input-error-message">
                            <ErrorMessage name="email"/>
                        </div>
                        <Field name="password" placeholder={placeholders.password}
                            onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                        <div className="form-input-error-message">
                            <ErrorMessage name="password"/>
                        </div>
                        <Field name="department" placeholder={placeholders.department}
                            onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                        <div className="form-input-error-message">
                            <ErrorMessage name="department"/>
                        </div>
                        <Field name="office" placeholder={placeholders.office}
                            onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                        <div className="form-input-error-message">
                            <ErrorMessage name="office"/>
                        </div>
                        <Field name="salary" placeholder={placeholders.salary}
                            onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                        <div className="form-input-error-message">
                            <ErrorMessage name="salary"/>
                        </div>
                        <Field name="gender" as="select" onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)}>
                            <option disabled value="">Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </Field>
                        <div className="form-input-error-message">
                            <ErrorMessage name="gender"/>
                        </div>
                        <Field name="role" as="select" onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)}>
                            <option disabled value="">Role</option>
                            <option value="Course Instructor">Course Instructor</option>
                            <option value="Head of Department">Head of Department</option>
                            <option value="Teaching Assistant">Teaching Assistant</option>
                        </Field>
                        <div className="form-input-error-message">
                            <ErrorMessage name="role"/>
                        </div>
                        <div>
                            <button type="submit">{props.formType === "add" ? "Add academic member" : "Update academic member"}</button>
                        </div>
                        <div className="form-error-message" id="academic-member-form-error-message"></div>
                        <div className="form-message" id="academic-member-form-message"></div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AcademicMemberFormU;