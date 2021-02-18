import React from "react";
import PropTypes from "prop-types";
import { useField } from "formik";

function RadioButton(props) {
  const [field,, helpers] = useField({ name: props.name, type: "radio", value: props.value });

  const handleChange = () => {
    helpers.setValue(props.value);
    helpers.setTouched(true);
  };
  const handleFocus = () => {
    props.setMessage({ messageText: "", messageStyle: "" });
  };

  return (
    <span
      className={`radio-input ${props.className}`}
      role="radio"
      aria-checked={field.checked}
      onClick={handleChange}
      onKeyPress={handleChange}
      onFocus={handleFocus}
      tabIndex={0}
    >
      <span className="radio-button" />
      <label className="radio-label">{props.children}</label>
    </span>
  );
}

RadioButton.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
  setMessage: PropTypes.func,
};

RadioButton.defaultProps = {
  className: "",
  children: "",
  setMessage: () => {},
};

export default RadioButton;
