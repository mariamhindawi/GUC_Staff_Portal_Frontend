import React from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import * as Yup from "yup";
import { Alert, Button, Modal, Spinner } from "react-bootstrap";
import CloseButton from "../button_components/CloseButton";
import Input from "../form_components/form_input_components/Input";

function AssignAcademicModal(props) {
  const placeholders = {
    id: "User ID",
  };
  const initialValues = {
    id: "",
  };
  const validationSchema = Yup.object({
    id: Yup.string()
      .required("This field is required"),
  });
  const handleSubmit = values => {
    props.assignAcademic(values.id, props.academicRole, props.courseToAssign);
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
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {formikProps => (
        <Modal
          show={props.isOpen}
          onHide={props.toggle}
          onExited={() => {
            props.reset();
            formikProps.resetForm();
          }}
          restoreFocus={false}
        >
          <Modal.Header className="modal-header">
            <Alert className="align-center-vertical" variant="success">
              {props.bodyText}
            </Alert>
          </Modal.Header>
          <Modal.Body className="modal-form">
            <Input label={`${props.academicRole}:`} name="id" placeholder={placeholders.id} />
          </Modal.Body>
          <div className="modal-confirm">
            <Button className="modal-confirm-button" variant="secondary" onClick={() => { props.toggle(); }}>
              Cancel
            </Button>
            <Button className="modal-confirm-button" variant="success" type="submit" onClick={formikProps.submitForm}>
              Assign
            </Button>
          </div>
        </Modal>
      )}
    </Formik>
  );
}

AssignAcademicModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  state: PropTypes.oneOf(["will submit", "submitting", "submitted"]).isRequired,
  bodyText: PropTypes.string.isRequired,
  message: PropTypes.shape({
    messageText: PropTypes.string.isRequired,
    messageStyle: PropTypes.string.isRequired,
  }).isRequired,
  courseToAssign: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  academicRole: PropTypes.oneOf(["", "Teaching Assistant", "Course Coordinator", "Course Instructor", "Academic"]).isRequired,
  assignAcademic: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

export default AssignAcademicModal;
