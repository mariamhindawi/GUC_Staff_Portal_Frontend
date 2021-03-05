import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useRouteMatch } from "react-router-dom";
import { Card, Dropdown } from "react-bootstrap";
import Axios from "axios";
import AxiosInstance from "../../../others/AxiosInstance";
import AuthTokenManager from "../../../others/AuthTokenManager";
import useAxiosCancel from "../../../hooks/AxiosCancel";
import { useUserContext } from "../../../contexts/UserContext";
import { useNotificationsContext, useSetNotificationsContext } from "../../../contexts/NotificationsContext";
import Spinner from "../../helper_components/Spinner";

function Notifications(props) {
  const [isLoading, setLoading] = useState(true);
  const notifications = useNotificationsContext();
  const setNotifications = useSetNotificationsContext();
  const [seenNotifications, setSeenNotifications] = useState([]);
  const user = useUserContext();
  const match = useRouteMatch();
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
  const updateSeenNotifications = async () => {
    await AxiosInstance({
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
      .then(async () => {
        await fetchNotifications();
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

  const seeNotification = clickedNotification => {
    if (clickedNotification.seen) {
      return;
    }
    setSeenNotifications(prevState => [...prevState, clickedNotification]);
    setNotifications(prevNotifications => {
      const notification = prevNotifications.filter(n => n._id === clickedNotification._id)[0];
      notification.seen = true;
      return prevNotifications;
    });
  };

  const notficationDrodownItems = () => {
    if (notifications.length === 0) {
      return (
        <Dropdown.Item
          className="dropdown-no-notifications"
          as="span"
          tabIndex={0}
        >
          No Notifications
        </Dropdown.Item>
      );
    }
    const navbarNotifications = notifications.slice(0, 2);
    return (navbarNotifications.map(notification => (
      <Dropdown.Item
        className={`dropdown-notification ${notification.seen ? "seen-notification" : "unseen-notification"}`}
        as={Link}
        to={`${match.path}/${user.rolePath}/notifications`}
        onClick={() => { seeNotification(notification); }}
        key={notification._id}
      >
        <span>{notification.message}</span>
        <span>{notification.createdAt.replace("T", " ").split(".")[0]}</span>
      </Dropdown.Item>
    )));
  };
  const notificationCards = () => {
    if (notifications.length === 0) {
      return (
        <Card className="no-notifications-card" body>
          <Card.Title>
            No Notifications
          </Card.Title>
        </Card>
      );
    }
    return (notifications.map(notification => (
      <Card
        className={`notification-card ${notification.seen ? "seen-notification" : "unseen-notification"}`}
        tabIndex={0}
        onClick={() => { seeNotification(notification); }}
        onKeyPress={() => { seeNotification(notification); }}
        key={notification._id}
      >
        <Card.Body>
          <Card.Text>
            {notification.message}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          {notification.createdAt.replace("T", " ").split(".")[0]}
        </Card.Footer>
      </Card>
    )));
  };

  if (props.inNavbar) {
    return <>{notficationDrodownItems()}</>;
  }
  if (isLoading) {
    return <Spinner />;
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
