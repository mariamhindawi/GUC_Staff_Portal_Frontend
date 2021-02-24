import React from "react";
import PropTypes from "prop-types";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Spinner from "../../../helper_components/Spinner";

function ViewHours(props) {
  if (props.isLoading) {
    return <Spinner />;
  }

  const { requiredHours, missingHours, extraHours } = props.hours;
  const spentHours = missingHours ? requiredHours - missingHours : requiredHours + extraHours;
  return (
    <div className="hours-container">
      <div className="hours-card">
        <span>
          Missing hours:&nbsp;&nbsp;
          {missingHours.toFixed(2)}
        </span>
        <span>
          Extra Hours:&nbsp;&nbsp;
          {extraHours.toFixed(2)}
        </span>
      </div>
      <div className="hours-progress">
        <span>Hours Spent</span>
        <CircularProgressbar
          value={spentHours}
          maxValue={requiredHours}
          text={`${((spentHours / requiredHours) * 100).toFixed(2)}%`}
        />
      </div>
    </div>
  );
}

ViewHours.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  hours: PropTypes.shape({
    requiredHours: PropTypes.number,
    missingHours: PropTypes.number,
    extraHours: PropTypes.number,
  }).isRequired,
};

export default ViewHours;
