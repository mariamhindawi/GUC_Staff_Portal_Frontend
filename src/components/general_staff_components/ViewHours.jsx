import React from "react";
import PropTypes from "prop-types";
import Axios from "axios";
import { CircularProgressbar } from "react-circular-progressbar";
import useAxiosCancel from "../../hooks/AxiosCancel";
import "react-circular-progressbar/dist/styles.css";
import Spinner from "../helper_components/Spinner";

function ViewHours(props) {
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);
  return (
    <>
      { props.isLoading && <Spinner />}

      {
        !props.isLoading && (
          <div className="view-container hours-progress-container" style={{ padding: "0px" }}>
            <div className="hours-card">
              <span>
                Missing hours:
                {" "}
                {props.hours.missingHours}
              </span>
              <span>
                Extra Hours:
                {" "}
                {props.hours.extraHours}
              </span>
            </div>
            <div className="hours-progress">
              <span>Hours Spent</span>
              <CircularProgressbar
                value={props.hours.requiredHours - props.hours.missingHours}
                maxValue={props.hours.requiredHours}
                text={`${(props.hours.requiredHours - props.hours.missingHours) * 100}%`}
                styles={{
                  path: {
                    // Path color
                    stroke: "#5bc0de",
                  },
                  text: {
                    fill: "#5bc0de",
                  },
                }}
              />
            </div>
          </div>
        )
      }
    </>
  );
}

ViewHours.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  hours: PropTypes.shape({
    missingHours: PropTypes.number,
    extraHours: PropTypes.number,
    requiredHours: PropTypes.number,
  }).isRequired,
};

export default ViewHours;
