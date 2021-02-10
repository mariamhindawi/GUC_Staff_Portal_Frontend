import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AddButton(props) {
  return (
    <Button variant="success" onClick={props.onClick}>
      {props.children}
      <FontAwesomeIcon className="ml-2" icon="plus" />
    </Button>
  );
}

AddButton.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
};

AddButton.defaultProps = {
  children: "Add",
  onClick: () => {},
};

export default AddButton;
