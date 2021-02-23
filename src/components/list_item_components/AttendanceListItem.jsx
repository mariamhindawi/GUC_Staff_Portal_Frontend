import React from "react";
import PropTypes from "prop-types";

function AttendanceListItem(props) {
  return (
    <tr>
      <td>{props.record.signInTime}</td>
      <td>{props.record.signOutTime}</td>
    </tr>
  );
}

AttendanceListItem.propTypes = {
  record: PropTypes.shape({
    user: PropTypes.string,
    signInTime: PropTypes.string,
    signOutTime: PropTypes.string,
  }).isRequired,
};

export default AttendanceListItem;
