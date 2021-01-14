import React, { useState } from "react";
import axios from "../axios";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Button } from "reactstrap";

const RoomForm = props => {
    const [message, setMessage] = useState("");
    const [messageStyle, setMessageStyle] = useState("");

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

    const handleSubmit = async values => {
        await axios({
            method: props.formType === "add" ? "post" : "put",
            url: `/hr/${props.formType}-room${props.formType === "add" ? "" : `/${props.room.name}`}`,
            headers: {
                token: sessionStorage.getItem("token")
            },
            data: {
                name: values.name,
                capacity: values.capacity,
                type: values.type
            }
        })
            .then(response => {
                setMessageStyle("form-success-message");
                setMessage(response.data);
                props.updateRooms();
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
        <div className="input-form add-room-form rounded-border container">
             <div className="pt-3 pb-3">
            <Formik  className="row"
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                { formikProps => (
                    <Form>
                        <label className="form-input-label col-sm-4" htmlFor="name">Room name</label>
                        <Field className="rounded form-input-border col-sm-8" name="name" placeholder={placeholders.name}
                            onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                        <div className="form-input-error-message">
                            <ErrorMessage name="name"/>
                        </div>
                        <label className="form-input-label col-sm-4" htmlFor="capacity">Room capacity</label>
                        <Field className="rounded form-input-border col-sm-8" name="capacity"  placeholder={placeholders.capacity}
                            onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                        <div className="form-input-error-message">
                            <ErrorMessage name="capacity"/>
                        </div>
                        <label className="form-input-label col-sm-4" htmlFor="type">Room type</label>
                        <Field className="rounded form-input-border col-sm-8" name="type" as="select" onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)}>
                            <option disabled value="">Room type</option>
                            <option value="Office">Office</option>
                            <option value="Tutorial">Tutorial Room</option>
                            <option value="Lab">Lab</option>
                            <option value="Lecture">Lecture Hall</option>
                        </Field>
                        <div className="form-input-error-message">
                            <ErrorMessage name="type"/>
                        </div>
                        <div className="form-button-div mb-2">
                            <Button type="submit" disabled={formikProps.isSubmitting}>{props.formType === "add" ? "Add room" : "Update Room"}</Button>
                        </div>
                        <div className={messageStyle}>{message}</div>
                    </Form>
                )}
            </Formik>
            </div>
        </div>
    );
};

export default RoomForm;