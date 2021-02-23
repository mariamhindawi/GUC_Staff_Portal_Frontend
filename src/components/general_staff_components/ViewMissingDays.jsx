import React from "react";
import PropTypes, { string } from "prop-types";
import Axios from "axios";
import useAxiosCancel from "../../hooks/AxiosCancel";
import Spinner from "../helper_components/Spinner";
import MissingDaysList from "../list_components/MissingDaysList";

function ViewMissingDays(props) {
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

  return (
    <>
      { props.isLoading && <Spinner />}

      {
        !props.isLoading && (
          <div className="view-container" style={{ padding: "0px" }}>
            <MissingDaysList records={props.records} />
          </div>
        )
      }
    </>
  );
}

ViewMissingDays.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  records: PropTypes.arrayOf(string).isRequired,
};

export default ViewMissingDays;
