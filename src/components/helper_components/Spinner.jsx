import React from "react";
import { Spinner as BootstrapSpinner } from "react-bootstrap";

const Spinner = () => (
  <div className="spinner-container">
    <BootstrapSpinner animation="grow" variant="warning" />
    <BootstrapSpinner animation="grow" variant="dark" />
    <BootstrapSpinner animation="grow" variant="danger" />
  </div>
);

export default Spinner;
