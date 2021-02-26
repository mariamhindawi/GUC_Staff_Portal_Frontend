import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import Axios from "axios";
import AxiosInstance from "../../../../others/AxiosInstance";
import AuthTokenManager from "../../../../others/AuthTokenManager";
import useAxiosCancel from "../../../../hooks/AxiosCancel";
import Spinner from "../../../helper_components/Spinner";
import AttendanceSelect from "./AttendanceSelect";
import AttendanceRecordsList from "../../../list_components/AttendanceRecordsList";
import MissingDaysList from "../../../list_components/MissingDaysList";
import ViewHours from "./ViewHours";
import ViewSalary from "./ViewSalary";

function Attendance() {
  const [isLoading, setLoading] = useState({
    attendanceRecords: true, missingDays: true, hours: true, salary: true,
  });
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [missingDays, setMissingDays] = useState([]);
  const [hours, setHours] = useState({ requiredHours: 0, missingHours: 0, extraHours: 0 });
  const [salary, setSalary] = useState({ baseSalary: 0, calculatedSalary: 0 });
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource, [month, year]);

  const fetchAttendanceRecords = async () => {
    setLoading(prevState => ({ ...prevState, attendanceRecords: true }));
    await AxiosInstance.get("/staff/view-attendance-records", {
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
      params: {
        month,
        year,
      },
    })
      .then(response => {
        for (let i = 0; i < response.data.length; i++) {
          const attendanceRecord = response.data[i];
          attendanceRecord.signInTime = new Date(attendanceRecord.signInTime);
          attendanceRecord.signOutTime = new Date(attendanceRecord.signOutTime);
        }
        setAttendanceRecords(response.data);
        setLoading(prevState => ({ ...prevState, attendanceRecords: false }));
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(error.message);
        }
        else if (error.response) {
          setLoading(prevState => ({ ...prevState, attendanceRecords: false }));
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
  const fetchMissingDays = async () => {
    setLoading(prevState => ({ ...prevState, missingDays: true }));
    await AxiosInstance.get("/staff/view-missing-days", {
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
      params: {
        month,
        year,
      },
    })
      .then(response => {
        for (let i = 0; i < response.data.length; i++) {
          response.data[i] = new Date(response.data[i]);
        }
        setMissingDays(response.data);
        setLoading(prevState => ({ ...prevState, missingDays: false }));
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(error.message);
        }
        else if (error.response) {
          setLoading(prevState => ({ ...prevState, missingDays: false }));
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
  const fetchHours = async () => {
    setLoading(prevState => ({ ...prevState, hours: true }));
    await AxiosInstance.get("/staff/view-hours", {
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
      params: {
        month,
        year,
      },
    })
      .then(response => {
        setHours(response.data);
        setLoading(prevState => ({ ...prevState, hours: false }));
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(error.message);
        }
        else if (error.response) {
          setLoading(prevState => ({ ...prevState, hours: false }));
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
  const fetchSalary = async () => {
    setLoading(prevState => ({ ...prevState, salary: true }));
    await AxiosInstance.get("/staff/view-salary", {
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
      params: {
        month,
        year,
      },
    })
      .then(response => {
        setSalary(response.data);
        setLoading(prevState => ({ ...prevState, salary: false }));
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(error.message);
        }
        else if (error.response) {
          setLoading(prevState => ({ ...prevState, salary: false }));
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
  useEffect(fetchAttendanceRecords, [month, year]);
  useEffect(fetchMissingDays, [month, year]);
  useEffect(fetchHours, [month, year]);
  useEffect(fetchSalary, [month, year]);

  return (
    <div className="view-container">
      <AttendanceSelect month={month} year={year} setMonth={setMonth} setYear={setYear} />
      <Tabs className="view-tabs attendance-tabs" defaultActiveKey="attendanceRecords">
        <Tab className="view-tab" eventKey="attendanceRecords" title="Attendance Records">
          {isLoading.attendanceRecords
            ? <Spinner />
            : <AttendanceRecordsList attendanceRecords={attendanceRecords} />}
        </Tab>
        <Tab className="view-tab" eventKey="missingDays" title="Missing Days">
          {isLoading.missingDays
            ? <Spinner />
            : <MissingDaysList missingDays={missingDays} />}
        </Tab>
        <Tab className="view-tab" eventKey="hours" title="Hours">
          {isLoading.hours
            ? <Spinner />
            : <ViewHours hours={hours} />}
        </Tab>
        <Tab className="view-tab" eventKey="salary" title="Salary">
          {isLoading.salary
            ? <Spinner />
            : <ViewSalary salary={salary} />}
        </Tab>
      </Tabs>
    </div>
  );
}

export default Attendance;
