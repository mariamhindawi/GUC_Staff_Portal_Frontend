import React from "react";
import PropTypes from "prop-types";
import { useField } from "formik";

function Select(props) {
  const [field, meta] = useField(props.name);

  const handleFocus = () => {
    props.setMessage({ messageText: "", messageStyle: "" });
  };

  return (
    <>
      {props.label && <label htmlFor={props.name}>{props.label}</label>}
      <select
        className={field.value === "" ? "disabled-selected" : ""}
        id={props.name}
        name={props.name}
        value={field.value}
        onChange={field.onChange}
        onFocus={handleFocus}
        onBlur={field.onBlur}
      >
        {props.children}
      </select>
      <span className="error-message">{meta.touched && meta.error}</span>
    </>
  );
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  label: PropTypes.string,
  setMessage: PropTypes.func,
};

Select.defaultProps = {
  label: null,
  setMessage: () => {},
};

export default Select;
