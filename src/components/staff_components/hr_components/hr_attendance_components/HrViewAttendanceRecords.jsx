import React, { useEffect, useState } from "react";
import { addDays, isBefore } from "date-fns";
import { Alert } from "react-bootstrap";
import Axios from "axios";
import AxiosInstance from "../../../../others/AxiosInstance";
import AuthTokenManager from "../../../../others/AuthTokenManager";
import useAxiosCancel from "../../../../hooks/AxiosCancel";
import Spinner from "../../../helper_components/Spinner";
import AttendanceSelect from "../../general_staff_components/attendance_components/AttendanceSelect";
import AttendanceRecordsList from "../../../list_components/AttendanceRecordsList";

function HrViewAttendanceRecords() {
  const [isLoading, setLoading] = useState(false);
  const [userFound, setUserFound] = useState(false);
  const [userId, setUserId] = useState("");
  const [month, setMonth] = useState(isBefore(new Date(), new Date().setDate(11))
    ? new Date().getMonth() : new Date().getMonth() + 1);
  const [year, setYear] = useState(addDays(Date.now(), -10).getFullYear());
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource, [userId, month, year]);

  const fetchAttendanceRecords = async () => {
    if (userId === "") {
      return;
    }
    setLoading(true);
    await AxiosInstance.get("/staff/hr/get-user-month-attendance-records", {
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
      params: {
        user: userId,
        month,
        year,
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
  useEffect(fetchAttendanceRecords, [userId, month, year]);

  const renderList = () => {
    if (userId === "") {
      return null;
    }
    if (isLoading) {
      return <Spinner />;
    }
    if (userFound) {
      return <AttendanceRecordsList attendanceRecords={attendanceRecords} />;
    }
    return <Alert variant="warning">User not found</Alert>;
  };

  return (
    <div className="view-container">
      <AttendanceSelect
        month={month}
        year={year}
        userId={userId}
        setMonth={setMonth}
        setYear={setYear}
        setUserId={setUserId}
        search
      />
      <div className="hr-attendance-container">
        {renderList()}
      </div>
    </div>
  );
}
export default HrViewAttendanceRecords;
