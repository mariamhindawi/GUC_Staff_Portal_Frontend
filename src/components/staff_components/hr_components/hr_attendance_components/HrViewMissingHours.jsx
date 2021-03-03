import React, { useEffect, useState } from "react";
import { addDays, isBefore } from "date-fns";
import Axios from "axios";
import AxiosInstance from "../../../../others/AxiosInstance";
import AuthTokenManager from "../../../../others/AuthTokenManager";
import useAxiosCancel from "../../../../hooks/AxiosCancel";
import Spinner from "../../../helper_components/Spinner";
import AttendanceSelect from "../../general_staff_components/attendance_components/AttendanceSelect";
import UsersMissingHoursList from "../../../list_components/UsersMissingHoursList";

function HrViewMissingHours() {
  const [isLoading, setLoading] = useState(true);
  const [month, setMonth] = useState(isBefore(new Date(), new Date().setDate(11))
    ? new Date().getMonth() : new Date().getMonth() + 1);
  const [year, setYear] = useState(addDays(Date.now(), -10).getFullYear());
  const [usersMissingHours, setUsersMissingHours] = useState([]);
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource, [month, year]);

  const fetchMissingHours = async () => {
    setLoading(true);
    await AxiosInstance.get("/staff/hr/get-staff-missing-hours", {
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
        setUsersMissingHours(response.data);
        setLoading(false);
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(error.message);
        }
        else if (error.response) {
          setLoading(false);
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
  useEffect(fetchMissingHours, [month, year]);

  return (
    <div className="view-container">
      <AttendanceSelect
        month={month}
        year={year}
        setMonth={setMonth}
        setYear={setYear}
      />
      <div className="hr-attendance-container">
        {isLoading
          ? <Spinner />
          : <UsersMissingHoursList usersMissingHours={usersMissingHours} />}
      </div>
    </div>
  );
}
export default HrViewMissingHours;
