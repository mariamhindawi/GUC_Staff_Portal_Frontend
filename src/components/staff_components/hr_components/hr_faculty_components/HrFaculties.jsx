import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import Axios from "axios";
import AxiosInstance from "../../../../others/AxiosInstance";
import AuthTokenManager from "../../../../others/AuthTokenManager";
import useAxiosCancel from "../../../../hooks/AxiosCancel";
import Spinner from "../../../helper_components/Spinner";
import HrViewFaculties from "./HrViewFaculties";
import HrAddFaculty from "./HrAddFaculty";
import HrUpdateFaculty from "./HrUpdateFaculty";

function HrFaculties() {
  const [faculties, setFaculties] = useState([]);
  const [initialIsLoading, setInitialLoading] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const match = useRouteMatch();
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

  const fetchFaculties = async () => {
    setLoading(true);
    await AxiosInstance.get("/staff/hr/get-faculties", {
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    })
      .then(response => {
        setFaculties(response.data);
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
  useEffect(fetchFaculties, []);

  if (initialIsLoading) {
    return <Spinner />;
  }
  return (
    <Switch>
      <Route exact path={`${match.path}`}>
        <HrViewFaculties
          isLoading={isLoading}
          faculties={faculties}
          updateFaculties={fetchFaculties}
        />
      </Route>
      <Route exact path={`${match.path}/add`}>
        <HrAddFaculty updateFaculties={fetchFaculties} />
      </Route>
      <Route exact path={`${match.path}/update/:_id`}>
        <HrUpdateFaculty faculties={faculties} updateFaculties={fetchFaculties} />
      </Route>
      <Route path={match.path}>
        <Redirect to="/404" />
      </Route>
    </Switch>
  );
}

export default HrFaculties;
