import React, { useEffect, useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Axios from "axios";
import AxiosInstance from "../../../others/AxiosInstance";
import AuthTokenManager from "../../../others/AuthTokenManager";
import useAxiosCancel from "../../../hooks/AxiosCancel";
import Spinner from "../../helper_components/Spinner";
import HrViewRooms from "./HrViewRooms";
import HrAddRoom from "./HrAddRoom";
import HrUpdateRoom from "./HrUpdateRoom";

function HrRooms() {
  const [rooms, setRooms] = useState([]);
  const [initialIsLoading, setInitialLoading] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const match = useRouteMatch();
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

  const fetchRooms = async () => {
    setLoading(true);
    await AxiosInstance.get("/staff/hr/get-rooms", {
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    })
      .then(response => {
        setRooms(response.data);
        setInitialLoading(false);
        setLoading(false);
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(`Request cancelled: ${error.message}`);
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
  useEffect(fetchRooms, []);

  if (initialIsLoading) {
    return <Spinner />;
  }
  return (
    <Switch>
      <Route exact path={`${match.path}`}>
        <HrViewRooms
          isLoading={isLoading}
          rooms={rooms}
          updateRooms={fetchRooms}
        />
      </Route>

      <Route exact path={`${match.path}/add`}>
        <HrAddRoom updateRooms={fetchRooms} />
      </Route>

      <Route exact path={`${match.path}/update/:_id`}>
        <HrUpdateRoom rooms={rooms} updateRooms={fetchRooms} />
      </Route>
    </Switch>
  );
}

export default HrRooms;
