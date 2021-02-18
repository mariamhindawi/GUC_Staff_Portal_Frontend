import React from "react";
import PropTypes from "prop-types";
import { useFormikContext } from "formik";
import FormButton from "../../button_components/FormButton";

function FormSubmit(props) {
  const formikProps = useFormikContext();

  return (
    <div className="form-submit">
      <span className={props.message.messageStyle}>{props.message.messageText}</span>
      <FormButton
        isSubmiting={formikProps.isSubmitting}
        onClick={() => { props.setMessage({ messageText: "", messageStyle: "" }); }}
      >
        {props.formType === "add" && (formikProps.isSubmitting ? "Saving" : "Save")}
        {props.formType === "update" && (formikProps.isSubmitting ? "Saving changes" : "Save changes")}
      </FormButton>
    </div>
  );
}

FormSubmit.propTypes = {
  formType: PropTypes.oneOf(["add", "update"]).isRequired,
  message: PropTypes.shape({
    messageText: PropTypes.string,
    messageStyle: PropTypes.string,
  }).isRequired,
  setMessage: PropTypes.func.isRequired,
};

export default FormSubmit;
