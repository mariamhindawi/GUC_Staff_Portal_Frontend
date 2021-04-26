import React, { useState } from "react";
import PropTypes from "prop-types";
import SlotsTableListItem from "../list_item_components/SlotsTableListItem";

function SlotsTableList(props) {
  // eslint-disable-next-line no-unused-vars
  const [slots, setSlots] = useState([1, 2, 3, 4, 5]);

  const slotRows = () => slots.map(i => (
    <SlotsTableListItem
      key={i}
      slots={props.slots.filter(slot => slot.slotNumber === (`${i}`))}
      slotNumber={`${i}`}
      activeSlot={props.activeSlot}
      onClick={props.onClick}
      request={props.request}
    />
  ));
  return (
    <div className="list-container">
      <table className="table-schedule" border="1" bordercolor="blue">
        <thead>
          <tr>
            <th style={{ width: "70px" }}>Slot </th>
            <th style={{ width: "200px" }}>Saturday</th>
            <th style={{ width: "200px" }}>Sunday</th>
            <th style={{ width: "200px" }}>Monday</th>
            <th style={{ width: "200px" }}>Tuesday</th>
            <th style={{ width: "200px" }}>Wednesday</th>
            <th style={{ width: "200px" }}>Thursday</th>
          </tr>
        </thead>
        <tbody>
          {slotRows()}
        </tbody>
      </table>
    </div>
  );
}
SlotsTableList.propTypes = {
  slots: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    day: PropTypes.string,
    staffMember: PropTypes.string,
    slotNumber: PropTypes.string,
    room: PropTypes.string,
    course: PropTypes.string,
    type: PropTypes.string,
  })).isRequired,
  activeSlot: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  request: PropTypes.string,
};

SlotsTableList.defaultProps = {
  onClick: () => {},
  request: "",
};
export default SlotsTableList;
