import React from "react";
import PropTypes from "prop-types";
import { useRouteMatch } from "react-router-dom";
import { getItem, removeFromPath } from "../../../../others/Helpers";
import GoBackModal from "../../../helper_components/GoBackModal";
import SlotForm from "../../../form_components/SlotForm";

function CcUpdateSlot(props) {
  const match = useRouteMatch();
  const slot = getItem(props.slots, "_id", match.params._id);

  if (!slot) {
    return <GoBackModal message="Incorrect Slot" link={removeFromPath(match.path, 2)} />;
  }
  return (
    <SlotForm formType="update" slot={slot} courses={props.courses} updateSlots={props.updateSlots} />
  );
}

CcUpdateSlot.propTypes = {
  slots: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    day: PropTypes.string,
    slotNumber: PropTypes.string,
    room: PropTypes.string,
    course: PropTypes.string,
    staffMember: PropTypes.string,
    type: PropTypes.string,
  })).isRequired,
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

export default CcUpdateSlot;
