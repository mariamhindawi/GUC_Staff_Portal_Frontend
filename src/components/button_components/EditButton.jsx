import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function EditButton(props) {
  return (
    <Button className="edit-button" variant="outline-primary" onClick={props.onClick}>
      <FontAwesomeIcon icon="edit" color="#3099f5" />
    </Button>
  );
}

EditButton.propTypes = {
  onClick: PropTypes.func,
};

EditButton.defaultProps = {
  onClick: () => {},
};

export default EditButton;
