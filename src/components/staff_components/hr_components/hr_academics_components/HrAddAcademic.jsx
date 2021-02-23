import React from "react";
import PropTypes from "prop-types";
import AcademicMemberForm from "../../../form_components/AcademicMemberForm";

function HrAddAcademic(props) {
  return <AcademicMemberForm formType="add" updateAcademics={props.updateAcademics} />;
}

HrAddAcademic.propTypes = {
  updateAcademics: PropTypes.func.isRequired,
};

export default HrAddAcademic;
