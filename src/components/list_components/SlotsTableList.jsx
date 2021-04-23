import React, { useState } from "react";
import SlotsTableListItem from "../list_item_components/SlotsTableListItem";

function SlotsTableList(props) {
  const [slots, setSlots] = useState([1, 2, 3, 4, 5]);

  const slotRows = () => slots.map(i => (
    <SlotsTableListItem key={i} slots={props.slots.filter(slot => slot.slotNumber === (`${i}`))} slotNumber={`${i}`} onClick={props.onClick} active={props.active} />
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

export default SlotsTableList;
