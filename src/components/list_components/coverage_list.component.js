import React, { useState } from "react";
import CoverageListItem from "../list_item_components/coverage_list_item.component";
import Pagination from "../todo/pagination.component";

const CoverageList = (props) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = props.courses.slice(indexOfFirstPost, indexOfLastPost);
  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const coverageList = () => {
    if (props.courses.length === 0) {
      return (<tr className="no-items">No Items</tr>)
    }
    return currentPosts.map((course, i) => {
      return <CoverageListItem course={course} coverage={props.coverages[i]} key={course._id} />
    });
  };

  return (
    <div>
      <table className="table">
        <thead className="table-head">
          <tr className="table-row">
            <th>Course ID</th>
            <th>Course Name</th>
            <th>Coverage</th>
          </tr>
        </thead>
        <tbody>
          {coverageList()}
        </tbody>
      </table>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={props.courses.length}
        paginate={paginate}
      />
    </div>
  );
}

export default CoverageList;