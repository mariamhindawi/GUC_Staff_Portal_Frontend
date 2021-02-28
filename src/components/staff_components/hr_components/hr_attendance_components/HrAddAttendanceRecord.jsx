import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Label, Modal, ModalBody, Table } from "reactstrap";
import Axios from "axios";
import AxiosInstance from "../../../../others/AxiosInstance";
import AuthTokenManager from "../../../../others/AuthTokenManager";
import useAxiosCancel from "../../../../hooks/AxiosCancel";
import DatePickerField from "../../../form_components/form_input_components/DatePickerField";
import TimePickerField from "../../../form_components/form_input_components/TimePickerField";

function HrAddAttendanceRecord() {
  const [records, setRecords] = useState([]);
  const [record, setRecord] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

  const placeholders = {
    user: "ac-x",
    signIn: "",
    signOut: "",
    day: "",
  };
  const initialValues = {
    user: "",
    signIn: "",
    signOut: "",
    day: "",
  };
  const findValidationSchema = Yup.object({
    day: Yup.date().required("This field is required").max(new Date()),
    user: Yup.string()
      .required("This field is required")
      .matches(/(([a][c]|[h][r])[-][0-9]+)$/),
  });
  const validationSchema = Yup.object({
    signIn: record && record.signInTime ? null : Yup.date()
      .required("Sign in time is required"),
    signOut: record && record.signOutTime ? null : Yup.date()
      .required("Sign out time is required"),
    user: record ? null : Yup.string()
      .required("This field is required")
      .matches(/(([a][c]|[h][r])[-][0-9]+)$/),
    day: Yup.date().max(new Date()),
  });

  const toggle = () => setModalOpen(!modalOpen);
  const handleSubmit = values => {
    toggle();
    const type = !record ? "fullDay" : record.signInTime ? "signOut" : "signIn";
    AxiosInstance({
      method: "post",
      url: "/staff/hr/add-missing-record",
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
      data: {
        missingRecordType: type,
        record: type !== "fullDay" ? record._id : null,
        signInTime: type === "fullDay" ? new Date(values.signIn.setDate(values.day.getDate())) : type === "signOut" ? record.signInTime : values.signIn.setDate(record.signOutTime.getDate()),
        signOutTime: type === "fullDay" ? new Date(values.signOut.setDate(values.day.getDate())) : type === "signOut" ? values.signOut.setDate(new Date(record.signInTime).getDate()) : record.signOutTime,
        id: record ? record.user : values.user,
      },
    })
      .then(response => {
        document.getElementById("room-form-error-message").innerHTML = response.data;
        console.log(response.data);
      })
      .then(AxiosInstance.get("/staff/fe/user-records", {
        headers: {
          "auth-access-token": AuthTokenManager.getAuthAccessToken(),
        },
        params: {
          user: values.user,
          day: values.day,
        },
      }).then(res => { setRecords(res.data); }))
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
  const handleDateChoose = values => {
    AxiosInstance.get("/staff/fe/user-records", {
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
      params: {
        user: values.user,
        day: values.day,
      },
    }).then(res => { console.log(res.data); setRecords(res.data); }).catch(err => console.log(err));
  };
  const editRecord = id => {
    setRecord(records.filter(currentRecord => currentRecord._id === id)[0]);
    toggle();
  };

  const recordsRows = records.map(currentRecord => (
    <tr key={currentRecord._id}>
      <td>{currentRecord.signInTime ? (new Date(currentRecord.signInTime)).toString() : null}</td>
      <td>{currentRecord.signOutTime ? (new Date(currentRecord.signOutTime)).toString() : null}</td>
      {currentRecord.signInTime && currentRecord.signOutTime
        ? null : <td><Button onClick={() => { editRecord(currentRecord._id); }}>Edit</Button></td>}
    </tr>
  ));
  return (
    <>
      <Formik
        validationSchema={findValidationSchema}
        onSubmit={handleDateChoose}
        initialValues={initialValues}
      >
        <Form>
          <Label for="user">Id:</Label>
          <Field
            name="user"
            placeholder={placeholders.user}
          />
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
          <div className="form-error-message" id="room-form-error-message" />
        </Form>
      </Formik>
      <Table>
        <thead>
          <tr>
            <th>Sign In time</th>
            <th>Sign out time</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {recordsRows}
        </tbody>
      </Table>
      <Modal toggle={toggle} isOpen={modalOpen}>
        <ModalBody>
          <Formik
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            initialValues={initialValues}
          >
            <Form>
              {record ? null : (
                <>
                  <Label for="user">Id:</Label>
                  <Field
                    name="user"
                    placeholder={placeholders.user}
                  />
                  <div className="form-input-error-message">
                    <ErrorMessage name="user" />
                  </div>
                </>
              )}
              {record ? null
                : (
                  <div>
                    <Label for="day">Day:</Label>
                    <DatePickerField name="day" />
                    <Label for="day" />
                  </div>
                )}
              {record && record.signInTime ? null : (
                <>
                  <Label for="signIn">Sign In:</Label>
                  <TimePickerField name="signIn" />
                  <div className="form-input-error-message">
                    <ErrorMessage name="signIn" />
                  </div>
                </>
              )}
              {record && record.signOutTime ? null : (
                <>
                  <Label for="signOut">Sign Out:</Label>
                  <TimePickerField name="signOut" />
                  <div className="form-input-error-message">
                    <ErrorMessage name="signOut" />
                  </div>
                </>
              )}
              <div>
                <Button className="rounded bg-success" type="submit">Send request</Button>
              </div>
              <div className="form-error-message" id="room-form-error-message" />
            </Form>
          </Formik>
        </ModalBody>
      </Modal>
      <Button onClick={() => editRecord("")}>Add record</Button>
    </>
  );
}

export default HrAddAttendanceRecord;
