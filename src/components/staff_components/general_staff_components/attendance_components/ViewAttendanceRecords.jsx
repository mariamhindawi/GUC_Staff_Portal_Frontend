import React from "react";
import PropTypes from "prop-types";
import Spinner from "../../../helper_components/Spinner";
import AttendanceList from "../../../list_components/AttendanceList";

function ViewAttendanceRecords(props) {
  if (props.isLoading) {
    return <Spinner />;
  }
  return <AttendanceList attendanceRecords={props.attendanceRecords} />;
}

ViewAttendanceRecords.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  attendanceRecords: PropTypes.arrayOf(PropTypes.shape({
    user: PropTypes.string,
    signInTime: PropTypes.instanceOf(Date),
    signOutTime: PropTypes.instanceOf(Date),
  })).isRequired,
};

export default ViewAttendanceRecords;
