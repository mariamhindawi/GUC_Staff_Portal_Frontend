import React from "react";
import PropTypes from "prop-types";
import AddSlotForm from "../../form_components/SlotForm";

function CcAddSlot(props) {
  return <AddSlotForm formType="add" updateSlots={props.updateSlots} courses={props.courses} />;
}

CcAddSlot.propTypes = {
  updateSlots: PropTypes.func.isRequired,
  courses: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    department: PropTypes.string,
    courseInstructors: PropTypes.arrayOf(PropTypes.string),
    teachingAssistants: PropTypes.arrayOf(PropTypes.string),
    courseCoordinator: PropTypes.string,
  })).isRequired,
};

export default CcAddSlot;
