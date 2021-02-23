import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardFooter, CardText } from "reactstrap";
import Axios from "axios";
import AxiosInstance from "../../../others/AxiosInstance";
import AuthTokenManager from "../../../others/AuthTokenManager";

function Notifications(props) {
  const { notifications } = props;
  const [notis, setNotifications] = useState(notifications ? notifications : []);

  useEffect(() => {
    if (notifications === undefined) {
      AxiosInstance.get("/staff/fe/academic/notifications", {
        headers: {
          "auth-access-token": AuthTokenManager.getAuthAccessToken()
        }
      }).then(res => { setNotifications(res.data); });
    }
    AxiosInstance("/staff/fe/academic/mark-notifications-seen", {
      method: "PUT",
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken()
      },
      data: {
        seenNotifications: notis
      }
    });
  }, []);

  let Cards = notis.map((noti) => {
    return <Link key={noti._id} to="/staff/home/requests"><Card className={noti.seen ? "bg-white p-2 m-1" : "bg-warning p-2 m-1"}>
      <CardText>
        {noti.message}
      </CardText>
      <CardFooter>
        {noti.createdAt.replace("T", " ").split(".")[0]}
      </CardFooter>
    </Card></Link>;
  });
  return <>
    {Cards}
  </>;
};

export default Notifications;