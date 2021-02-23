import React from "react";
import PropTypes from "prop-types";
import { useRouteMatch } from "react-router-dom";
import { getItem, removeFromPath } from "../../../../others/Helpers";
import GoBackModal from "../../../helper_components/GoBackModal";
import RoomForm from "../../../form_components/RoomForm";

function HrUpdateRoom(props) {
  const match = useRouteMatch();
  const room = getItem(props.rooms, "_id", match.params._id);

  if (!room) {
    return <GoBackModal message="Incorrect Room ID" link={removeFromPath(match.path, 2)} />;
  }
  return (
    <RoomForm formType="update" room={room} updateRooms={props.updateRooms} />
  );
}

HrUpdateRoom.propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    capacity: PropTypes.number,
    remainingCapacity: PropTypes.number,
  })).isRequired,
  updateRooms: PropTypes.func.isRequired,
};

export default HrUpdateRoom;
