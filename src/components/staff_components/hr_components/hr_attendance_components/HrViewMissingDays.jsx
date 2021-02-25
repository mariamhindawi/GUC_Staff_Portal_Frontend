import React, { useEffect, useState } from "react";
import Axios from "axios";
import AxiosInstance from "../../../../others/AxiosInstance";
import AuthTokenManager from "../../../../others/AuthTokenManager";
import useAxiosCancel from "../../../../hooks/AxiosCancel";
import Spinner from "../../../helper_components/Spinner";
import AttendanceSelect from "../../general_staff_components/attendance_components/AttendanceSelect";
import UsersMissingDaysList from "../../../list_components/UsersMissingDaysList";

function HrMissingDays() {
  const [isLoading, setLoading] = useState(true);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [usersMissingDays, setUsersMissingDays] = useState([]);
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource, [month, year]);

  const fetchMissingDays = async () => {
    setLoading(true);
    await AxiosInstance.get("/staff/hr/view-staff-missing-days", {
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
          const user = response.data[i];
          for (let j = 0; j < user.missingDays.length; j++) {
            user.missingDays[j] = new Date(user.missingDays[j]);
          }
        }
        setUsersMissingDays(response.data);
        setLoading(false);
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(error.message);
        }
        else if (error.response) {
          console.log(error.response);
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
  useEffect(fetchMissingDays, [month, year]);

  return (
    <div className="view-container">
      <AttendanceSelect
        month={month}
        year={year}
        setMonth={setMonth}
        setYear={setYear}
      />
      <div className="hr-attendance">
        {isLoading
          ? <Spinner />
          : <UsersMissingDaysList usersMissingDays={usersMissingDays} />}
      </div>
    </div>
  );
}
export default HrMissingDays;
