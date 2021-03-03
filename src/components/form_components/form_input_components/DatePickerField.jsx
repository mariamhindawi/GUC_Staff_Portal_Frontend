import React from "react";
import PropTypes from "prop-types";
import { useField } from "formik";
import { KeyboardDatePicker } from "@material-ui/pickers";

function DatePickerField(props) {
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
      <KeyboardDatePicker
        className="datepicker"
        id={props.name}
        name={props.name}
        placeholder={props.placeholder}
        value={field.value}
        onChange={value => {
          helpers.setValue(value);
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        format="dd/MM/yyyy"
        variant={props.variant}
        maxDate={props.maxDate}
        minDate={props.minDate}
        PopoverProps={{ className: "datepicker-popover" }}
      />
      <span className="error-message">{meta.touched && meta.error}</span>
    </>
  );
}

DatePickerField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  setMessage: PropTypes.func,
  variant: PropTypes.oneOf(["dialog", "inline", "static"]),
  maxDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
};

DatePickerField.defaultProps = {
  placeholder: "",
  label: null,
  setMessage: () => {},
  variant: "dialog",
  maxDate: new Date(2100, 1, 1),
  minDate: new Date(1900, 1, 1),
};

export default DatePickerField;
