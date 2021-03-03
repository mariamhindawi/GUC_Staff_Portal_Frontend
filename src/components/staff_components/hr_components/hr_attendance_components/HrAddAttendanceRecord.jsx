import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, Modal, ModalBody, Table } from "reactstrap";
import Axios from "axios";
import AxiosInstance from "../../../../others/AxiosInstance";
import AuthTokenManager from "../../../../others/AuthTokenManager";
import useAxiosCancel from "../../../../hooks/AxiosCancel";
import DatePickerField from "../../../form_components/form_input_components/DatePickerField";
import AttendanceRecordForm from "../../../form_components/AttendanceRecordForm";
import Input from "../../../form_components/form_input_components/Input";

function HrAddAttendanceRecord() {
  const [records, setRecords] = useState([]);
  const [record, setRecord] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

  const placeholders = {
    user: "User ID",
    day: "Choose day",
  };
  const initialValues = {
    user: "",
    day: "",
  };
  const findValidationSchema = Yup.object({
    user: Yup.string()
      .required("This field is required")
      .matches(/(([a][c]|[h][r])[-][0-9]+)$/, "Invalid user id"),
    day: Yup.date()
      .typeError("Invalid date")
      .required("This field is required")
      .max(new Date(Date.now() - 24 * 60 * 60 * 1000), "Date must be before current day"),
  });

  const toggleModal = () => setModalOpen(prevState => !prevState);
  const handleDateChoose = values => {
    AxiosInstance.get("/staff/hr/get-user-attendance-records", {
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
      params: {
        user: values.user,
        day: values.day,
      },
    })
      .then(response => {
        console.log(response.data);
        setRecords(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const editRecord = id => {
    setRecord(records.filter(currentRecord => currentRecord._id === id)[0]);
    toggleModal();
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
          <Input label="User" name="user" placeholder={placeholders.user} />
          <DatePickerField label="Day" name="day" placeholder={placeholders.day} />
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
      <Modal toggle={toggleModal} isOpen={modalOpen}>
        <ModalBody>
          <AttendanceRecordForm record={record} />
        </ModalBody>
      </Modal>
      <Button onClick={() => editRecord("")}>Add record</Button>
    </>
  );
}

export default HrAddAttendanceRecord;
