import React from "react";
import PropTypes from "prop-types";
import Axios from "axios";
import useAxiosCancel from "../../../hooks/AxiosCancel";
import Spinner from "../../helper_components/Spinner";
import AttendanceList from "../../list_components/AttendanceList";

function ViewAttendance(props) {
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

  return (
    <>
      { props.isLoading && <Spinner />}

      {
        !props.isLoading && (
          <div className="view-container" style={{ padding: "0px" }}>
            <AttendanceList records={props.records} />
          </div>
        )
      }
    </>
  );
}

ViewAttendance.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  records: PropTypes.arrayOf(PropTypes.shape({
    user: PropTypes.string,
    signInTime: PropTypes.string,
    signOutTime: PropTypes.string,
  })).isRequired,
};

export default ViewAttendance;
