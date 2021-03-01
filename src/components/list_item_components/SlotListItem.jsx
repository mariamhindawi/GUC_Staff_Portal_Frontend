import React from "react";
import PropTypes from "prop-types";
import { Link, useRouteMatch } from "react-router-dom";
import DeleteButton from "../button_components/DeleteButton";
import EditButton from "../button_components/EditButton";
import { useUserContext } from "../../contexts/UserContext";

function SlotListItem(props) {
  const user = useUserContext();
  const match = useRouteMatch();

  const customData = () => {
    switch (user.role) {
      case "Course Coordinator": return (
        <>
          <td>
            <Link to={`${match.url}/update/${props.slot._id}`} tabIndex={-1}>
              <EditButton />
            </Link>
          </td>
          <td>
            <DeleteButton onClick={() => { props.toggleDeleteModal(props.slot._id); }} />
          </td>
        </>
      );
      default: return null;
    }
  };

  return (
    <tr>
      <td>{props.slot.day}</td>
      <td>{props.slot.slotNumber}</td>
      <td>{props.slot.room}</td>
      <td>{props.slot.type}</td>
      <td>{props.slot.course}</td>
      <td>{props.slot.staffMember !== "UNASSIGNED" ? props.slot.staffMember : "-"}</td>
      {customData()}
    </tr>
  );
}

SlotListItem.propTypes = {
  slot: PropTypes.shape({
    _id: PropTypes.string,
    day: PropTypes.string,
    slotNumber: PropTypes.string,
    room: PropTypes.string,
    course: PropTypes.string,
    staffMember: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  toggleDeleteModal: PropTypes.func,
};

SlotListItem.defaultProps = {
  toggleDeleteModal: () => {},

};

export default SlotListItem;
