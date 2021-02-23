import React from "react";
import PropTypes from "prop-types";
import Axios from "axios";
import useAxiosCancel from "../../../hooks/AxiosCancel";
import Spinner from "../../helper_components/Spinner";
import HrMissingHoursList from "../../list_components/HrMissingHoursList";

function HrViewMissingHours(props) {
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

  return (
    <>
      { props.isLoading && <Spinner />}

      {
        !props.isLoading && (
          <div className="view-container" style={{ padding: "0px" }}>
            <HrMissingHoursList
              missingHours={props.missingHours}
            />
          </div>
        )
      }
    </>
  );
}

HrViewMissingHours.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  missingHours: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    missingHours: PropTypes.number.isRequired,
  })).isRequired,
};

export default HrViewMissingHours;
