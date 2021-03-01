import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Dropdown } from "react-bootstrap";
import { Card, CardFooter, CardText } from "reactstrap";
import Axios from "axios";
import AxiosInstance from "../../../others/AxiosInstance";
import AuthTokenManager from "../../../others/AuthTokenManager";
import useAxiosCancel from "../../../hooks/AxiosCancel";
import Spinner from "../../helper_components/Spinner";

function Notifications(props) {
  const [isLoading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [seenNotifications, setSeenNotifications] = useState([]);
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

  const fetchNotifications = () => {
    setLoading(true);
    AxiosInstance({
      method: "get",
      url: "/staff/academic/notifications",
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    })
      .then(response => {
        setNotifications(props.inNavbar ? response.data.slice(0, 2) : response.data);
        setLoading(false);
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(error.message);
        }
        else if (error.response) {
          console.log(error.response);
          setLoading(false);
        }
        else if (error.request) {
          console.log(error.request);
        }
        else {
          console.log(error.message);
        }
      });
  };
  const updateSeenNotifications = () => {
    AxiosInstance({
      method: "put",
      url: "/staff/academic/mark-notifications-seen",
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
      data: {
        seenNotifications,
      },
    })
      .then(response => {
        console.log(response.data);
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
  useEffect(fetchNotifications, []);
  useEffect(updateSeenNotifications, [seenNotifications]);

  const seeNotification = notification => {
    setSeenNotifications(prevState => {
      if (prevState.includes(notification)) {
        return prevState;
      }
      return [...prevState, notification];
    });
  };

  const notficationDrodownItems = () => {
    if (notifications.length === 0) {
      return (
        <Dropdown.Item className="dropdown-notification" as="span" tabIndex={0}>
          No Notifications
        </Dropdown.Item>
      );
    }
    return (notifications.map(notification => (
      <Dropdown.Item
        className={`dropdown-notification ${notification.seen ? "bg-white" : "bg-warning"}`}
        as="div"
        tabIndex={0}
        key={notification._id}
        onClick={() => { seeNotification(notification); }}
      >
        <span>{notification.message}</span>
        <span>{notification.createdAt.replace("T", " ").split(".")[0]}</span>
      </Dropdown.Item>
    )));
  };
  const notificationCards = () => {
    if (notifications.length === 0) {
      return (
        <Card className="notification-card">
          <CardText>
            No Notifications
          </CardText>
        </Card>
      );
    }
    return (notifications.map(notification => (
      <Card
        className={notification.seen ? "notification-card" : "notification-card bg-warning"}
        key={notification._id}
        onClick={() => { seeNotification(notification); }}
      >
        <CardText>
          {notification.message}
        </CardText>
        <CardFooter>
          {notification.createdAt.replace("T", " ").split(".")[0]}
        </CardFooter>
      </Card>
    )));
  };

  if (isLoading) {
    return <Spinner />;
  }
  if (props.inNavbar) {
    return <>{notficationDrodownItems()}</>;
  }
  return (
    <div className="view-container">
      <div className="notifications-container">
        {notificationCards()}
      </div>
    </div>
  );
}

Notifications.propTypes = {
  inNavbar: PropTypes.bool,
};

Notifications.defaultProps = {
  inNavbar: false,
};

export default Notifications;
