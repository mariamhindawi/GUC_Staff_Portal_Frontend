import React from 'react';
import axios from '../axios';
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";

const HrMemberForm = props => {
    
    const placeholders = {
        name: "Name",
        email: "Email",
        office: "Office",
        salary: "Salary",
    }

    const initialValues = {
        name: props.hrmember.name,
        email: props.hrmember.email,
        office: props.hrmember.office,
        salary: props.hrmember.salary,
        gender: props.hrmember.gender
    }

    const validationSchema = Yup.object({
        name: Yup.string()
            .required("This field is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("This field is required"),
        office: Yup.string()
            .required("This feild is required"),
        salary: Yup.number()
            .typeError("Capacity must be a number")
            .required("This field is required")
            .positive("Capacity must be a positive number")
            .integer("Capacity must be an integer"),
        gender: Yup.string()
            .required("This field is required")
            .oneOf(["Male", "Female"], "Invalid Gender Type")  
    });

    const handleSubmit = values => {
        axios({
            method: props.formType === "add" ? "post" : "put",
            url: `/hr/${props.formType}-hr-member${props.formType === "add" ? "" : `/${props.hrmember.id}`}`,
            headers: {
                token: sessionStorage.getItem("token")
            },
            data: {
                name: values.name,
                email: values.email,
                office: values.office,
                salary: values.salary,
                gender: values.gender
            }
        })
            .then(response => {
                document.getElementById("hr-member-form-message").innerHTML = response.data;
            })
            .catch(error => {
                if (error.response) {
                    document.getElementById("hr-member-form-error-message").innerHTML = error.response.data;
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
                        <div>
                            <button type="submit">{props.formType === "add" ? "Add hr member" : "Update hr member"}</button>
                        </div>
                        <div className="form-error-message" id="hr-member-form-error-message"></div>
                        <div className="form-message" id="hr-member-form-message"></div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default HrMemberForm;