import React from "react";
import axios from "../axios";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";

const DepartmentForm = props => {

    const placeholders = {
        name: "Department name",
        headOfDepartment: "Head of Department"
    }

    const initialValues = { 
        name: props.department.name,
        faculty: props.department.faculty,
        headOfDepartment: props.department.headOfDepartment
    }

    const validationSchema = Yup.object({
        name: Yup.string()
            .required("This field is required"),
        faculty: Yup.string(),
        headOfDepartment: Yup.string()
    });

    const handleSubmit = values => {
        axios({
            method: props.formType === "add" ? "post" : "put",
            url: `/hr/${props.formType}-department${props.formType === "add" ? "" : `/${props.department.name}`}`,
            headers: {
                token: sessionStorage.getItem("token")
            },
            data: {
                name: values.name,
                faculty: values.faculty,
                headOfDepartment: values.headOfDepartment
            }
        })
            .then(response => {
                document.getElementById("department-form-message").innerHTML = response.data;
            })
            .catch(error => {
                if (error.response) {
                    document.getElementById("department-form-error-message").innerHTML = error.response.data;
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
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                { formikProps => (
                    <Form>
                        <Field name="name" placeholder={placeholders.name}
                            onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                        <div className="form-input-error-message">
                            <ErrorMessage name="name"/>
                        </div>
                        <Field name="faculty" as="select" onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)}>
                            <option value="">UNASSIGNED</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Mimi">Mimi</option>
                        </Field>
                        <div className="form-input-error-message">
                            <ErrorMessage name="faculty"/>
                        </div>
                        <Field name="headOfDepartment" placeholder={placeholders.headOfDepartment}
                            onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                        <div className="form-input-error-message">
                            <ErrorMessage name="headOfDepartment"/>
                        </div>
                        <div>
                            <button type="submit">{props.formType === "add" ? "Add department" : "Update department"}</button>
                        </div>
                        <div className="form-error-message" id="department-form-error-message"></div>
                        <div className="form-message" id="department-form-message"></div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default DepartmentForm;