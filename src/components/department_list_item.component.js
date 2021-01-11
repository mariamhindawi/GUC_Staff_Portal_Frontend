import React from "react";
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";

const DepartmentListItem = (props) => {

    return (
        <tr>
            <td>{props.department.name}</td>
            <td>{props.faculty!=="UNASSIGNED"?props.faculty:"-"}</td>
            <td>{props.headOfDepartment!=="UNASSIGNED"?props.headOfDepartment:"-"}</td>
        </tr>
    )
};

export default DepartmentListItem;