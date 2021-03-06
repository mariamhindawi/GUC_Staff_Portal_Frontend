import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AssignButton(props) {
  return (
    <Button className={`assign-button ${props.className}`} variant="outline-success" onClick={props.onClick}>
      <FontAwesomeIcon icon="plus" color="green" />
    </Button>
  );
}

AssignButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};

AssignButton.defaultProps = {
  className: "",
  onClick: () => {},
};

export default AssignButton;
