import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const NotificationsContext = createContext();
const SetNotificationsContext = createContext();
const UnseenNotificationsContext = createContext();
NotificationsContext.displayName = "Notifications Context";
SetNotificationsContext.displayName = "Set Notifications Context";
UnseenNotificationsContext.displayName = "Number of Unseen Notifications Context";

function NotificationsProvider(props) {
  const [notifications, setNotifications] = useState([]);
  const [numberOfUnseen, setNumberOfUnseen] = useState(0);

  const calculateNumberOfUnseen = () => {
    let count = 0;
    notifications.forEach(notification => {
      if (!notification.seen) {
        count++;
      }
    });
    setNumberOfUnseen(count);
  };
  useEffect(calculateNumberOfUnseen, [notifications]);

  return (
    <NotificationsContext.Provider value={notifications}>
      <SetNotificationsContext.Provider value={setNotifications}>
        <UnseenNotificationsContext.Provider value={numberOfUnseen}>
          {props.children}
        </UnseenNotificationsContext.Provider>
      </SetNotificationsContext.Provider>
    </NotificationsContext.Provider>
  );
}

NotificationsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function useNotificationsContext() {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error("useNotificationsContext must be used within a NotificationsProvider");
  }
  return context;
}

function useSetNotificationsContext() {
  const context = useContext(SetNotificationsContext);
  if (context === undefined) {
    throw new Error("useSetNotificationsContext must be used within a NotificationsProvider");
  }
  return context;
}

function useUnseenNotificationsContext() {
  const context = useContext(UnseenNotificationsContext);
  if (context === undefined) {
    throw new Error("useUnseenNotificationsContext must be used within a NotificationsProvider");
  }
  return context;
}

export {
  NotificationsProvider,
  useNotificationsContext,
  useSetNotificationsContext,
  useUnseenNotificationsContext
};
