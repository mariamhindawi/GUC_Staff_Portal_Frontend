import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function DeleteButton(props) {
  return (
    <Button className={`delete-button ${props.className}`} variant="outline-danger" onClick={props.onClick}>
      <FontAwesomeIcon icon="minus" color="red" />
    </Button>
  );
}

DeleteButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};

DeleteButton.defaultProps = {
  className: "",
  onClick: () => {},
};

export default DeleteButton;
