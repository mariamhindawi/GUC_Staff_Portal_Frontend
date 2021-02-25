import React, { useEffect, useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Axios from "axios";
import AxiosInstance from "../../../../others/AxiosInstance";
import AuthTokenManager from "../../../../others/AuthTokenManager";
import useAxiosCancel from "../../../../hooks/AxiosCancel";
import Spinner from "../../../helper_components/Spinner";
import HrViewCourses from "./HrViewCourses";
import HrAddCourse from "./HrAddCourse";
import HrUpdateCourse from "./HrUpdateCourse";

function HrCourses() {
  const [courses, setCourses] = useState([]);
  const [initialIsLoading, setInitialLoading] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const match = useRouteMatch();
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

  const fetchCourses = async () => {
    setLoading(true);
    await AxiosInstance.get("/staff/hr/get-courses", {
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    })
      .then(response => {
        setCourses(response.data);
        setInitialLoading(false);
        setLoading(false);
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(error.message);
        }
        else if (error.response) {
          setInitialLoading(false);
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

  if (initialIsLoading) {
    return <Spinner />;
  }
  return (
    <Switch>
      <Route exact path={`${match.path}`}>
        <HrViewCourses
          isLoading={isLoading}
          courses={courses}
          updateCourses={fetchCourses}
        />
      </Route>

      <Route exact path={`${match.path}/add`}>
        <HrAddCourse updateCourses={fetchCourses} />
      </Route>

      <Route exact path={`${match.path}/update/:_id`}>
        <HrUpdateCourse courses={courses} updateCourses={fetchCourses} />
      </Route>
    </Switch>
  );
}

export default HrCourses;
