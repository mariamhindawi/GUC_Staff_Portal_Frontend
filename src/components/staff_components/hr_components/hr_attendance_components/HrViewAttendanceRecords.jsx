import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import Axios from "axios";
import AxiosInstance from "../../../../others/AxiosInstance";
import AuthTokenManager from "../../../../others/AuthTokenManager";
import useAxiosCancel from "../../../../hooks/AxiosCancel";
import Spinner from "../../../helper_components/Spinner";
import AttendanceSelect from "../../general_staff_components/attendance_components/AttendanceSelect";
import AttendanceRecordsList from "../../../list_components/AttendanceRecordsList";

function HrAttendance() {
  const [isLoading, setLoading] = useState(false);
  const [userFound, setUserFound] = useState(false);
  const [userId, setUserId] = useState("");
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource, [userId, month, year]);

  const fetchAttendanceRecords = async () => {
    setLoading(true);
    await AxiosInstance.get("/staff/hr/view-staff-attendance-records", {
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
      params: {
        id: userId,
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
      <div className="hr-attendance">
        {renderList()}
      </div>
    </div>
  );
}
export default HrAttendance;
