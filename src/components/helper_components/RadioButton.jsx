import { useFormikContext } from "formik";
import PropTypes from "prop-types";
import React from "react";

function RadioButton(props) {
  const formikProps = useFormikContext();

  return (
    <span
      className={`radio-input ${props.className}`}
      role="radio"
      aria-checked={formikProps.values[props.name] === props.value}
      onClick={() => { formikProps.setFieldValue(props.name, props.value); }}
      onKeyPress={() => { formikProps.setFieldValue(props.name, props.value); }}
      onFocus={props.onFocus}
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
  onFocus: PropTypes.func,
};

RadioButton.defaultProps = {
  className: "",
  children: "",
  onFocus: () => {},
};

export default RadioButton;
