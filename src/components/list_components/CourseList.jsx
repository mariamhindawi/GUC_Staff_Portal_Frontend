import React, { useEffect, useLayoutEffect, useState } from "react";
import PropTypes from "prop-types";
import { useUserContext } from "../../contexts/UserContext";
import CourseListItem from "../list_item_components/CourseListItem";
import Pagination from "../helper_components/Pagination";

function CourseList(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [listStyle, setListStyle] = useState("");
  const [paginationSize, setPaginationSize] = useState("");
  const user = useUserContext();

  const setLayout = () => {
    if (window.innerWidth >= 768) {
      setPaginationSize("");
    }
    else {
      setPaginationSize("sm");
    }

    let newItemsPerPage = Math.floor((window.innerHeight - 245) / 45);
    newItemsPerPage = newItemsPerPage > 0 ? newItemsPerPage : 1;
    setItemsPerPage(newItemsPerPage);

    const lastPage = Math.ceil(props.courses.length / newItemsPerPage) || 1;
    const newCurrentPage = currentPage > lastPage ? lastPage : currentPage;
    setCurrentPage(newCurrentPage);

    if (props.courses.length === 0
      || (newCurrentPage === lastPage && props.courses.length % newItemsPerPage !== 0)) {
      setListStyle("list-last-page");
    }
    else {
      setListStyle("");
    }
  };
  const setupEventListeners = () => {
    window.addEventListener("resize", setLayout);
    return () => { window.removeEventListener("resize", setLayout); };
  };
  useLayoutEffect(setLayout, [currentPage]);
  useEffect(setupEventListeners, [itemsPerPage, currentPage]);

  const customTableHeads = () => {
    switch (user.role) {
      case "HR": return (
        <>
          <th style={{ width: "70px" }}> </th>
          <th style={{ width: "70px" }}> </th>
        </>
      );
      case "Course Instructor": return (
        <>
          {props.type === "Personal" && <th style={{ width: "150px" }}>Course Coverage</th>}
        </>
      );
      default: return null;
    }
  };
  const courseList = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = props.courses.slice(indexOfFirstItem, indexOfLastItem);

    if (props.courses.length === 0) {
      return <tr><td className="no-items">No Courses</td></tr>;
    }
    return currentItems.map((course, i) => (
      <CourseListItem
        key={course._id}
        course={course}
        courseCoverage={props.coursesCoverage[i]}
        toggleDeleteModal={props.toggleDeleteModal}
        type={props.type}
      />
    ));
  };

  return (
    <>
      <div className="list-container">
        <table className={`list ${listStyle}`}>
          <thead>
            <tr>
              <th style={{ width: "200px" }}>Course ID</th>
              <th style={{ width: "300px" }}>Course name</th>
              <th style={{ width: "200px" }}>Department</th>
              <th style={{ width: "240px" }}>Course Instructors</th>
              <th style={{ width: "240px" }}>Teaching Assistants</th>
              <th style={{ width: "170px" }}>Course Coordinator</th>
              {customTableHeads()}
            </tr>
          </thead>
          <tbody>
            {courseList()}
          </tbody>
        </table>
      </div>

      <Pagination
        size={paginationSize}
        className="list-pagination"
        numberOfItems={props.courses.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

CourseList.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    department: PropTypes.string,
    courseInstructors: PropTypes.arrayOf(PropTypes.string),
    teachingAssistants: PropTypes.arrayOf(PropTypes.string),
    courseCoordinator: PropTypes.string,
  })).isRequired,
  coursesCoverage: PropTypes.arrayOf(PropTypes.number),
  toggleDeleteModal: PropTypes.func,
  type: PropTypes.oneOf(["General", "Personal"]),
};

CourseList.defaultProps = {
  coursesCoverage: [],
  toggleDeleteModal: () => {},
  type: "General",
};

export default CourseList;
