import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../axios";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";

const DepartmentForm = props => {
    const [message, setMessage] = useState("");
    const [messageStyle, setMessageStyle] = useState("");
    const [faculties, setFaculties] = useState([]);

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const fetchFaculties = () => {
        axiosInstance.get("/fe/get-faculties", {
            cancelToken: source.token,
            headers: {
                token: sessionStorage.getItem("token")
            },
        })
            .then(response => {
                const faculties = response.data;
                setFaculties(faculties.map((faculty) => {
                    return <option value={faculty.name} key={faculty._id}>{faculty.name}</option>
                }));
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response);
                }
                else if (error.request) {
                    console.log(error.request);
                }
                else {
                    console.log(error.message);
                }
            });
    }

    const componentDidMount = () => {
        fetchFaculties();
        return () => {
            source.cancel("Operation canceled by the user");
        }
    };
    useEffect(componentDidMount, []);

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

    const handleSubmit = async values => {
        await axiosInstance({
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
                        <Field name="faculty" as="select" onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)}>
                            <option disabled value="">Faculty name</option>
                            <option value="">UNASSIGNED</option>
                            {faculties}
                        </Field>
                        <div className="form-input-error-message">
                            <ErrorMessage name="faculty" />
                        </div>
                        <Field name="headOfDepartment" placeholder={placeholders.headOfDepartment}
                            onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                        <div className="form-input-error-message">
                            <ErrorMessage name="headOfDepartment" />
                        </div>
                        <div>
                            <button type="submit" disabled={formikProps.isSubmitting}>{props.formType === "add" ? "Add department" : "Update department"}</button>
                        </div>
                        <div className={messageStyle}>{message}</div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default DepartmentForm;