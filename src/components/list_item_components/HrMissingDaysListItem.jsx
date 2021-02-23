import React from "react";
import PropTypes, { string } from "prop-types";

function HrMissingDaysListItem(props) {
  return (
    <tr>
      <td>{props.record.id}</td>
      <td>{props.record.missingDays.length}</td>
      <td>View</td>
    </tr>
  );
}

HrMissingDaysListItem.propTypes = {
  record: PropTypes.shape({
    id: PropTypes.string,
    missingDays: PropTypes.arrayOf(string).isRequired,
  }).isRequired,
};

export default HrMissingDaysListItem;
