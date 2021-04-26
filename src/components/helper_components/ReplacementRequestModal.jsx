import { React, useState } from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import * as Yup from "yup";
import { Alert, Button, Modal, Spinner } from "react-bootstrap";
import { KeyboardDatePicker } from "@material-ui/pickers";
import CloseButton from "../button_components/CloseButton";
import Input from "../form_components/form_input_components/Input";

function ReplacementRequestModal(props) {
  const [date, setDate] = useState(new Date());
  const placeholders = {
    id: "User ID",
    date: "Date",
  };
  const initialValues = {
    id: "",
    date: new Date(),
  };
  const validationSchema = Yup.object({
    id: Yup.string()
      .required("This field is required"),
    date: Yup.date()
      .required("This field is required"),
  });
  const handleSubmit = values => {
    props.sendRequest(values.id, date);
  };
  const handleDateChange = value => {
    setDate(value);
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
              {`${props.bodyText} "${props.slotToAssign}" ?`}
            </Alert>
          </Modal.Header>
          <Modal.Body className="modal-form">
            <Input label="Replacement ID" name="id" placeholder={placeholders.id} />
            <label>Date</label>
            <KeyboardDatePicker
              className="datepicker"
              placeholder={placeholders.date}
              value={date}
              onChange={handleDateChange}
              format="dd/MM/yyyy"
              variant="inline"
              minDate={Date.now()}
              PopoverProps={{ className: "datepicker-popover" }}
            />
          </Modal.Body>
          <div className="modal-confirm">
            <Button className="modal-confirm-button" variant="secondary" onClick={() => { props.toggle(); }}>
              Cancel
            </Button>
            <Button className="modal-confirm-button" variant="success" type="submit" onClick={formikProps.submitForm}>
              Send
            </Button>
          </div>
        </Modal>
      )}
    </Formik>
  );
}

ReplacementRequestModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  state: PropTypes.oneOf(["will submit", "submitting", "submitted"]).isRequired,
  bodyText: PropTypes.string.isRequired,
  message: PropTypes.shape({
    messageText: PropTypes.string.isRequired,
    messageStyle: PropTypes.string.isRequired,
  }).isRequired,
  slotToAssign: PropTypes.string.isRequired,
  sendRequest: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

export default ReplacementRequestModal;
