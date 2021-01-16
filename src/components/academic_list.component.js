import React, { useState } from 'react';
import AcademicListItem from "././academic_list_item.component";
import Pagination from "././pagination.component";

const AcademicList = (props) => {
  
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = props.academics.slice(indexOfFirstPost, indexOfLastPost);
  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const academicList = () => {
    if (props.academics.length === 0) {
      return (<tr className="no-items">No Items</tr>);
    }

    return currentPosts.map((academic, i) => {
      return <AcademicListItem academic={academic} department={props.departments[i]} room={props.rooms[i]} role={props.role} key={academic.id} toggleModal={props.toggleModal} />
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
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Office</th>
            <th>Day Off</th>
            <th>Email</th>
            {customTableHeads()}
          </tr>
        </thead>
        <tbody>
          {academicList()}
        </tbody>
      </table>

      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={props.academics.length}
        paginate={paginate}
      />
    </div>
  );
}

export default AcademicList;