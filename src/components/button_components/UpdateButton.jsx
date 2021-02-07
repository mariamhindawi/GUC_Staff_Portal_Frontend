import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function UpdateButton(props) {
  return (
    <Button className="edit-button" variant="outline-primary" onClick={props.onClick}>
      <FontAwesomeIcon icon="edit" color="#3099f5" />
    </Button>
  );
}

UpdateButton.propTypes = {
  onClick: PropTypes.func,
};

UpdateButton.defaultProps = {
  onClick: () => {},
};

export default UpdateButton;
