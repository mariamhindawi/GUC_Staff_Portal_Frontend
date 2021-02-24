import React from "react";
import PropTypes from "prop-types";

function AttendanceListItem(props) {
  return (
    <tr>
      <td>
        {props.attendanceRecord.signInTime.getMilliseconds() !== 0
          ? props.attendanceRecord.signInTime.toString().substring(0, 24)
          : ""}
      </td>
      <td>
        {props.attendanceRecord.signOutTime.getMilliseconds() !== 0
          ? props.attendanceRecord.signOutTime.toString().substring(0, 24)
          : ""}
      </td>
    </tr>
  );
}

AttendanceListItem.propTypes = {
  attendanceRecord: PropTypes.shape({
    user: PropTypes.string,
    signInTime: PropTypes.instanceOf(Date),
    signOutTime: PropTypes.instanceOf(Date),
  }).isRequired,
};

export default AttendanceListItem;
