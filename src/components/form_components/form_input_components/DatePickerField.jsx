import React from "react";
import PropTypes from "prop-types";
import { useField } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DatePickerField(props) {
  const [field, meta, helpers] = useField(props.name);

  const handleFocus = () => {
    props.setMessage({ messageText: "", messageStyle: "" });
  };

  return (
    <>
      {props.label && <label htmlFor={props.name}>{props.label}</label>}
      <DatePicker
        id={props.name}
        name={props.name}
        placeholder={props.placeholder}
        value={field.value}
        // onChange={field.onChange}
        onChange={val => {
          helpers.setValue(val);
        }}
        onFocus={handleFocus}
        onBlur={field.onBlur}
        dateFormat="yyyy-MM-dd"
        selected={(field.value && new Date(field.value)) || null}
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
};

DatePickerField.defaultProps = {
  placeholder: "",
  label: null,
  setMessage: () => {},
};

export default DatePickerField;
