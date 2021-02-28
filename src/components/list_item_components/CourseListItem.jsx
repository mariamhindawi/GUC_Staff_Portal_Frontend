import React from "react";
import PropTypes from "prop-types";
import { Link, useRouteMatch } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import DeleteButton from "../button_components/DeleteButton";
import EditButton from "../button_components/EditButton";
import AssignButton from "../button_components/AssignButton";
import UnassignButton from "../button_components/UnassignButton";
import { useUserContext } from "../../contexts/UserContext";

function CourseListItem(props) {
  const user = useUserContext();
  const match = useRouteMatch();

  const courseCoordinatorField = () => {
    if (props.listType === "Personal"
      && (user.role === "Course Instructor" || user.role === "Head of Department")) {
      if (props.course.courseCoordinator === "UNASSIGNED") {
        return (
          <td>
            <div style={{ width: "120px", minWidth: "fit-content" }}>
              -
              <AssignButton
                className="float-right"
                onClick={() => {
                  props.toggleAssignModal(props.course, "Course Coordinator", `Assign Course Coordinator to "${props.course.id}"`);
                }}
              />
            </div>
          </td>
        );
      }
      return (
        <td>
          <div style={{ width: "120px", minWidth: "fit-content" }}>
            {props.course.courseCoordinator}
            <UnassignButton
              className="float-right"
              onClick={() => {
                props.toggleUnassignModal(props.course, `Are You sure you want to unassign "${props.course.courseCoordinator}" from being a Course Coordinator in "${props.course.name}"?`);
              }}
            />
          </div>
        </td>
      );
    }
    return <td>{props.course.courseCoordinator !== "UNASSIGNED" ? props.course.courseCoordinator : "-"}</td>;
  };
  const customData = () => {
    switch (user.role) {
      case "HR": return (
        <>
          <td>
            <Link to={`${match.url}/update/${props.course._id}`} tabIndex={-1}>
              <EditButton />
            </Link>
          </td>
          <td>
            <DeleteButton onClick={() => { props.toggleDeleteModal(props.course.id); }} />
          </td>
        </>
      );
      case "Course Instructor": return (
        <>
          {props.listType === "Personal" && (
            <>
              <td>
                {props.courseCoverage}
              &nbsp;%
              </td>
              <td>
                <AssignButton
                  onClick={() => {
                    props.toggleAssignModal(props.course, "Teaching Assistant", `Assign Teaching Assistant to "${props.course.id}"`);
                  }}
                />
              </td>
            </>
          )}
        </>
      );
      case "Head of Department": return (
        <>
          <td>
            {props.courseCoverage}
            &nbsp;%
          </td>
          {props.listType === "General" && (
            <td>
              <AssignButton
                onClick={() => {
                  props.toggleAssignModal(props.course, "Course Instructor", `Assign Course Instructor to "${props.course.id}"`);
                }}
              />
            </td>
          )}
          {props.listType === "Personal" && (
            <td>
              <AssignButton
                onClick={() => {
                  props.toggleAssignModal(props.course, "Teaching Assistant", `Assign Teaching Assistant to "${props.course.id}"`);
                }}
              />
            </td>
          )}
        </>
      );
      default: return null;
    }
  };
  const mapAcademicsToDropdownItems = academics => {
    if (academics.length === 0) {
      return <Dropdown.Item className="list-dropdown-item" as="span">No Academics Assigned</Dropdown.Item>;
    }
    return academics.map(academic => (
      <Dropdown.Item className="list-dropdown-item" as="span" key={academic}>{academic}</Dropdown.Item>
    ));
  };

  return (
    <tr className="table-row">
      <td>{props.course.id}</td>
      <td>{props.course.name}</td>
      <td>{props.course.department !== "UNASSIGNED" ? props.course.department : "-"}</td>
      <td>
        <Dropdown>
          <Dropdown.Toggle className="list-dropdown-button" variant="light">
            View Course Instructors
          </Dropdown.Toggle>
          <Dropdown.Menu className="list-dropdown-menu">
            {mapAcademicsToDropdownItems(props.course.courseInstructors)}
          </Dropdown.Menu>
        </Dropdown>
      </td>
      <td>
        <Dropdown>
          <Dropdown.Toggle className="list-dropdown-button" variant="light">
            View Teaching Assistants
          </Dropdown.Toggle>
          <Dropdown.Menu className="list-dropdown-menu">
            {mapAcademicsToDropdownItems(props.course.teachingAssistants)}
          </Dropdown.Menu>
        </Dropdown>
      </td>
      {courseCoordinatorField()}
      {customData()}
    </tr>
  );
}

CourseListItem.propTypes = {
  course: PropTypes.shape({
    _id: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    department: PropTypes.string,
    courseInstructors: PropTypes.arrayOf(PropTypes.string),
    teachingAssistants: PropTypes.arrayOf(PropTypes.string),
    courseCoordinator: PropTypes.string,
  }).isRequired,
  courseCoverage: PropTypes.number,
  listType: PropTypes.oneOf(["General", "Personal"]),
  toggleDeleteModal: PropTypes.func,
  toggleAssignModal: PropTypes.func,
  toggleUnassignModal: PropTypes.func,
};

CourseListItem.defaultProps = {
  courseCoverage: 0,
  listType: "General",
  toggleDeleteModal: () => { },
  toggleAssignModal: () => { },
  toggleUnassignModal: () => { },
};

export default CourseListItem;
