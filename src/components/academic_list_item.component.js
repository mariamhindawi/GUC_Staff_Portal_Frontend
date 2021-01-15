import React from "react";
import { Button } from "reactstrap";

const AcademicListItem = (props) => {
    if(props.academic){
    return (
        <tr className="table-row">
            <td>{props.academic.id}</td>
            <td>{props.academic.name}</td>
            <td>{props.department !== "UNASSIGNED" ? props.department : "-"}</td>
            <td>{props.room}</td>
            <td>{props.academic.salary}</td>
            <td>{props.academic.email}</td>
            <td><Button className="rounded">View Academic</Button></td>
        </tr>
    )
    }
    else{
       return( <tr className="no-items">No Items</tr>)
    }
};

export default AcademicListItem;