import React from "react";
import { Button } from "reactstrap";

const HrListItem = (props) => {
  if(!props.hrmember){
    return (
        <tr className="table-row">
            <td>{props.hrmember.id}</td>
            <td>{props.hrmember.name}</td>
            <td>{props.room}</td>
            <td>{props.hrmember.salary}</td>
            <td>{props.hrmember.email}</td>
            <td><Button className="rounded">View HR</Button></td>
        </tr>
    )
  }
  else{
    return( <tr className="no-items">No Items</tr>)
  }
};

export default HrListItem;