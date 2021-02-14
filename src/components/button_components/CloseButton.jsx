import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CloseButton(props) {
  return (
    <button className="close-button" type="button" onClick={props.onClick}>
      <FontAwesomeIcon icon="times" />
    </button>
  );
}

CloseButton.propTypes = {
  onClick: PropTypes.func,
};

CloseButton.defaultProps = {
  onClick: () => {},
};

export default CloseButton;
