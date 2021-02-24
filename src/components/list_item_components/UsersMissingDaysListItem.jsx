import React from "react";
import PropTypes from "prop-types";
import { Dropdown } from "react-bootstrap";

function UsersMissingDaysListItem(props) {
  const mapMissingDaysToDropdownItems = () => {
    if (props.userMissingDays.missingDays.length === 0) {
      return <Dropdown.Item className="list-dropdown-item" as="span">No Missing Days</Dropdown.Item>;
    }
    return props.userMissingDays.missingDays.map(missingDay => (
      <Dropdown.Item className="list-dropdown-item" as="span" key={missingDay}>{missingDay.toString().substring(0, 15)}</Dropdown.Item>
    ));
  };

  return (
    <tr>
      <td>{props.userMissingDays.id}</td>
      <td>{props.userMissingDays.missingDays.length}</td>
      <td>
        <Dropdown>
          <Dropdown.Toggle className="list-dropdown-button" variant="light">
            View Missing Days
          </Dropdown.Toggle>
          <Dropdown.Menu className="list-dropdown-menu">
            {mapMissingDaysToDropdownItems(props.userMissingDays.missingDays)}
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </tr>
  );
}

UsersMissingDaysListItem.propTypes = {
  userMissingDays: PropTypes.shape({
    id: PropTypes.string,
    missingDays: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
  }).isRequired,
};

export default UsersMissingDaysListItem;
