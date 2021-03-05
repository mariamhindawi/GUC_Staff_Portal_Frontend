import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch, useLocation, useRouteMatch } from "react-router-dom";
import Schedule from "node-schedule";
import Axios from "axios";
import AxiosInstance from "../../../others/AxiosInstance";
import AuthTokenManager from "../../../others/AuthTokenManager";
import useAxiosCancel from "../../../hooks/AxiosCancel";
import { useUserContext } from "../../../contexts/UserContext";
import { useSetNotificationsContext } from "../../../contexts/NotificationsContext";
import Navbar from "../../navigation_components/Navbar";
import Sidebar from "../../navigation_components/Sidebar";
import HrHomePage from "../hr_components/HrHome";
import HodHomePage from "../hod_components/HodHome";
import CiHomePage from "../ci_components/CiHome";
import CCHome from "../cc_components/CcHome";
import TaHomePage from "../ta_components/TaHome";

function StaffHome() {
  const [sidebarStyle, setSidebarStyle] = useState("");
  const [homeContainerStyle, setHomeContainerStyle] = useState("");
  const setNotifications = useSetNotificationsContext();
  const user = useUserContext();
  const match = useRouteMatch();
  const location = useLocation();
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

  const fetchNotifications = async () => {
    await AxiosInstance({
      method: "get",
      url: "/staff/academic/get-notifications",
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    })
      .then(response => {
        setNotifications(response.data);
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(error.message);
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
      });
  };
  // eslint-disable-next-line consistent-return
  const scheduleFetchingNotifications = () => {
    if (user.role !== "HR" && user.loggedIn) {
      fetchNotifications();
      const fetchNotificationsJob = Schedule.scheduleJob("*/10 * * * * *", () => {
        fetchNotifications();
      });
      return () => {
        fetchNotificationsJob.cancel();
        setNotifications([]);
      };
    }
  };
  useEffect(scheduleFetchingNotifications, []);

  if (!AuthTokenManager.getAuthAccessToken()) {
    return <Redirect to="/login" />;
  }
  if (!user.loggedIn && location.pathname !== `/staff/${user.rolePath}/reset-password`) {
    return <Redirect to={`/staff/${user.rolePath}/reset-password`} />;
  }
  return (
    <div className="main-container">
      <Navbar setSidebarStyle={setSidebarStyle} setHomeContainerStyle={setHomeContainerStyle} />
      <Sidebar sidebarStyle={sidebarStyle} />
      <Switch>
        <Route exact path={match.path}><Redirect to={`${match.path}/${user.rolePath}`} /></Route>
        <Route path={`${match.path}/hr`}><HrHomePage homeContainerStyle={homeContainerStyle} /></Route>
        <Route path={`${match.path}/hod`}><HodHomePage homeContainerStyle={homeContainerStyle} /></Route>
        <Route path={`${match.path}/ci`}><CiHomePage homeContainerStyle={homeContainerStyle} /></Route>
        <Route path={`${match.path}/cc`}><CCHome homeContainerStyle={homeContainerStyle} /></Route>
        <Route path={`${match.path}/ta`}><TaHomePage homeContainerStyle={homeContainerStyle} /></Route>
        <Route path={match.path}><Redirect to="/404" /></Route>
      </Switch>
    </div>
  );
}

export default StaffHome;
