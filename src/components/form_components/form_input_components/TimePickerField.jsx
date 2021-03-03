import React from "react";
import PropTypes from "prop-types";
import { useField } from "formik";
import { KeyboardTimePicker } from "@material-ui/pickers";

function TimePickerField(props) {
  const [field, meta, helpers] = useField(props.name);

  const handleFocus = e => {
    e.target.placeholder = "";
    props.setMessage({ messageText: "", messageStyle: "" });
  };
  const handleBlur = e => {
    e.target.placeholder = props.placeholder;
    helpers.setTouched(true);
  };

  return (
    <>
      {props.label && <label htmlFor={props.name}>{props.label}</label>}
      <KeyboardTimePicker
        className="timepicker"
        id={props.name}
        name={props.name}
        value={field.value}
        onChange={value => {
          helpers.setValue(value);
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        variant={props.variant}
      />
      <span className="error-message">{meta.touched && meta.error}</span>
    </>
  );
}

TimePickerField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  setMessage: PropTypes.func,
  variant: PropTypes.oneOf(["dialog", "inline", "static"]),
};

TimePickerField.defaultProps = {
  placeholder: "",
  label: null,
  setMessage: () => {},
  variant: "dialog",
};

export default TimePickerField;
