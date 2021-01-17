import React, { useState } from "react";
import HrListItem from "../list_item_components/hr_list_item.component";
import Pagination from "../pagination.component";

const HrList = (props) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = props.hrmembers.slice(indexOfFirstPost, indexOfLastPost);
  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const hrList = () => {
    if (props.hrmembers.length === 0) {
      return (<tr className="no-items">No Items</tr>)
    }

    return currentPosts.map((hrmember, i) => {
      return <HrListItem hrmember={hrmember} room={props.rooms[i]} key={hrmember.id} role={props.role} toggleModal={props.toggleModal} />
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
            <th>ID</th>
            <th>name</th>
            <th>Office</th>
            <th>Salary</th>
            <th>Email</th>
            {customTableHeads()}
          </tr>
        </thead>
        <tbody>
          {hrList()}
        </tbody>
      </table>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={props.hrmembers.length}
        paginate={paginate}
      />
    </div>
  );
}
export default HrList;