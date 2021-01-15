import React from "react";
import { Button } from "reactstrap";

const CoverageListItem = (props) => {
    if(!props.course){
        return (
            <tr className="table-row">
                <td>{props.course.id}</td>
                <td>{props.course.name}</td>
                <td>{props.coverage}</td>
            </tr>
        )
    }
    else{
        return( <tr className="no-items">No Items</tr>)
     }
};

export default CoverageListItem;