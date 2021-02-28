import React from "react";
import PropTypes from "prop-types";
import { Link, useRouteMatch } from "react-router-dom";
import DeleteButton from "../button_components/DeleteButton";
import EditButton from "../button_components/EditButton";
import UnassignButton from "../button_components/UnassignButton";
import { useUserContext } from "../../contexts/UserContext";

function AcademicListItem(props) {
  const user = useUserContext();
  const match = useRouteMatch();

  const customData = () => {
    switch (user.role) {
      case "HR": return (
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
      case "Course Instructor": return (
        <>
          {props.listType === "Personal" && props.academicsType === "Teaching Assistant"
            && (
              <td>
                <UnassignButton onClick={() => {
                  const academicRole = props.academic.role === "Teaching Assistant" || props.academic.role === "Course Coordinator" ? "Teaching Assistant" : "Course Instructor";
                  props.toggleUnassignModal(props.academic, `Are You sure you want to unassign "${props.academic.id}" from being a ${academicRole} in ${props.course}?`);
                }}
                />
              </td>
            )}
        </>
      );
      case "Head of Department": return (
        <>
          {props.listType === "Personal" && props.academicsType === "Teaching Assistant"
            && (
              <td>
                <UnassignButton onClick={() => {
                  const academicRole = props.academic.role === "Teaching Assistant" || props.academic.role === "Course Coordinator" ? "Teaching Assistant" : "Course Instructor";
                  props.toggleUnassignModal(props.academic, `Are You sure you want to unassign "${props.academic.id}" from being a ${academicRole} in ${props.course}?`);
                }}
                />
              </td>
            )}
          {(props.listType === "General" && props.academicsType === "Course Instructor" && props.course !== "")
            && (
              <td>
                <UnassignButton onClick={() => {
                  const academicRole = props.academic.role === "Teaching Assistant" || props.academic.role === "Course Coordinator" ? "Teaching Assistant" : "Course Instructor";
                  props.toggleUnassignModal(props.academic, `Are You sure you want to unassign "${props.academic.id}" from being a ${academicRole} in ${props.course}?`);
                }}
                />
              </td>
            )}
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
  academicsType: PropTypes.oneOf(["All", "Course Instructor", "Teaching Assistant"]),
  listType: PropTypes.oneOf(["General", "Personal"]),
  toggleDeleteModal: PropTypes.func,
  toggleUnassignModal: PropTypes.func,
  course: PropTypes.string,
};

AcademicListItem.defaultProps = {
  academicsType: "All",
  listType: "General",
  course: "",
  toggleDeleteModal: () => {},
  toggleUnassignModal: () => {},
};

export default AcademicListItem;
