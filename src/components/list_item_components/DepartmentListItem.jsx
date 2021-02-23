import React from "react";
import PropTypes from "prop-types";
import { Link, useRouteMatch } from "react-router-dom";
import DeleteButton from "../button_components/DeleteButton";
import EditButton from "../button_components/EditButton";
import { useUserContext } from "../../contexts/UserContext";

function DepartmentListItem(props) {
  const user = useUserContext();
  const match = useRouteMatch();

  const customData = () => {
    switch (user.role) {
      case "HR":
        return (
          <>
            <td>
              <Link to={`${match.url}/update/${props.department._id}`} tabIndex={-1}>
                <EditButton />
              </Link>
            </td>
            <td>
              <DeleteButton onClick={() => { props.toggleDeleteModal(props.department.name); }} />
            </td>
          </>
        );
      default: return null;
    }
  };

  return (
    <tr>
      <td>{props.department.name}</td>
      <td>{props.department.faculty !== "UNASSIGNED" ? props.department.faculty : "-"}</td>
      <td>{props.department.headOfDepartment !== "UNASSIGNED" ? props.department.headOfDepartment : "-"}</td>
      {customData()}
    </tr>
  );
}

DepartmentListItem.propTypes = {
  department: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    faculty: PropTypes.string,
    headOfDepartment: PropTypes.string,
  }).isRequired,
  toggleDeleteModal: PropTypes.func.isRequired,
};

export default DepartmentListItem;
