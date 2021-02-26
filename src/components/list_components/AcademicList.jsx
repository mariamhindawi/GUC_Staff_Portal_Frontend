import React, { useEffect, useLayoutEffect, useState } from "react";
import PropTypes from "prop-types";
import { useUserContext } from "../../contexts/UserContext";
import AcademicListItem from "../list_item_components/AcademicListItem";
import Pagination from "../helper_components/Pagination";

function AcademicList(props) {
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

    const lastPage = Math.ceil(props.academics.length / newItemsPerPage) || 1;
    const newCurrentPage = currentPage > lastPage ? lastPage : currentPage;
    setCurrentPage(newCurrentPage);

    if (props.academics.length === 0
      || (newCurrentPage === lastPage && props.academics.length % newItemsPerPage !== 0)) {
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
          <th style={{ width: "150px" }}>Day Off</th>
          <th style={{ width: "150px" }}>Salary</th>
          <th style={{ width: "150px" }}>Annual Leave Balance</th>
          <th style={{ width: "150px" }}>Accidental Leave Balance</th>
          <th style={{ width: "70px" }}> </th>
          <th style={{ width: "70px" }}> </th>
        </>
      );
      case "Course Instructor":
        if (props.course !== "All Courses" && props.myCourses.includes(props.course)) {
          return (
            <>
              <th style={{ width: "70px" }}> </th>
            </>
          );
        }

        return null;

      default: return null;
    }
  };
  const academicList = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = props.academics.slice(indexOfFirstItem, indexOfLastItem);

    if (props.academics.length === 0) {
      return <tr><td className="no-items">No Academic Members</td></tr>;
    }
    return currentItems.map(academic => (
      <AcademicListItem
        key={academic.id}
        academic={academic}
        toggleDeleteModal={props.toggleDeleteModal}
        course={props.course}
        myCourses={props.myCourses}
      />
    ));
  };

  return (
    <>
      <div className="list-container">
        <table className={`list ${listStyle}`}>
          <thead>
            <tr>
              <th style={{ width: "150px" }}>ID</th>
              <th style={{ width: "250px" }}>Name</th>
              <th style={{ width: "350px" }}>Email</th>
              <th style={{ width: "120px" }}>Gender</th>
              <th style={{ width: "200px" }}>Department</th>
              <th style={{ width: "220px" }}>Role</th>
              <th style={{ width: "150px" }}>Office</th>
              {customTableHeads()}
            </tr>
          </thead>
          <tbody>
            {academicList()}
          </tbody>
        </table>
      </div>

      <Pagination
        size={paginationSize}
        className="list-pagination"
        numberOfItems={props.academics.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

AcademicList.propTypes = {
  academics: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    gender: PropTypes.string,
    salary: PropTypes.number,
    role: PropTypes.string,
    department: PropTypes.string,
    dayOff: PropTypes.string,
    office: PropTypes.string,
    annualLeaveBalance: PropTypes.number,
    accidentalLeaveBalance: PropTypes.number,
  })).isRequired,
  myCourses: PropTypes.arrayOf(String),
  toggleDeleteModal: PropTypes.func.isRequired,
  course: PropTypes.string,
};
AcademicList.defaultProps = {
  course: "",
  myCourses: [],
};
export default AcademicList;
