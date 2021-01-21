import React, { useState } from "react";
import DepartmentListItem from "../list_item_components/department_list_item.component";
import Pagination from "../todo/pagination.component";

const DepartmentList = (props) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = props.departments.slice(indexOfFirstPost, indexOfLastPost);
  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const departmentList = () => {
    if (props.departments.length === 0) {
      return (<tr className="no-items">No Items</tr>)
    }

    return currentPosts.map((department, i) => {
      return <DepartmentListItem department={department} faculty={props.faculties[i]} headOfDepartment={props.heads[i]}
        role={props.role} key={department._id} toggleModal={props.toggleModal} />
    });
  };

  const customTableHeads = () => {
    switch (props.role) {
      case "hr":
        return (
          <>
            <th />
            <th />
          </>
        );
      default: return <></>;
    }
  };

  return (
    <div>
      <table className="table">
        <thead className="table-head">
          <tr className="table-row">
            <th>Name</th>
            <th>Faculty</th>
            <th>Head of Department</th>
            {customTableHeads()}
          </tr>
        </thead>
        <tbody>
          {departmentList()}
        </tbody>
      </table>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={props.departments.length}
        paginate={paginate}
      />
    </div>
  );
}

export default DepartmentList;