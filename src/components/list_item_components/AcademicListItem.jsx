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
            <td>{props.academic.dayOff}</td>
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
      case "Course Instructor":
        if (props.academic.role === "Teaching Assistant") {
          if (props.course !== "All Courses" && props.myCourses.includes(props.course)) {
            return (
              <td>
                <DeleteButton onClick={() => { props.toggleDeleteModal(props.academic.id); }} />
              </td>
            );
          }

          return null;
        }
        return <td> </td>;
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
  myCourses: PropTypes.arrayOf(String),
  toggleDeleteModal: PropTypes.func.isRequired,
  course: PropTypes.string,
};
AcademicListItem.defaultProps = {
  course: "",
  myCourses: [],
};

export default AcademicListItem;
