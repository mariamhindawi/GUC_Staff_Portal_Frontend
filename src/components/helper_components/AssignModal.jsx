import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Alert, Button, Modal, Spinner, DropdownButton, Dropdown
} from "react-bootstrap";
import CloseButton from "../button_components/CloseButton";

function AssignModal(props) {
  const [enteredValue, setEnteredValue] = useState("");
  const [role, setRole] = useState("Choose Role");

  const handleChange = e => {
    setEnteredValue(e.target.value);
  };
  const customData = () => {
    if (props.academicRole === "teaching-assistant") {
      return (
        <div className="d-flex">
          <span>Teaching Assistant</span>
          <input
            type="text"
            value={enteredValue}
            placeholder="User ID"
            onChange={handleChange}
          />
        </div>
      );
    }
    if (props.academicRole === "course-instructor") {
      return (
        <div className="d-flex">
          <span>Teaching Assistant</span>
          <input
            type="text"
            value={enteredValue}
            placeholder="User ID"
            onChange={handleChange}
          />
        </div>
      );
    }

    return (
      <div className="d-flex">
        <DropdownButton bsPrefix="view-dropdown-button attendance-dropdown-button" title={role}>
          <Dropdown.Item
            onClick={() => { setRole("course-instructor"); }}
            key="Course Instructor"
          >
            Course Instructor
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => { setRole("teaching-assistant"); }}
            key="Teaching Assistant"
          >
            Teaching Assistant
          </Dropdown.Item>
        </DropdownButton>
        <input
          type="text"
          value={enteredValue}
          placeholder="User ID"
          onChange={handleChange}
        />
      </div>
    );
  };

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
        <div className="d-flex flex-column">
          <Alert className="align-center-vertical" variant="success">
            {props.assignBodyText}
          </Alert>
          {customData()}
        </div>

      </Modal.Header>
      <div className="delete-modal-body">
        <Button className="delete-modal-button" variant="secondary" onClick={() => { props.toggle(); }}>
          Cancel
        </Button>
        <Button className="delete-modal-button" variant="success" onClick={() => { props.assignItem(enteredValue, props.itemToAssign, role); }}>
          Assign
        </Button>
      </div>
    </Modal>
  );
}

AssignModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  state: PropTypes.oneOf(["will submit", "submitting", "submitted"]).isRequired,
  message: PropTypes.shape({
    messageText: PropTypes.string.isRequired,
    messageStyle: PropTypes.string.isRequired,
  }).isRequired,
  assignBodyText: PropTypes.string.isRequired,
  itemToAssign: PropTypes.string.isRequired,
  assignItem: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  academicRole: PropTypes.string,
};

AssignModal.defaultProps = {
  academicRole: "",
};
export default AssignModal;
