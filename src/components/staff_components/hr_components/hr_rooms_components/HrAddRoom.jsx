import React from "react";
import PropTypes from "prop-types";
import RoomForm from "../../../form_components/RoomForm";

function HrAddRoom(props) {
  return <RoomForm formType="add" updateRooms={props.updateRooms} />;
}

HrAddRoom.propTypes = {
  updateRooms: PropTypes.func.isRequired,
};

export default HrAddRoom;
