import React from "react";

const DepartmentListItem = (props) => {
    return (
        <tr  className="table-row">
            <td>{props.department.name}</td>
            <td>{props.faculty !== "UNASSIGNED" ? props.faculty : "-"}</td>
            <td>{props.headOfDepartment !== "UNASSIGNED" ? props.headOfDepartment : "-"}</td>
        </tr>
    )
};

export default DepartmentListItem;