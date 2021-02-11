import React from "react";
import PropTypes from "prop-types";
import HrMemberForm from "../../form_components/HrMemberForm";

function HrAddHrMember(props) {
  return <HrMemberForm formType="add" updateHrMembers={props.updateHrMembers} />;
}

HrAddHrMember.propTypes = {
  updateHrMembers: PropTypes.func.isRequired,
};

export default HrAddHrMember;
