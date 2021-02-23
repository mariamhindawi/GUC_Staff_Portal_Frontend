import React from "react";
import PropTypes from "prop-types";
import { Link, useRouteMatch } from "react-router-dom";
import DeleteButton from "../button_components/DeleteButton";
import EditButton from "../button_components/EditButton";
import { useUserContext } from "../../contexts/UserContext";

function AcademicListItem(props) {
  const user = useUserContext();
  const match = useRouteMatch();

  const customData = () => {
    switch (user.role) {
      case "HR":
        return (
          <>
            <td>{props.academic.salary}</td>
            <td>{props.academic.annualLeaveBalance}</td>
            <td>{props.academic.accidentalLeaveBalance}</td>
            <td>
              <Link to={`${match.url}/update/${props.academic.id}`} tabIndex={-1}>
                <EditButton />
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
      <td>{props.academic.email}</td>
      <td>{props.academic.gender}</td>
      <td>{props.academic.department !== "UNASSIGNED" ? props.academic.department : "-"}</td>
      <td>{props.academic.role}</td>
      <td>{props.academic.office}</td>
      <td>{props.academic.dayOff}</td>
      {customData()}
    </tr>
  );
}

AcademicListItem.propTypes = {
  academic: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    gender: PropTypes.string,
    salary: PropTypes.number,
    role: PropTypes.string,
    department: PropTypes.string,
    dayOff: PropTypes.string,
    office: PropTypes.string,
    annualLeaveBalance: PropTypes.number,
    accidentalLeaveBalance: PropTypes.number,
  }).isRequired,
  toggleDeleteModal: PropTypes.func.isRequired,
};

export default AcademicListItem;
