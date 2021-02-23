import React from "react";
import PropTypes from "prop-types";
import FacultyForm from "../../../form_components/FacultyForm";

function HrAddFaculty(props) {
  return <FacultyForm formType="add" updateFaculties={props.updateFaculties} />;
}

HrAddFaculty.propTypes = {
  updateFaculties: PropTypes.func.isRequired,
};

export default HrAddFaculty;
