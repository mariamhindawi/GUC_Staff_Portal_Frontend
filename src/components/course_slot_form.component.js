import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from '../axios';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Button } from "reactstrap";

const CourseSlotForm = props => {
    const [message, setMessage] = useState("");
    const [messageStyle, setMessageStyle] = useState("");
    const [courses, setCourses] = useState([]);
    const axiosCancelSource = axios.CancelToken.source();

    const fetchCourses = () => {
        axiosInstance.get("/cc/get-courses-of-cc", {
            cancelToken: axiosCancelSource.token,
            headers: {
                token: sessionStorage.getItem("token")
            },
        })
            .then(response => {
                const courses = response.data;
                setCourses(courses.map((course) => {
                    return <option value={course.id} key={course._id}>{course.id}</option>
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
        fetchCourses();
        return () => {
            axiosCancelSource.cancel("Operation canceled by the user");
        }
    };
    useEffect(componentDidMount, []);

    const placeholders = {
        room: "Room"
    }

    const initialValues = {
        day: props.courseSlot.day,
        slotNumber: props.courseSlot.slotNumber,
        room: props.courseSlot.room,
        course: props.courseSlot.course,
        type: props.courseSlot.type
    }

    const validationSchema = Yup.object({
        day: Yup.string()
            .required("This field is required"),
        slotNumber: Yup.number()
            .typeError("Slot number must be a number")
            .required("This field is required")
            .oneOf([1, 2, 3, 4, 5], "Incorrect slot number"),
        room: Yup.string()
            .required("This field is required"),
        course: Yup.string()
            .required("This field is required"),
        type: Yup.string()
            .required("This field is required")
            .oneOf(["Tutorial", "Lecture", "Lab"], "Invalid room type")
    });

    const handleSubmit = async values => {
        await axiosInstance({
            method: props.formType === "add" ? "post" : "put",
            url: `/cc/${props.formType}-course-slot${props.formType === "add" ? "" : `${props.courseSlot.day}/${props.courseSlot.slotNumber}/${props.courseSlot.room}/${props.courseSlot.course}`}`,
            cancelToken: axiosCancelSource.token,
            headers: {
                token: sessionStorage.getItem("token")
            },
            data: {
                day: values.day,
                slotNumber: values.slotNumber,
                room: values.room,
                course: values.course,
                type: values.type
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
        <div className="input-form add-room-form rounded-border container">
            <div className="pt-3 pb-3">
                <Formik  className="row"
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {formikProps => (
                        <Form>
                            <label className="form-input-label col-sm-4" htmlFor="day">Room name</label>
                            <Field className="rounded form-input-border col-sm-8" name="day" as="select" onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)}>
                                <option disabled value="">Day</option>
                                <option value="Saturday">Saturday</option>
                                <option value="Sunday">Sunday</option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                            </Field>
                            <div className="form-input-error-message">
                                <ErrorMessage name="day" />
                            </div>
                            <label className="form-input-label col-sm-4" htmlFor="slotNumber">Room name</label>
                            <Field className="rounded form-input-border col-sm-8" name="slotNumber" as="select" onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)}>
                                <option disabled value="">Slot Number</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </Field>
                            <div className="form-input-error-message">
                                <ErrorMessage name="slotNumber" />
                            </div>
                            <label className="form-input-label col-sm-4" htmlFor="room">Room name</label>
                            <Field className="rounded form-input-border col-sm-8" name="room" placeholder={placeholders.room}
                                onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                            <div className="form-input-error-message">
                                <ErrorMessage name="room" />
                            </div>
                            <label className="form-input-label col-sm-4" htmlFor="course">Room name</label>
                            <Field className="rounded form-input-border col-sm-8" name="course" as="select" onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)}>
                                <option disabled value="">Course ID</option>
                                {courses}
                            </Field>
                            <div className="form-input-error-message">
                                <ErrorMessage name="course" />
                            </div>
                            <label className="form-input-label col-sm-4" htmlFor="type">Room name</label>
                            <Field className="rounded form-input-border col-sm-8" name="type" as="select" onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)}>
                                <option disabled value="">Type</option>
                                <option value="Tutorial">Tutorial</option>
                                <option value="Lab">Lab</option>
                                <option value="Lecture">Lectrue</option>
                            </Field>
                            <div className="form-input-error-message">
                                <ErrorMessage name="type" />
                            </div>
                            <div className="form-button-div mb-2">
                                <Button type="submit" disabled={formikProps.isSubmitting}>{props.formType === "add" ? "Add Course SLot" : "Update Course Slot"}</Button>
                            </div>
                            <div className={messageStyle} >{message}</div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );

};

export default CourseSlotForm;