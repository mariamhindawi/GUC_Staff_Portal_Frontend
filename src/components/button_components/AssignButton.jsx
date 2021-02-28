import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AssgnButton(props) {
  return (
    <Button className={`assign-button ${props.className}`} variant="outline-success" onClick={props.onClick}>
      <FontAwesomeIcon icon="plus" color="green" />
    </Button>
  );
}

AssgnButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};

AssgnButton.defaultProps = {
  className: "",
  onClick: () => {},
};

export default AssgnButton;
