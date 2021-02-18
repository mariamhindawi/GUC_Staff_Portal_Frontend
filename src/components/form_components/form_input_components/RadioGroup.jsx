import React from "react";
import PropTypes from "prop-types";
import { useFormikContext } from "formik";

function RadioGroup(props) {
  const formikProps = useFormikContext();

  return (
    <>
      {props.label && <label>{props.label}</label>}
      <div className={`radio-group ${props.className}`}>
        {props.children}
      </div>
      <span className="error-message">{formikProps.touched[props.name] && formikProps.errors[props.name]}</span>
    </>
  );
}

RadioGroup.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
};

RadioGroup.defaultProps = {
  label: null,
  className: "",
};

export default RadioGroup;
