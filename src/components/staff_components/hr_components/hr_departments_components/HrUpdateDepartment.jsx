import React from "react";
import PropTypes from "prop-types";
import { useRouteMatch } from "react-router-dom";
import { getItem, removeFromPath } from "../../../../others/Helpers";
import GoBackModal from "../../../helper_components/GoBackModal";
import DepartmentForm from "../../../form_components/DepartmentForm";

function HrUpdateDepartment(props) {
  const match = useRouteMatch();
  const department = getItem(props.departments, "_id", match.params._id);

  if (!department) {
    return <GoBackModal message="Incorrect Department ID" link={removeFromPath(match.path, 2)} />;
  }
  return (
    <DepartmentForm formType="update" department={department} updateDepartments={props.updateDepartments} />
  );
}

HrUpdateDepartment.propTypes = {
  departments: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    faculty: PropTypes.string,
    headOfDepartment: PropTypes.string,
  })).isRequired,
  updateDepartments: PropTypes.func.isRequired,
};

export default HrUpdateDepartment;
