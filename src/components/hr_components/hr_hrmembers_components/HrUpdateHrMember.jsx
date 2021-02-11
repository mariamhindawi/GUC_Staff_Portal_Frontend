import React from "react";
import PropTypes from "prop-types";
import { useRouteMatch } from "react-router-dom";
import { getItem, removeFromPath } from "../../../others/Helpers";
import GoBackModal from "../../helper_components/GoBackModal";
import HrMemberForm from "../../form_components/HrMemberForm";

function HrUpdateHrMember(props) {
  const match = useRouteMatch();
  const hrMember = getItem(props.hrMembers, match.params.id);

  if (!hrMember) {
    return <GoBackModal message="Incorrect HR Member ID" link={removeFromPath(match.path, 2)} />;
  }
  return (
    <HrMemberForm formType="update" hrMember={hrMember} updateHrMembers={props.updateHrMembers} />
  );
}

HrUpdateHrMember.propTypes = {
  hrMembers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    gender: PropTypes.string,
    salary: PropTypes.number,
    dayOff: PropTypes.string,
    office: PropTypes.string,
    annualLeaveBalance: PropTypes.number,
    accidentalLeaveBalance: PropTypes.number,
  })).isRequired,
  updateHrMembers: PropTypes.func.isRequired,
};

export default HrUpdateHrMember;
