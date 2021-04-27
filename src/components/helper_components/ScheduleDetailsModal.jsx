import React from "react";
import PropTypes from "prop-types";
import { Alert, Button, Modal, Spinner } from "react-bootstrap";
import CloseButton from "../button_components/CloseButton";
import { useUserContext } from "../../contexts/UserContext";

function ScheduleDetailsModal(props) {
  const user = useUserContext();

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
          Slot:
          {" "}
          {props.activeSlot}
        </Alert>
      </Modal.Header>
      <Modal.Body className="modal-form">
        {props.slots.filter(slot => slot._id === props.activeSlot).map(slot => (
          <ul key="slot._id" className="unstyled">
            <li key="k1">
              Slot:
              {" "}
              {slot.slotNumber}
            </li>
            <li key="k2">
              Day:
              {" "}
              {slot.day}
            </li>
            <li key="k3">
              Course:
              {" "}
              {slot.course}
            </li>
            <li key="k4">
              Room:
              {" "}
              {slot.room}
            </li>
            {user.id !== slot.staffMember ? (
              <li key="k5">
                Academic Member:
                {" "}
                {slot.staffMember}
              </li>
            ) : null}
          </ul>
        ))}
      </Modal.Body>
      {props.unassign === "schedule" ? null : (
        <div className="modal-confirm">
          <Button className="modal-confirm-button" variant="danger" onClick={() => { props.unassignAcademic(); }}>
            Unassign
          </Button>
          <Button className="modal-confirm-button" variant="secondary" onClick={() => { props.toggle(); }}>
            Cancel
          </Button>
        </div>
      )}
    </Modal>
  );
}

ScheduleDetailsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  state: PropTypes.oneOf(["will submit", "submitting", "submitted"]).isRequired,
  message: PropTypes.shape({
    messageText: PropTypes.string,
    messageStyle: PropTypes.string,
  }),
  toggle: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  unassignAcademic: PropTypes.func,
  slots: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    day: PropTypes.string,
    slotNumber: PropTypes.string,
    room: PropTypes.string,
    course: PropTypes.string,
    staffMember: PropTypes.string,
    type: PropTypes.string,
  })).isRequired,
  activeSlot: PropTypes.string.isRequired,
  unassign: PropTypes.string.isRequired,

};
ScheduleDetailsModal.defaultProps = {
  unassignAcademic: () => {},
  message: PropTypes.shape({
  }),
};

export default ScheduleDetailsModal;
