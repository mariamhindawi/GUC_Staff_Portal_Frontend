import React from "react";
import PropTypes from "prop-types";

function UsersMissingHoursListItem(props) {
  return (
    <tr>
      <td>{props.userMissingHours.id}</td>
      <td>{props.userMissingHours.missingHours.toFixed(2)}</td>
    </tr>
  );
}

UsersMissingHoursListItem.propTypes = {
  userMissingHours: PropTypes.shape({
    id: PropTypes.string,
    missingHours: PropTypes.number,
  }).isRequired,
};

export default UsersMissingHoursListItem;
