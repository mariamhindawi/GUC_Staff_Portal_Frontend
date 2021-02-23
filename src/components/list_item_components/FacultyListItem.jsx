import React from "react";
import PropTypes from "prop-types";
import { Link, useRouteMatch } from "react-router-dom";
import DeleteButton from "../button_components/DeleteButton";
import EditButton from "../button_components/EditButton";
import { useUserContext } from "../../contexts/UserContext";

function FacultyListItem(props) {
  const user = useUserContext();
  const match = useRouteMatch();

  const customData = () => {
    switch (user.role) {
      case "HR":
        return (
          <>
            <td>
              <Link to={`${match.url}/update/${props.faculty._id}`} tabIndex={-1}>
                <EditButton />
              </Link>
            </td>
            <td>
              <DeleteButton onClick={() => { props.toggleDeleteModal(props.faculty.name); }} />
            </td>
          </>
        );
      default: return null;
    }
  };

  return (
    <tr>
      <td>{props.faculty.name}</td>
      {customData()}
    </tr>
  );
}

FacultyListItem.propTypes = {
  faculty: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  toggleDeleteModal: PropTypes.func.isRequired,
};

export default FacultyListItem;
