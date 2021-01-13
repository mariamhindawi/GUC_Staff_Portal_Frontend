import React, { useEffect, useState } from "react";
import axios from '../axios';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from "formik";

const CourseSlotForm = props => {
    const [courses, setCourses] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const componentDidMount = () => {
        axios.get("/cc/get-courses-of-cc", {
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
                return [];
            });
    };
    useEffect(componentDidMount, []);

    const placeholders = {
        room: "Room"
        // course: "Course ID"
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
            .typeError("Capacity must be a number")
            .required("This field is required")
            .positive("Capacity must be a positive number")
            .integer("Capacity must be an integer")
            .oneOf([1,2,3,4,5],"Incorrect slot number"),
        room: Yup.string()
            .required("This field is required"),
        course: Yup.string()
            .required("This field is required"),
        type: Yup.string()
            .required("This field is required")
            .oneOf(["Tutorial","Lecture","Lab"],"Invalid room type")      
    });

    const handleSubmit = values => {
        console.log("submit");
        axios({
            method: "post",
            url: `/cc/add-course-slot`,
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
                setErrorMessage("");
                setSuccessMessage(response.data);
            })
            .catch(error => {
                if (error.response) {
                    setErrorMessage(error.response.data);
                    setSuccessMessage("");
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
                        <Field name="day" as="select" onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)}>
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
                        <Field name="slotNumber" as="select" onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)}>
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
                        <Field name="room" placeholder={placeholders.room}
                            onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                        <div className="form-input-error-message">
                            <ErrorMessage name="room" />
                        </div>
                        <Field name="course" as="select" onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)}>
                            <option disabled value="">Course ID</option>
                            {courses}
                        </Field>
                        <div className="form-input-error-message">
                            <ErrorMessage name="course" />
                        </div>
                        {/* <Field name="course" placeholder={placeholders.course}
                            onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                        <div className="form-input-error-message">
                            <ErrorMessage name="course" />
                        </div> */}
                        <Field name="type" as="select" onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)}>
                            <option disabled value="">Type</option>
                            <option value="Tutorial">Tutorial</option>
                            <option value="Lab">Lab</option>
                            <option value="Lecture">Lectrue</option>
                        </Field>
                        <div className="form-input-error-message">
                            <ErrorMessage name="type" />
                        </div>
                        <div>
                            <button type="submit">Add Course Slot</button>
                        </div>
                        <div className="form-error-message">{errorMessage}</div>
                        <div className="form-success-message">{successMessage}</div>
                    </Form>
                )}
            </Formik>
        </div>
    );

};

export default CourseSlotForm;