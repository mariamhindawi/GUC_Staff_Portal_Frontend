import React from "react";
import { Card } from "react-bootstrap";

function SlotsTableListItem(props) {
  return (
    <tr>
      <th className={props.slotNumber === "5" ? "last-slot" : ""}>{props.slotNumber}</th>
      <td>
        {props.slots.filter(slot => slot.day === "Saturday").map(slot => (
          <Card
            key={slot._id}
            onClick={() => { props.onClick(slot._id); }}
            className={props.active === slot._id ? "bg-primary schedule-card" : "bg-transparent schedule-card"}
          >
            {slot.course}
          </Card>
        ))}
      </td>
      <td>
        {props.slots.filter(slot => slot.day === "Sunday").map(slot => (
          <Card
            key={slot._id}
            onClick={() => { props.onClick(slot._id); }}
            className={props.active === slot._id ? "bg-primary schedule-card" : "bg-transparent schedule-card"}
          >
            {slot.course}
            <br />
            {slot.room}
          </Card>
        ))}
      </td>
      <td>
        {props.slots.filter(slot => slot.day === "Monday").map(slot => (
          <Card
            key={slot._id}
            onClick={() => { props.onClick(slot._id); }}
            className={props.active === slot._id ? "bg-primary schedule-card" : "bg-transparent schedule-card"}
          >
            {slot.course}
          </Card>
        ))}
      </td>
      <td>
        {props.slots.filter(slot => slot.day === "Tuesday").map(slot => (
          <Card
            key={slot._id}
            onClick={() => { props.onClick(slot._id); }}
            className={props.active === slot._id ? "bg-primary schedule-card" : "bg-transparent schedule-card"}
          >
            {slot.course}
          </Card>
        ))}
      </td>
      <td>
        {props.slots.filter(slot => slot.day === "Wednesday").map(slot => (
          <Card
            key={slot._id}
            onClick={() => { props.onClick(slot._id); }}
            className={props.active === slot._id ? "bg-primary schedule-card" : "bg-transparent schedule-card"}
          >
            {slot.course}
          </Card>
        ))}
      </td>
      <td className={props.slotNumber === "5" ? "last-day" : ""}>
        {props.slots.filter(slot => slot.day === "Thursday").map(slot => (
          <Card
            key={slot._id}
            onClick={() => { props.onClick(slot._id); }}
            className={props.active === slot._id ? "bg-primary schedule-card" : "bg-transparent schedule-card"}
          >
            {slot.course}

          </Card>
        ))}
      </td>
    </tr>
  );
}

export default SlotsTableListItem;
