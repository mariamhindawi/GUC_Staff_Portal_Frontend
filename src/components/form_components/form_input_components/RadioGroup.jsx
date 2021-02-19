import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useFormikContext } from "formik";

function RadioGroup(props) {
  const isInitialMount = useRef(true);
  const formikProps = useFormikContext();

  const setTouched = () => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    }
    else {
      formikProps.setFieldTouched(props.name, true);
    }
  };
  useEffect(setTouched, [formikProps.values[props.name]]);

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
