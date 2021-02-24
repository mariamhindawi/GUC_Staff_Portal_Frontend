import React from "react";
import PropTypes from "prop-types";

function MissingDaysListItem(props) {
  return (
    <tr>
      <td>{props.missingDay.toString().substring(0, 15)}</td>
    </tr>
  );
}

MissingDaysListItem.propTypes = {
  missingDay: PropTypes.instanceOf(Date).isRequired,
};

export default MissingDaysListItem;
