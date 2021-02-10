import React from "react";
import PropTypes from "prop-types";
import { Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function FormButton(props) {
  return (
    <Button
      variant="info"
      type="submit"
      onClick={props.onClick}
      disabled={props.isSubmiting}
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
  onClick: PropTypes.func.isRequired,
};

FormButton.defaultProps = {
  isSubmiting: false,
};

export default FormButton;
