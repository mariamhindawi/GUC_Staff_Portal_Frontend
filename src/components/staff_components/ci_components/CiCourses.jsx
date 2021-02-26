import React, { useEffect, useState } from "react";
import Axios from "axios";
import AxiosInstance from "../../../others/AxiosInstance";
import AuthTokenManager from "../../../others/AuthTokenManager";
import useAxiosCancel from "../../../hooks/AxiosCancel";
import Spinner from "../../helper_components/Spinner";
import CiCourseList from "../../list_components/CiCourseList";

function CiCourses() {
  const [isLoading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [coverages, setCoverages] = useState([]);
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

  const fetchCourses = async () => {
    setLoading(true);
    await AxiosInstance.get("/staff/ci/view-coverage", {
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    })
      .then(response => {
        setCourses(response.data.courses);
        setCoverages(response.data.coverages);
        setLoading(false);
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(`Request cancelled: ${error.message}`);
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

  useEffect(fetchCourses, []);

  return (
    <div className="view-container">
      {isLoading
        ? <Spinner />
        : <CiCourseList courses={courses} coverages={coverages} />}
    </div>
  );
}

export default CiCourses;
