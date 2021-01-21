import React, { useState } from "react";
import CourseListItem from "../list_item_components/course_list_item.component";
import Pagination from "../todo/pagination.component";

const CourseList = (props) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = props.courses.slice(indexOfFirstPost, indexOfLastPost);
  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const courseList = () => {
    if (props.courses.length === 0) {
      return (<tr className="no-items">No Items</tr>)
    }

    return currentPosts.map((course, i) => {
      return <CourseListItem course={course} department={props.departments[i]} role={props.role} key={course._id} toggleModal={props.toggleModal} />
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
            <th>Course ID</th>
            <th>Course name</th>
            <th>Department</th>
            <th>Course coordinator</th>
            {customTableHeads()}
          </tr>
        </thead>
        <tbody>
          {courseList()}
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

export default CourseList;