import React from "react";
import PropTypes from "prop-types";
import { Alert, Button, Modal, Spinner } from "react-bootstrap";
import CloseButton from "../button_components/CloseButton";

function UnassignModal(props) {
  if (props.state === "submitting") {
    return (
      <Modal show={props.isOpen} backdrop="static" onHide={props.toggle} onExited={props.reset} restoreFocus={false}>
        <Modal.Body>
          <Alert className="mt-4 mb-4 text-center" variant="info">
            Submitting...&nbsp;&nbsp;
            <Spinner as="span" animation="border" variant="info" size="sm" />
          </Alert>
        </Modal.Body>
      </Modal>
    );
  }
  if (props.state === "submitted") {
    return (
      <Modal show={props.isOpen} onHide={props.toggle} onExited={props.reset} restoreFocus={false}>
        <span><CloseButton onClick={() => { props.toggle(); }} /></span>
        <Modal.Body>
          <Alert className="text-center" variant={props.message.messageStyle}>
            {props.message.messageText}
          </Alert>
        </Modal.Body>
      </Modal>
    );
  }
  return (
    <Modal show={props.isOpen} onHide={props.toggle} onExited={props.reset} restoreFocus={false}>
      <Modal.Header className="delete-modal-header">
        <Alert className="align-center-vertical text-center" variant="danger">
          {props.unassignBodyText}
        </Alert>
      </Modal.Header>
      <div className="delete-modal-body">
        <Button className="delete-modal-button" variant="danger" onClick={() => { props.unassignItem(props.itemToUnassign); }}>
          Yes
        </Button>
        <Button className="delete-modal-button" variant="secondary" onClick={() => { props.toggle(); }}>
          No
        </Button>
      </div>
    </Modal>
  );
}

UnassignModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  state: PropTypes.oneOf(["will submit", "submitting", "submitted"]).isRequired,
  message: PropTypes.shape({
    messageText: PropTypes.string.isRequired,
    messageStyle: PropTypes.string.isRequired,
  }).isRequired,
  unassignBodyText: PropTypes.string.isRequired,
  itemToUnassign: PropTypes.shape({
    id: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
  unassignItem: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

export default UnassignModal;
