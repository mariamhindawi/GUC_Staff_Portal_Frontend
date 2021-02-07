import React, { useEffect, useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Axios from "axios";
import AxiosInstance from "../../../others/AxiosInstance";
import AuthTokenManager from "../../../others/AuthTokenManager";
import ErrorMessages from "../../../others/ErrorMessages";
import HrViewAcademics from "./HrViewAcademics";
import HrAddAcademic from "./HrAddAcademic";
import HrUpdateAcademic from "./HrUpdateAcademic";
import Spinner from "../../helper_components/Spinner";

function HrAcademics() {
  const [academics, setAcademics] = useState([]);
  const [initialIsLoading, setInitialLoading] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const match = useRouteMatch();
  const axiosCancelSource = Axios.CancelToken.source();

  const fetchAcademics = async () => {
    setLoading(true);
    await AxiosInstance.get("/staff/fe/get-academics", {
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    })
      .then(res => {
        setAcademics(res.data);
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(`Request cancelled: ${error.message}`);
        }
        else if (error.response) {
          console.log(error.response);
        }
        else if (error.request) {
          console.log(error.request);
        }
        else {
          console.log(error.message);
        }
      })
      .finally(() => {
        setInitialLoading(false);
        setLoading(false);
      });
    return () => { axiosCancelSource.cancel(ErrorMessages.requestCancellation); };
  };

  useEffect(fetchAcademics, []);

  if (initialIsLoading) {
    return <Spinner />;
  }
  return (
    <Switch>
      <Route exact path={`${match.path}`}>
        <HrViewAcademics
          isLoading={isLoading}
          academics={academics}
          updateAcademics={fetchAcademics}
        />
      </Route>

      <Route exact path={`${match.path}/add`}>
        <HrAddAcademic updateAcademics={fetchAcademics} />
      </Route>

      <Route exact path={`${match.path}/update/:id`}>
        <HrUpdateAcademic academics={academics} updateAcademics={fetchAcademics} />
      </Route>
    </Switch>
  );
}

export default HrAcademics;
