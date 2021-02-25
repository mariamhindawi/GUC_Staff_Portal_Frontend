import React, { useEffect, useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Axios from "axios";
import AxiosInstance from "../../../../others/AxiosInstance";
import AuthTokenManager from "../../../../others/AuthTokenManager";
import useAxiosCancel from "../../../../hooks/AxiosCancel";
import Spinner from "../../../helper_components/Spinner";
import HrViewDepartments from "./HrViewDepartments";
import HrAddDepartment from "./HrAddDepartment";
import HrUpdateDepartment from "./HrUpdateDepartment";

function HrDepartments() {
  const [departments, setDepartments] = useState([]);
  const [initialIsLoading, setInitialLoading] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const match = useRouteMatch();
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

  const fetchDepartments = async () => {
    setLoading(true);
    await AxiosInstance.get("/staff/hr/get-departments", {
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    })
      .then(response => {
        setDepartments(response.data);
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
  useEffect(fetchDepartments, []);

  if (initialIsLoading) {
    return <Spinner />;
  }
  return (
    <Switch>
      <Route exact path={`${match.path}`}>
        <HrViewDepartments
          isLoading={isLoading}
          departments={departments}
          updateDepartments={fetchDepartments}
        />
      </Route>

      <Route exact path={`${match.path}/add`}>
        <HrAddDepartment updateDepartments={fetchDepartments} />
      </Route>

      <Route exact path={`${match.path}/update/:_id`}>
        <HrUpdateDepartment departments={departments} updateDepartments={fetchDepartments} />
      </Route>
    </Switch>
  );
}

export default HrDepartments;
