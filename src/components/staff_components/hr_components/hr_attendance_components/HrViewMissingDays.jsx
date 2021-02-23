import React from "react";
import PropTypes, { string } from "prop-types";
import Axios from "axios";
import useAxiosCancel from "../../../../hooks/AxiosCancel";
import Spinner from "../../../helper_components/Spinner";
import HrMissingDaysList from "../../../list_components/HrMissingDaysList";

function HrViewMissingDays(props) {
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

  return (
    <>
      { props.isLoading && <Spinner />}

      {
        !props.isLoading && (
          <div className="view-container" style={{ padding: "0px" }}>
            <HrMissingDaysList
              missingDays={props.missingDays}
            />
          </div>
        )
      }
    </>
  );
}

HrViewMissingDays.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  missingDays: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    missingDays: PropTypes.arrayOf(string).isRequired,
  })).isRequired,
};

export default HrViewMissingDays;
