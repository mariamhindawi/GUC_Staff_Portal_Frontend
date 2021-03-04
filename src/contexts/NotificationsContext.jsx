import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const NotificationsContext = createContext();
const SetNotificationsContext = createContext();
NotificationsContext.displayName = "Notifications Context";
SetNotificationsContext.displayName = "Set Notifications Context";

function NotificationsProvider(props) {
  const [notifications, setNotifications] = useState([]);

  return (
    <NotificationsContext.Provider value={notifications}>
      <SetNotificationsContext.Provider value={setNotifications}>
        {props.children}
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

export { NotificationsProvider, useNotificationsContext, useSetNotificationsContext };
