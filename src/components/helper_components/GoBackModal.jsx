import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Alert, Modal } from "react-bootstrap";

function GoBackModal(props) {
  return (
    <Modal backdrop="static" show>
      <Modal.Body>
        <Alert className="d-flex justify-content-between" variant="info">
          {props.message}
          <Alert.Link as={Link} to={props.link}>
            Go back
          </Alert.Link>
        </Alert>
      </Modal.Body>
    </Modal>
  );
}

GoBackModal.propTypes = {
  message: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default GoBackModal;
