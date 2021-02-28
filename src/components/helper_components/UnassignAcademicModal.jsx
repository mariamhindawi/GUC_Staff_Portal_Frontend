import React from "react";
import PropTypes from "prop-types";
import { Alert, Button, Modal, Spinner } from "react-bootstrap";
import CloseButton from "../button_components/CloseButton";

function UnassignAcademicModal(props) {
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
        <Alert className="align-center-vertical text-center" variant="danger">
          {props.bodyText}
        </Alert>
      </Modal.Header>
      <div className="modal-confirm">
        <Button className="modal-confirm-button" variant="danger" onClick={() => { props.unassignAcademic(props.academicToUnassign, props.courseToUnassignFrom); }}>
          Yes
        </Button>
        <Button className="modal-confirm-button" variant="secondary" onClick={() => { props.toggle(); }}>
          No
        </Button>
      </div>
    </Modal>
  );
}

UnassignAcademicModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  state: PropTypes.oneOf(["will submit", "submitting", "submitted"]).isRequired,
  bodyText: PropTypes.string.isRequired,
  message: PropTypes.shape({
    messageText: PropTypes.string.isRequired,
    messageStyle: PropTypes.string.isRequired,
  }).isRequired,
  academicToUnassign: PropTypes.shape({
    id: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
  courseToUnassignFrom: PropTypes.shape({
    id: PropTypes.string,
  }),
  unassignAcademic: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

UnassignAcademicModal.defaultProps = {
  courseToUnassignFrom: { id: "" },
};

export default UnassignAcademicModal;
