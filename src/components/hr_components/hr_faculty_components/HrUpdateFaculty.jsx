import React from "react";
import PropTypes from "prop-types";
import { useRouteMatch } from "react-router-dom";
import { getItem, removeFromPath } from "../../../others/Helpers";
import GoBackModal from "../../helper_components/GoBackModal";
import FacultyForm from "../../form_components/FacultyForm";

function HrUpdateFaculty(props) {
  const match = useRouteMatch();
  const faculty = getItem(props.faculties, "_id", match.params._id);

  if (!faculty) {
    return <GoBackModal message="Incorrect Faculty ID" link={removeFromPath(match.path, 2)} />;
  }
  return (
    <FacultyForm formType="update" faculty={faculty} updateFaculties={props.updateFaculties} />
  );
}

HrUpdateFaculty.propTypes = {
  faculties: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,
  updateFaculties: PropTypes.func.isRequired,
};

export default HrUpdateFaculty;
