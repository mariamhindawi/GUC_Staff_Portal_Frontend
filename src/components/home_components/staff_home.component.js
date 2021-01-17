import React from "react";
import { Route, useHistory } from "react-router-dom";

import HrHomePage from "./hr_home.component";
import HodHomePage from "./hod_home.component";
import CiHomePage from "./ci_home.component";
import CCHome from "./cc_home.component";
import TaHomePage from "./ta_home.component";

const StaffHome = () => {

  const history = useHistory();

  if (!sessionStorage.token) {
    history.push("/");
    return <></>;
  }

  return (
    <>
      <Route path="/staff/hr"> <HrHomePage /> </Route>
      <Route path="/staff/hod"> <HodHomePage /> </Route>
      <Route path="/staff/ci"> <CiHomePage /> </Route>
      <Route path="/staff/cc"> <CCHome /> </Route>
      <Route path="/staff/ta"> <TaHomePage />  </Route>
    </>
  );
}

export default StaffHome;