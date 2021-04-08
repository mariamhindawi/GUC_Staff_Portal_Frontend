import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AcceptButton(props) {
  return (
    <Button className={`assign-button ${props.className}`} variant="outline-success" onClick={props.onClick}>
      <FontAwesomeIcon icon="check" color="green" />
    </Button>
  );
}

AcceptButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};

AcceptButton.defaultProps = {
  className: "",
  onClick: () => {},
};

export default AcceptButton;
