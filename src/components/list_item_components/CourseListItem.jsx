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
          {props.type === "Personal" && (
          <>
            <td>
              {props.courseCoverage}
              &nbsp;%
            </td>
            <td>
              <AssignButton
                onClick={() => {
                  props.toggleAssignModal(props.course.id, "teaching-assistant", `Assign Teaching Assistant to ${props.course.id}`);
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
          {props.type === "General" && (
            <td>
              <AssignButton
                onClick={() => {
                  props.toggleAssignModal(props.course.id, "course-instructor", `Assign Course Instructor to ${props.course.id}`);
                }}
              />
            </td>
          )}
          {props.type === "Personal" && (
            <td>
              <AssignButton
                onClick={() => {
                  props.toggleAssignModal(props.course.id, "academic", `Assign Academic to ${props.course.id}`);
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
      {(user.role === "Course Instructor" || user.role === "Head of Department") && props.type === "Personal" ? (
        <td>
          {props.course.courseCoordinator !== "UNASSIGNED" ? (
            <div>
              <span>{props.course.courseCoordinator}</span>
              <span>
                <UnassignButton onClick={() => {
                  props.toggleUnassignModal(props.course.id, props.course.courseCoordinator);
                }}
                />
              </span>
            </div>
          ) : (
            <div>
              <span>-</span>
              <span>
                <AssignButton onClick={() => {
                  props.toggleAssignModal(props.course.id, props.course.teachingAssistants, "course-coordinator");
                }}
                />
              </span>
            </div>
          ) }
        </td>
      )
        : <td>{props.course.courseCoordinator !== "UNASSIGNED" ? props.course.courseCoordinator : "-"}</td>}
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
  toggleDeleteModal: PropTypes.func,
  toggleAssignModal: PropTypes.func,
  toggleUnassignModal: PropTypes.func,
  type: PropTypes.oneOf(["General", "Personal"]),
};

CourseListItem.defaultProps = {
  courseCoverage: 0,
  toggleDeleteModal: () => {},
  toggleAssignModal: () => {},
  toggleUnassignModal: () => {},
  type: "General",

};

export default CourseListItem;
