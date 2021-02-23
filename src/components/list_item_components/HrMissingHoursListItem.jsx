import React from "react";
import PropTypes from "prop-types";

function HrMissingHoursListItem(props) {
  return (
    <tr>
      <td>{props.record.id}</td>
      <td>{props.record.missingHours}</td>
    </tr>
  );
}

HrMissingHoursListItem.propTypes = {
  record: PropTypes.shape({
    id: PropTypes.string,
    missingHours: PropTypes.number,
  }).isRequired,
};

export default HrMissingHoursListItem;
