import React from "react";
import PropTypes from "prop-types";
import { Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function FormButton(props) {
  return (
    <Button
      type="submit"
      disabled={props.isSubmiting}
      onClick={props.onClick}
    >
      {props.children}
      {props.isSubmiting
        ? <Spinner className="ml-2" variant="light" animation="border" size="sm" as="span" />
        : <FontAwesomeIcon className="ml-2" icon="save" />}
    </Button>
  );
}

FormButton.propTypes = {
  children: PropTypes.node.isRequired,
  isSubmiting: PropTypes.bool,
  onClick: PropTypes.func,
};

FormButton.defaultProps = {
  isSubmiting: false,
  onClick: () => {},
};

export default FormButton;
