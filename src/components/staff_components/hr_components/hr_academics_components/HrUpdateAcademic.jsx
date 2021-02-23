import React from "react";
import PropTypes from "prop-types";
import { useRouteMatch } from "react-router-dom";
import { getItem, removeFromPath } from "../../../../others/Helpers";
import GoBackModal from "../../../helper_components/GoBackModal";
import AcademicMemberForm from "../../../form_components/AcademicMemberForm";

function HrUpdateAcademic(props) {
  const match = useRouteMatch();
  const academic = getItem(props.academics, "id", match.params.id);

  if (!academic) {
    return <GoBackModal message="Incorrect Acadeimc Member ID" link={removeFromPath(match.path, 2)} />;
  }
  return (
    <AcademicMemberForm formType="update" academic={academic} updateAcademics={props.updateAcademics} />
  );
}

HrUpdateAcademic.propTypes = {
  academics: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    gender: PropTypes.string,
    salary: PropTypes.number,
    role: PropTypes.string,
    department: PropTypes.string,
    dayOff: PropTypes.string,
    office: PropTypes.string,
    annualLeaveBalance: PropTypes.number,
    accidentalLeaveBalance: PropTypes.number,
  })).isRequired,
  updateAcademics: PropTypes.func.isRequired,
};

export default HrUpdateAcademic;
