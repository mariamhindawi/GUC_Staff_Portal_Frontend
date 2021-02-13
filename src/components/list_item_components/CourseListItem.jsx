import React from "react";
import PropTypes from "prop-types";
import { Link, useRouteMatch } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import DeleteButton from "../button_components/DeleteButton";
import UpdateButton from "../button_components/UpdateButton";
import { useUserContext } from "../../contexts/UserContext";

function CourseListItem(props) {
  const user = useUserContext();
  const match = useRouteMatch();

  const customData = () => {
    switch (user.role) {
      case "HR":
        return (
          <>
            <td>
              <Link to={`${match.url}/update/${props.course._id}`} tabIndex={-1}>
                <UpdateButton />
              </Link>
            </td>
            <td>
              <DeleteButton onClick={() => { props.toggleDeleteModal(props.course.id); }} />
            </td>
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
            Course Instructors
          </Dropdown.Toggle>
          <Dropdown.Menu className="list-dropdown-menu">
            {mapAcademicsToDropdownItems(props.course.courseInstructors)}
          </Dropdown.Menu>
        </Dropdown>
        {}
      </td>
      <td>
        <Dropdown>
          <Dropdown.Toggle className="list-dropdown-button" variant="light">
            Teaching Assistants
          </Dropdown.Toggle>
          <Dropdown.Menu className="list-dropdown-menu">
            {mapAcademicsToDropdownItems(props.course.teachingAssistants)}
          </Dropdown.Menu>
        </Dropdown>
        {}
      </td>
      <td>{props.course.courseCoordinator !== "UNASSIGNED" ? props.course.courseCoordinator : "-"}</td>
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
  toggleDeleteModal: PropTypes.func.isRequired,
};

export default CourseListItem;
