import React from "react";
import PropTypes from "prop-types";
import { useField } from "formik";

function Input(props) {
  const [field, meta, helpers] = useField({ name: props.name, type: props.type });

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
      <input
        type={props.type}
        id={props.name}
        name={props.name}
        placeholder={props.placeholder}
        value={field.value}
        onChange={field.onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <span className="error-message">{meta.touched && meta.error}</span>
    </>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  setMessage: PropTypes.func,
};

Input.defaultProps = {
  type: "text",
  placeholder: "",
  label: null,
  setMessage: () => {},
};

export default Input;
