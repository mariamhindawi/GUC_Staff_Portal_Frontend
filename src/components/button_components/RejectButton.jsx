import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function RejectButton(props) {
  return (
    <Button className={`delete-button ${props.className}`} variant="outline-danger" onClick={props.onClick}>
      <FontAwesomeIcon icon="times" color="red" />
    </Button>
  );
}

RejectButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};

RejectButton.defaultProps = {
  className: "",
  onClick: () => {},
};

export default RejectButton;
