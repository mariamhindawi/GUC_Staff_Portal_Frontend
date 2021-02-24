import React from "react";
import PropTypes from "prop-types";
import Spinner from "../../../helper_components/Spinner";
import MissingDaysList from "../../../list_components/MissingDaysList";

function ViewMissingDays(props) {
  if (props.isLoading) {
    return <Spinner />;
  }
  return <MissingDaysList missingDays={props.missingDays} />;
}

ViewMissingDays.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  missingDays: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
};

export default ViewMissingDays;
