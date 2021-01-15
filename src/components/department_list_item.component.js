import React from "react";

const DepartmentListItem = (props) => {
   if(!props.faculty){
    return (
        <tr  className="table-row">
            <td>{props.department.name}</td>
            <td>{props.faculty !== "UNASSIGNED" ? props.faculty : "-"}</td>
            <td>{props.headOfDepartment !== "UNASSIGNED" ? props.headOfDepartment : "-"}</td>
        </tr>
    )
   }
   else{
    return( <tr className="no-items">No Items</tr>)
   }
};

export default DepartmentListItem;