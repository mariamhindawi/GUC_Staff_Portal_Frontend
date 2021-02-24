import React from "react";
import PropTypes from "prop-types";

function AttendanceRecordsListItem(props) {
  return (
    <tr>
      {props.attendanceRecord.signInTime.getMilliseconds() !== 0
        ? <td>{props.attendanceRecord.signInTime.toString().substring(0, 24)}</td>
        : <td style={{ paddingLeft: "100px" }}>-</td>}
      {props.attendanceRecord.signOutTime.getMilliseconds() !== 0
        ? <td>{props.attendanceRecord.signOutTime.toString().substring(0, 24)}</td>
        : <td style={{ paddingLeft: "100px" }}>-</td>}
    </tr>
  );
}

AttendanceRecordsListItem.propTypes = {
  attendanceRecord: PropTypes.shape({
    user: PropTypes.string,
    signInTime: PropTypes.instanceOf(Date),
    signOutTime: PropTypes.instanceOf(Date),
  }).isRequired,
};

export default AttendanceRecordsListItem;
