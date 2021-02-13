import React from "react";
import PropTypes from "prop-types";
import { Link, useRouteMatch } from "react-router-dom";
import DeleteButton from "../button_components/DeleteButton";
import UpdateButton from "../button_components/UpdateButton";
import { useUserContext } from "../../contexts/UserContext";

function HrListItem(props) {
  const user = useUserContext();
  const match = useRouteMatch();

  const customData = () => {
    switch (user.role) {
      case "HR":
        return (
          <>
            <td>{props.hrMember.salary}</td>
            <td>{props.hrMember.annualLeaveBalance}</td>
            <td>{props.hrMember.accidentalLeaveBalance}</td>
            <td>
              <Link to={`${match.url}/update/${props.hrMember.id}`} tabIndex={-1}>
                <UpdateButton />
              </Link>
            </td>
            <td>
              <DeleteButton onClick={() => { props.toggleDeleteModal(props.hrMember.id); }} />
            </td>
          </>
        );
      default: return null;
    }
  };

  return (
    <tr>
      <td>{props.hrMember.id}</td>
      <td>{props.hrMember.name}</td>
      <td>{props.hrMember.email}</td>
      <td>{props.hrMember.gender}</td>
      <td>{props.hrMember.office}</td>
      {customData()}
    </tr>
  );
}

HrListItem.propTypes = {
  hrMember: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    gender: PropTypes.string,
    salary: PropTypes.number,
    office: PropTypes.string,
    annualLeaveBalance: PropTypes.number,
    accidentalLeaveBalance: PropTypes.number,
  }).isRequired,
  toggleDeleteModal: PropTypes.func.isRequired,
};

export default HrListItem;
