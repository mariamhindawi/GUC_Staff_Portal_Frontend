import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../../others/axios_instance";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "reactstrap";

const DepartmentForm = props => {
    const [message, setMessage] = useState("");
    const [messageStyle, setMessageStyle] = useState("");
    const [faculties, setFaculties] = useState([]);
    const axiosCancelSource = axios.CancelToken.source();

    const fetchFaculties = () => {
        axiosInstance.get("/fe/get-faculties", {
            cancelToken: axiosCancelSource.token,
            headers: {
                "auth-access-token": authTokenManager.getAuthAccessToken()
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
            axiosCancelSource.cancel("Operation canceled by the user");
        }
    };
    useEffect(componentDidMount, []);

    const placeholders = {
        name: "Department name",
        headOfDepartment: "Head of Department"
    }

    const initialValues = {
        name: props.department.name,
        faculty: props.faculty,
        headOfDepartment: props.headOfDepartment
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
            cancelToken: axiosCancelSource.token,
            headers: {
                "auth-access-token": authTokenManager.getAuthAccessToken()
            },
            data: {
                name: values.name,
                faculty: values.faculty,
                headOfDepartment: values.headOfDepartment !== "UNASSIGNED" ? values.headOfDepartment : ""
            }
        })
            .then(response => {
                setMessageStyle("form-success-message");
                setMessage(response.data);
                props.updateDepartments();
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
        <div className="input-form department-form rounded-border container">
            <div className="pt-3 pb-3">
                <Formik  className="row"
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {formikProps => (
                    <Form>
                         <label className="form-input-label col-sm-4" htmlFor="name">Department name</label>
                        <Field className="rounded form-input-border col-sm-8" name="name" placeholder={placeholders.name}
                            onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                        <div className="form-input-error-message">
                            <ErrorMessage name="name" />
                        </div>
                        <label className="form-input-label col-sm-4" htmlFor="faculty">Faculty</label>
                        <Field className="rounded form-input-border col-sm-8" name="faculty" as="select" onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)}>
                            <option disabled value="">Faculty</option>
                            <option value="">UNASSIGNED</option>
                            {faculties}
                        </Field>
                        <div className="form-input-error-message">
                            <ErrorMessage name="faculty" />
                        </div>
                        <label className="form-input-label col-sm-4" htmlFor="headOfDepartment">Head of Department</label>
                        <Field className="rounded form-input-border col-sm-8" name="headOfDepartment" placeholder={placeholders.headOfDepartment}
                            onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                        <div className="form-input-error-message">
                            <ErrorMessage name="headOfDepartment" />
                        </div>
                        <div className="form-button-div mb-2">
                            <Button className="rounded bg-info"type="submit" disabled={formikProps.isSubmitting}>{props.formType === "add" ? "Add department" : "Update department"}</Button>
                        </div>
                        <div className={messageStyle}>{message}</div>
                    </Form>
                )}
            </Formik>
            </div>
        </div>
    );
};

export default DepartmentForm;