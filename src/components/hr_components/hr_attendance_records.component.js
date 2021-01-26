import React, { useState } from "react";
import { Button, Container, Label, Modal, ModalBody, Row, Table } from "reactstrap";
import axios from "axios";
import axiosInstance from "../../others/axios_instance";
import { Formik, Field, Form, ErrorMessage, useField, useFormikContext } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import authTokenManager from "../../others/auth_token_manager";

export const DatePickerField = ({ ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props);
    return (
        <DatePicker
            {...field}
            {...props}
            dateFormat="yyyy-MM-dd"
            selected={(field.value && new Date(field.value)) || null}
            onChange={val => {
                setFieldValue(field.name, val);
            }}
        />
    );
};

export const TimePickerField = ({ ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props);
    return (
        <DatePicker
            {...field}
            {...props}
            dateFormat="HH:mm:ss"
            timeIntervals={15}
            selected={(field.value && new Date(field.value)) || null}
            showTimeSelect
            showTimeSelectOnly
            onChange={val => {
                setFieldValue(field.name, val);
            }}
        />
    );
};


const AddMissingHoursComponent = ({ }) => {
    const [records, setRecords] = useState([])
    const [record, setRecord] = useState("")
    const [modalOpen, setModalOpen] = useState(false)

    const toggle = () => setModalOpen(!modalOpen)

    const placeholders = {
        user: "ac-x",
        signIn: "",
        signOut: "",
        day: ""
    }

    const initialValues = {
        user: "",
        signIn: "",
        signOut: "",
        day: ""
    }

    const findValidationSchema = Yup.object({
        day: Yup.date().required("This field is required").max(new Date()),
        user: Yup.string()
            .required("This field is required")
            .matches(/(([a][c]|[h][r])[\-][0-9]+)$/)
    });

    const validationSchema = Yup.object({
        signIn: record && record.signInTime ? null : Yup.date()
            .required("Sign in time is required"),
        signOut: record && record.signOutTime ? null : Yup.date()
            .required("Sign out time is required"),
        user: record ? null : Yup.string()
            .required("This field is required")
            .matches(/(([a][c]|[h][r])[\-][0-9]+)$/),
        day: Yup.date().max(new Date())
    });

    const handleSubmit = values => {
        toggle()
        const type=!record ? "fullDay" : record.signInTime ? "signOut" : "signIn"
        axiosInstance({
            method: "post",
            url: `/staff/hr/add-missing-record`,
            headers: {
                "auth-access-token": authTokenManager.getAuthAccessToken()
            },
            data: {
                missingRecordType: type,
                record: type!=="fullDay"? record._id:null,
                signInTime: type==="fullDay"? new Date(values.signIn.setDate(values.day.getDate())):type==="signOut" ? record.signInTime:values.signIn.setDate(record.signOutTime.getDate()),
                signOutTime: type==="fullDay"? new Date(values.signOut.setDate(values.day.getDate())):type==="signOut" ? values.signOut.setDate(new Date(record.signInTime).getDate()): record.signOutTime,
                // signInYear: !record?values.day.getFullYear():record.signInTime ? null : record.signOutTime.getFullYear(),
                // signInMonth: !record?values.day.getMonth()+1:record.signInTime ? null : record.signOutTime.getMonth()+1,
                // signInDay: !record?values.day.getDate():record.signInTime ? null : record.signOutTime.getDate(),
                // signInHour: record && record.signInTime ? null : values.signIn.getHours(),
                // signInMinute: record && record.signInTime ? null : values.signIn.getMinutes(),
                // signOutYear: !record ? values.day.getFullYear():record.signOutTime ? null,
                // signOutMonth: record && record.signOutTime ? null : values.day.getMonth() + 1,
                // signOutDay: record && record.signOutTime ? null : values.day.getDate(),
                // signOutHour: record && record.signOutTime ? null : values.signOut.getHours(),
                // signOutMinute: record && record.signOutTime ? null : values.signOut.getMinutes(),
                id: record ? record.user : values.user
            }
        })
            .then(response => {
                document.getElementById("room-form-error-message").innerHTML = response.data;
                console.log(response.data);
            })
            .then(axiosInstance.get("/fe/user-records", {
                headers: {
                    "auth-access-token": authTokenManager.getAuthAccessToken()
                },
                params: {
                    user: values.user,
                    day: values.day
                }
            }).then(res => { setRecords(res.data) }))
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

    const handleDateChoose = (values) => {
        axiosInstance.get("/fe/user-records", {
            headers: {
                "auth-access-token": authTokenManager.getAuthAccessToken()
            },
            params: {
                user: values.user,
                day: values.day
            }
        }).then(res => { console.log(res.data); setRecords(res.data) }).catch(err => console.log(err))
    }
    const editRecord = (id) => {
        setRecord(records.filter(record => record._id === id)[0])
        toggle()
    }
    let recordsRows = records.map(record => {
        return <tr key={record._id}>
            <td>{record.signInTime ? (new Date(record.signInTime)).toString() : null}</td>
            <td>{record.signOutTime ? (new Date(record.signOutTime)).toString() : null}</td>
            {record.signInTime && record.signOutTime ? null : <td><Button onClick={() => { editRecord(record._id) }}>Edit</Button></td>}
        </tr>
    })
    return (<Container>
        <Row>
            <Formik
                validationSchema={findValidationSchema}
                onSubmit={handleDateChoose}
                initialValues={initialValues}
            >
                {formikProps => (
                    <Form>
                        <Label for="user">Id:</Label>
                        <Field name="user" placeholder={placeholders.user}
                            onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                        <div className="form-input-error-message">
                            <ErrorMessage name="user" />
                        </div>
                        <Label for="day">Day:</Label>
                        <DatePickerField name="day" />
                        <div className="form-input-error-message">
                            <ErrorMessage name="day" />
                        </div>
                        <div>
                            <Button type="submit">Get records</Button>
                        </div>
                        <div className="form-error-message" id="room-form-error-message"></div>
                    </Form>
                )}
            </Formik>
        </Row>
        <Table>
            <tr>
                <th>Sign In time</th>
                <th>Sign out time</th>
                <th></th>
            </tr>
            {recordsRows}

        </Table>
        <Modal toggle={toggle} isOpen={modalOpen}>
            <ModalBody>
                <Formik
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    initialValues={initialValues}
                >
                    {formikProps => (
                        <Form>
                            {record ? null : <><Label for="user">Id:</Label>
                                <Field name="user" placeholder={placeholders.user}
                                    onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                                <div className="form-input-error-message">
                                    <ErrorMessage name="user" />
                                </div></>}
                            {record ? null :
                                <div><Label for="day">Day:</Label><DatePickerField name="day" /><Label for="day"></Label></div>}
                            {record && record.signInTime ? null : <><Label for="signIn">Sign In:</Label>
                                <TimePickerField name="signIn" />
                                <div className="form-input-error-message">
                                    <ErrorMessage name="signIn" />
                                </div></>}
                            {record && record.signOutTime ? null : <><Label for="signOut">Sign Out:</Label>
                                <TimePickerField name="signOut" />
                                <div className="form-input-error-message">
                                    <ErrorMessage name="signOut" />
                                </div></>}
                            <div>
                                <Button className="rounded bg-success" type="submit">Send request</Button>
                            </div>
                            <div className="form-error-message" id="room-form-error-message"></div>
                        </Form>
                    )}
                </Formik>
            </ModalBody>
        </Modal>
        <Row>
            <Button onClick={() => editRecord("")}>Add record</Button>
        </Row>
    </Container>
    )
}

export default AddMissingHoursComponent