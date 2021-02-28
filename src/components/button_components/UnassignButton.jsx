import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function DeleteButton(props) {
  return (
    <Button className="delete-button" variant="outline-danger" onClick={props.onClick}>
      <FontAwesomeIcon icon="minus" color="red" />
    </Button>
  );
}

DeleteButton.propTypes = {
  onClick: PropTypes.func,
};

DeleteButton.defaultProps = {
  onClick: () => {},
};

export default DeleteButton;
