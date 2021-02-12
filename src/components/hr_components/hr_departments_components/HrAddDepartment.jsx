import React from "react";
import PropTypes from "prop-types";
import DepartmentForm from "../../form_components/DepartmentForm";

function HrAddDepartment(props) {
  return <DepartmentForm formType="add" updateDepartments={props.updateDepartments} />;
}

HrAddDepartment.propTypes = {
  updateDepartments: PropTypes.func.isRequired,
};

export default HrAddDepartment;
