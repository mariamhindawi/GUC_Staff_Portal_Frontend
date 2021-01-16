import React, { useState } from 'react';
import FacultyListItem from "./faculty_list_item.component";
import Pagination from "././pagination.component";

const FacultyList = (props) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = props.faculties.slice(indexOfFirstPost, indexOfLastPost);
  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const facultyList = () => {
    if (props.faculties.length === 0) {
      return (<tr className="no-items">No Items</tr>)
    }

    return currentPosts.map((faculty) => {
      return <FacultyListItem faculty={faculty} role={props.role} key={faculty._id} toggleModal={props.toggleModal} />
    });
  };

  const customTableHeads = () => {
    switch (props.role) {
      case "hr":
        return (
          <>
            <th/>
            <th/>
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
            <th>Faculty Name</th>
            {customTableHeads()}
          </tr>
        </thead>
        <tbody>
          {facultyList()}
        </tbody>
      </table>

      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={props.faculties.length}
        paginate={paginate}
      />
    </div>
  );
}
export default FacultyList;