import React, { useEffect, useState } from "react";
import { addDays, isAfter, isValid } from "date-fns";
import { Alert, Modal } from "react-bootstrap";
import { KeyboardDatePicker } from "@material-ui/pickers";
import Axios from "axios";
import AxiosInstance from "../../../../others/AxiosInstance";
import AuthTokenManager from "../../../../others/AuthTokenManager";
import useAxiosCancel from "../../../../hooks/AxiosCancel";
import Spinner from "../../../helper_components/Spinner";
import AddButton from "../../../button_components/AddButton";
import AttendanceRecordsList from "../../../list_components/AttendanceRecordsList";
import AttendanceRecordForm from "../../../form_components/AttendanceRecordForm";
import DeleteModal from "../../../helper_components/DeleteModal";

function HrEditAttendanceRecords() {
  const [isLoading, setLoading] = useState(false);
  const [userFound, setUserFound] = useState(false);
  const [userId, setUserId] = useState("");
  const [day, setDay] = useState(addDays(Date.now(), -1));
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState({ _id: "" });
  const [editModalIsOpen, setEditModalOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalOpen] = useState(false);
  const [deleteModalState, setDeleteModalState] = useState("will submit");
  const [deleteModalMessage, setDeleteModalMessage] = useState({ messageText: "", messageStyle: "" });
  const axiosCancelSource = Axios.CancelToken.source();
  const axiosCancelSource2 = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource, [userId, day]);
  useAxiosCancel(axiosCancelSource2);

  const fetchAttendanceRecords = async () => {
    if (userId === "" || !isValid(day) || isAfter(day, addDays(Date.now(), -1))) {
      setAttendanceRecords([]);
      return;
    }
    setLoading(true);
    await AxiosInstance.get("/staff/hr/get-user-day-attendance-records", {
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
      params: {
        user: userId,
        day,
      },
    })
      .then(response => {
        const { data } = response;
        for (let i = 0; i < data.length; i++) {
          const attendanceRecord = data[i];
          attendanceRecord.signInTime = new Date(attendanceRecord.signInTime);
          attendanceRecord.signOutTime = new Date(attendanceRecord.signOutTime);
        }
        setAttendanceRecords(data);
        setUserFound(true);
        setLoading(false);
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(error.message);
        }
        else if (error.response) {
          console.log(error.response);
          setAttendanceRecords([]);
          setUserFound(false);
          setLoading(false);
        }
        else if (error.request) {
          console.log(error.request);
        }
        else {
          console.log(error.message);
        }
      });
  };
  useEffect(fetchAttendanceRecords, [userId, day]);

  const handleUserChange = e => {
    setUserId(e.target.value);
  };
  const handleDateChange = value => {
    setDay(value);
  };
  const toggleEditModal = attendanceRecordId => {
    if (attendanceRecordId) {
      setSelectedRecord(attendanceRecords.filter(record => record._id === attendanceRecordId)[0]);
    }
    setEditModalOpen(prevState => !prevState);
  };
  const resetEditModal = () => {
    setSelectedRecord({ _id: "" });
  };
  const deleteAttendanceRecord = async attendanceRecordId => {
    setDeleteModalState("submitting");
    await AxiosInstance.delete(`/staff/hr/delete-attendance-record/${attendanceRecordId}`, {
      cancelToken: axiosCancelSource2.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    })
      .then(async response => {
        setDeleteModalMessage({
          messageText: response.data,
          messageStyle: "success",
        });
        setDeleteModalState("submitted");
        fetchAttendanceRecords();
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(error.message);
        }
        else if (error.response) {
          setDeleteModalMessage({
            messageText: error.response.data,
            messageStyle: "danger",
          });
          setDeleteModalState("submitted");
        }
        else if (error.request) {
          console.log(error.request);
        }
        else {
          console.log(error.message);
        }
      });
  };
  const toggleDeleteModal = attendanceRecordId => {
    if (attendanceRecordId) {
      setSelectedRecord(attendanceRecords.filter(record => record._id === attendanceRecordId)[0]);
    }
    setDeleteModalOpen(prevState => !prevState);
  };
  const resetDeleteModal = () => {
    setSelectedRecord({ _id: "" });
    setDeleteModalState("will submit");
    setDeleteModalMessage({ messageText: "", messageStyle: "" });
  };

  const renderList = () => {
    if (userId === "" || !isValid(day) || isAfter(day, addDays(Date.now(), -1))) {
      return null;
    }
    if (isLoading) {
      return <Spinner />;
    }
    if (userFound) {
      return (
        <AttendanceRecordsList
          attendanceRecords={attendanceRecords}
          listType="Edit"
          toggleEditModal={toggleEditModal}
          toggleDeleteModal={toggleDeleteModal}
        />
      );
    }
    return <Alert variant="warning">User not found</Alert>;
  };

  return (
    <div className="view-container">
      <div className="add-missing-record-select">
        <div>
          <input
            className="input"
            type="search"
            value={userId}
            placeholder="User ID"
            onChange={handleUserChange}
          />
          <KeyboardDatePicker
            className="datepicker"
            placeholder="Select day"
            value={day}
            onChange={handleDateChange}
            format="dd/MM/yyyy"
            variant="inline"
            maxDate={addDays(Date.now(), -1)}
            PopoverProps={{ className: "datepicker-popover" }}
          />
        </div>
        <AddButton onClick={() => { toggleEditModal(""); }}>Add missing record</AddButton>
      </div>

      <div className="hr-attendance-container">
        {renderList()}
      </div>

      <Modal
        className="edit-modal"
        show={editModalIsOpen}
        onHide={toggleEditModal}
        onExited={resetEditModal}
        restoreFocus={false}
      >
        <AttendanceRecordForm
          attendanceRecord={selectedRecord}
          updateAttendanceRecords={fetchAttendanceRecords}
        />
      </Modal>

      <DeleteModal
        isOpen={deleteModalIsOpen}
        state={deleteModalState}
        message={deleteModalMessage}
        itemToDelete={selectedRecord._id}
        deleteItem={deleteAttendanceRecord}
        toggle={toggleDeleteModal}
        reset={resetDeleteModal}
      />
    </div>
  );
}

export default HrEditAttendanceRecords;
