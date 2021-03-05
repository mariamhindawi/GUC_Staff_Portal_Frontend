import React from "react";
import { Card, CardTitle } from "reactstrap";

const SlotsTable = ({ slots, onClick, active }) => {
  const slotRows = [];
  for (let i = 1; i < 6; i++) {
    slotRows.push(<SlotTableRow key={i} slots={slots.filter(slot => slot.slotNumber === (i+""))} slotNumber={i+""} onClick={onClick} active={active} />);
  }

  return (
    <table className="table">
      <thead className="table-head">
        <tr className="table-row">
          <th />
          <th>Saturday</th>
          <th>Sunday</th>
          <th>Monday</th>
          <th>Tuesday</th>
          <th>Wednesday</th>
          <th>Thursday</th>
        </tr>
      </thead>
      <tbody>
        {slotRows}
      </tbody>
    </table>
  );
};
const SlotTableRow = ({ slotNumber, slots, chooseSlot, onClick, active }) => (
  <tr className="table-schedule">
    <th className="table-row-schedule text-center">{slotNumber}</th>
    <td>
      {slots.filter(slot => slot.day === "Saturday").map(slot => (
        <Card key={slot._id} onClick={() => onClick(slot._id)} className={active === slot._id ? "bg-primary" : "bg-transparent"}>
          <CardTitle>{slot.course}</CardTitle>
          {slot.room}
        </Card>
      ))}
    </td>
    <td>{slots.filter(slot => slot.day === "Sunday").map(slot => <Card key={slot._id} onClick={() => { onClick(slot._id); }} className={active === slot._id ? "bg-primary" : "bg-transparent"}>{`${slot.room} | ${slot.course}`}</Card>)}</td>
    <td>{slots.filter(slot => slot.day === "Monday").map(slot => <Card key={slot._id} onClick={() => { onClick(slot._id); }} className={active === slot._id ? "bg-primary" : "bg-transparent"}>{`${slot.room} | ${slot.course}`}</Card>)}</td>
    <td>{slots.filter(slot => slot.day === "Tuesday").map(slot => <Card key={slot._id} onClick={() => { onClick(slot._id); }} className={active === slot._id ? "bg-primary" : "bg-transparent"}>{`${slot.room} | ${slot.course}`}</Card>)}</td>
    <td>{slots.filter(slot => slot.day === "Wednesday").map(slot => <Card key={slot._id} onClick={() => { onClick(slot._id); }} className={active === slot._id ? "bg-primary" : "bg-transparent"}>{`${slot.room} | ${slot.course}`}</Card>)}</td>
    <td>{slots.filter(slot => slot.day === "Thursday").map(slot => <Card key={slot._id} onClick={() => { onClick(slot._id); }} className={active === slot._id ? "bg-primary" : "bg-transparent"}>{`${slot.room} | ${slot.course}`}</Card>)}</td>
  </tr>
);

export default SlotsTable;
