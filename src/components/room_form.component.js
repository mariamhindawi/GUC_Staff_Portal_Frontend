import React from "react";
import axios from "../axios";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";

const RoomForm = props => {

    const placeholders = {
        name: "Room name",
        capacity: "Capacity"
    }

    const initialValues = { 
        name: props.room.name,
        capacity: props.room.capacity,
        type: props.room.type
    }

    const validationSchema = Yup.object({
        name: Yup.string()
            .required("This field is required"),
        capacity: Yup.number()
            .typeError("Capacity must be a number")
            .required("This field is required")
            .positive("Capacity must be a positive number")
            .integer("Capacity must be an integer"),
        type: Yup.string()
            .required("This field is required")
            .oneOf(["Office", "Tutorial", "Lab", "Lecture"], "Invalid room type")
    });

    const handleSubmit = values => {
        axios({
            method: props.formType === "add" ? "post" : "put",
            url: `/hr/${props.formType}-room`,
            headers: {
                token: sessionStorage.getItem("token")
            },
            data: {
                "oldName": props.room.name,
                "name": values.name,
                "capacity": values.capacity,
                "type": values.type
            }
        })
            .then(response => {
                document.getElementById("room-form-error-message").innerHTML = response.data;
                console.log(response.data);
            })
            .catch(error => {
                if (error.response) {
                    document.getElementById("room-form-error-message").innerHTML = error.response;
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
                        <Field name="capacity" placeholder={placeholders.capacity}
                            onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                        <div className="form-input-error-message">
                            <ErrorMessage name="capacity"/>
                        </div>
                        <Field name="type" as="select" onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)}>
                            <option disabled value="">Room type</option>
                            <option value="Office">Office</option>
                            <option value="Tutorial">Tutorial</option>
                            <option value="Lab">Lab</option>
                            <option value="Lecture">Lecture</option>
                        </Field>
                        <div className="form-input-error-message">
                            <ErrorMessage name="type"/>
                        </div>
                        <div>
                            <button type="submit">{props.formType === "add" ? "Add room" : "Update Room"}</button>
                        </div>
                        <div className="form-error-message" id="room-form-error-message"></div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default RoomForm;