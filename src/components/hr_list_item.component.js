import React from "react";
import { Button } from "reactstrap";

const HrListItem = (props) => {
    return (
        <tr className="table-row">
            <td>{props.hrmember.id}</td>
            <td>{props.hrmember.name}</td>
            <td>{props.room}</td>
            <td>{props.hrmember.salary}</td>
            <td>{props.hrmember.email}</td>
            <td><Button className="rounded">View Hr Member</Button></td>
        </tr>
    )
};

export default HrListItem;