import React from "react";
import PropTypes from "prop-types";
import { Link, useRouteMatch } from "react-router-dom";
import DeleteButton from "../button_components/DeleteButton";
import EditButton from "../button_components/EditButton";
import { useUserContext } from "../../contexts/UserContext";

function RoomListItem(props) {
  const user = useUserContext();
  const match = useRouteMatch();

  const customData = () => {
    switch (user.role) {
      case "HR": return (
        <>
          <td>
            <Link to={`${match.url}/update/${props.room._id}`} tabIndex={-1}>
              <EditButton />
            </Link>
          </td>
          <td>
            <DeleteButton onClick={() => { props.toggleDeleteModal(props.room.name); }} />
          </td>
        </>
      );
      default: return null;
    }
  };

  return (
    <tr>
      <td>{props.room.name}</td>
      <td>{props.room.type}</td>
      <td>{props.room.capacity}</td>
      <td>{props.room.remainingCapacity}</td>
      {customData()}
    </tr>
  );
}

RoomListItem.propTypes = {
  room: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    capacity: PropTypes.number,
    remainingCapacity: PropTypes.number,
  }).isRequired,
  toggleDeleteModal: PropTypes.func,
};

RoomListItem.defaultProps = {
  toggleDeleteModal: () => {},
};

export default RoomListItem;
