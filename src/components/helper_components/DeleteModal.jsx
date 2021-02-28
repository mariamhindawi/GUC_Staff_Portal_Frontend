import React from "react";
import PropTypes from "prop-types";
import { Alert, Button, Modal, Spinner } from "react-bootstrap";
import CloseButton from "../button_components/CloseButton";

function DeleteModal(props) {
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
      <Modal.Header className="modal-header">
        <Alert className="align-center-vertical" variant="danger">
          {`Are you sure you want to delete "${props.itemToDelete}" ?`}
        </Alert>
      </Modal.Header>
      <div className="modal-confirm">
        <Button className="modal-confirm-button" variant="danger" onClick={() => { props.deleteItem(props.itemToDelete); }}>
          Yes
        </Button>
        <Button className="modal-confirm-button" variant="secondary" onClick={() => { props.toggle(); }}>
          No
        </Button>
      </div>
    </Modal>
  );
}

DeleteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  state: PropTypes.oneOf(["will submit", "submitting", "submitted"]).isRequired,
  message: PropTypes.shape({
    messageText: PropTypes.string.isRequired,
    messageStyle: PropTypes.string.isRequired,
  }).isRequired,
  itemToDelete: PropTypes.string.isRequired,
  deleteItem: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

export default DeleteModal;
