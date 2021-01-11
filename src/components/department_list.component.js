import React from "react";
import DepartmentListItem from "./department_list_item.component";

const DepartmentList = (props) => {

  const departmentList = () => {
    if (!props.departments) {
      return [];
    }

    return props.departments.map((department, i) => {
      return <DepartmentListItem department={department} faculty={props.faculties[i]} headOfDepartment={props.heads[i]}
        key={department._id} />
    });
  };

  return (
    <table className="table">
      <thead className="thead-light">
        <tr>
          <th>Name</th>
          <th>Faculty</th>
          <th>Head of Department</th>
        </tr>
      </thead>
      <tbody>
        {departmentList()}
      </tbody>
    </table>
  );
}

export default DepartmentList;