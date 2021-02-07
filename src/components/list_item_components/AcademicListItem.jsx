import React from "react";
import PropTypes from "prop-types";
import { Link, useRouteMatch } from "react-router-dom";
import DeleteButton from "../button_components/DeleteButton";
import UpdateButton from "../button_components/UpdateButton";
import { useUserContext } from "../../contexts/UserContext";

const AcademicListItem = props => {
  const user = useUserContext();
  const match = useRouteMatch();

  const customButtons = () => {
    switch (user.role) {
      case "HR":
        return (
          <>
            <td>
              <Link to={`${match.url}/update/${props.academic.id}`} tabIndex={-1}>
                <UpdateButton />
              </Link>
            </td>
            <td>
              <DeleteButton onClick={() => { props.toggleDeleteModal(props.academic.id); }} />
            </td>
          </>
        );
      default: return null;
    }
  };

  return (
    <tr>
      <td>{props.academic.id}</td>
      <td>{props.academic.name}</td>
      <td>{props.academic.department !== "UNASSIGNED" ? props.academic.department : "-"}</td>
      <td>{props.academic.office}</td>
      <td>{props.academic.dayOff}</td>
      <td>{props.academic.email}</td>
      {customButtons()}
    </tr>
  );
};

AcademicListItem.propTypes = {
  academic: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    gender: PropTypes.string,
    salary: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    role: PropTypes.string,
    department: PropTypes.string,
    dayOff: PropTypes.string,
    office: PropTypes.string,
  }).isRequired,
  toggleDeleteModal: PropTypes.func,
};

AcademicListItem.defaultProps = {
  toggleDeleteModal: () => {},
};

export default AcademicListItem;
