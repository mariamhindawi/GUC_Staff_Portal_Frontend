import React from "react";

const AcademicListItem = (props) => {
    return (
        <tr>
            <td>{props.academic.id}</td>
            <td>{props.academic.name}</td>
            <td>{props.department !== "UNASSIGNED" ? props.department : "-"}</td>
            <td>{props.room}</td>
            <td>{props.academic.salary}</td>
            <td>{props.academic.email}</td>
            <td><button>View academic page</button></td>
        </tr>
    )
};

export default AcademicListItem;