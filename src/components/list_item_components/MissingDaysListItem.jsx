import React from "react";
import PropTypes from "prop-types";

function MissingDaysListItem(props) {
  return (
    <tr>
      <td>{props.record}</td>
    </tr>
  );
}

MissingDaysListItem.propTypes = {
  record: PropTypes.string.isRequired,
};

export default MissingDaysListItem;
