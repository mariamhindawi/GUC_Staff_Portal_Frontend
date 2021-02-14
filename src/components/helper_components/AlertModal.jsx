import React from "react";
import PropTypes from "prop-types";
import { Alert, Modal } from "react-bootstrap";
import CloseButton from "../button_components/CloseButton";

function AlertModal(props) {
  return (
    <Modal
      show={props.isOpen}
      onHide={props.toggle}
      onExited={props.reset}
      restoreFocus={false}
    >
      <span><CloseButton onClick={props.toggle} /></span>
      <Modal.Body>
        <Alert className="text-center" variant={props.variant}>
          {props.children}
        </Alert>
      </Modal.Body>
    </Modal>
  );
}

AlertModal.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

AlertModal.defaultProps = {
  children: "",
};

export default AlertModal;
