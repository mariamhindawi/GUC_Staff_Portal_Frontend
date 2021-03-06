/* eslint-disable react/jsx-filename-extension */
import React from "react";
import ReactDOM from "react-dom";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import { NotificationsProvider } from "./contexts/NotificationsContext";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <UserProvider>
          <NotificationsProvider>
            <App />
          </NotificationsProvider>
        </UserProvider>
      </MuiPickersUtilsProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
