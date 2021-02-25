import React, { useEffect, useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Axios from "axios";
import AxiosInstance from "../../../../others/AxiosInstance";
import AuthTokenManager from "../../../../others/AuthTokenManager";
import useAxiosCancel from "../../../../hooks/AxiosCancel";
import Spinner from "../../../helper_components/Spinner";
import HrViewHrMembers from "./HrViewHrMembers";
import HrAddHrMember from "./HrAddHrMember";
import HrUpdateHrMember from "./HrUpdateHrMember";

function HrHrMembers() {
  const [hrMembers, setHrMembers] = useState([]);
  const [initialIsLoading, setInitialLoading] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const match = useRouteMatch();
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

  const fetchHrMembers = async () => {
    setLoading(true);
    await AxiosInstance.get("/staff/hr/get-hr-members", {
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    })
      .then(response => {
        setHrMembers(response.data);
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
  useEffect(fetchHrMembers, []);

  if (initialIsLoading) {
    return <Spinner />;
  }
  return (
    <Switch>
      <Route exact path={`${match.path}`}>
        <HrViewHrMembers
          isLoading={isLoading}
          hrMembers={hrMembers}
          updateHrMembers={fetchHrMembers}
        />
      </Route>

      <Route exact path={`${match.path}/add`}>
        <HrAddHrMember updateHrMembers={fetchHrMembers} />
      </Route>

      <Route exact path={`${match.path}/update/:id`}>
        <HrUpdateHrMember hrMembers={hrMembers} updateHrMembers={fetchHrMembers} />
      </Route>
    </Switch>
  );
}

export default HrHrMembers;
