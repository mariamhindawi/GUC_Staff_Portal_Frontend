import React from "react";
import PropTypes from "prop-types";
import { Dropdown } from "react-bootstrap";

function CiCourseListItem(props) {
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
      <td>
        {props.course.courseCoordinator !== "UNASSIGNED"
          ? props.course.courseCoordinator
          : <button type="button">Assign</button>}
      </td>
      <td>
        {props.coverage}
        &nbsp;
        %
      </td>
      <td>
        <button type="button">View Slots</button>
      </td>
    </tr>
  );
}

CiCourseListItem.propTypes = {
  course: PropTypes.shape({
    _id: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    department: PropTypes.string,
    courseInstructors: PropTypes.arrayOf(PropTypes.string),
    teachingAssistants: PropTypes.arrayOf(PropTypes.string),
    courseCoordinator: PropTypes.string,
  }).isRequired,
  coverage: PropTypes.number.isRequired,
};

export default CiCourseListItem;
