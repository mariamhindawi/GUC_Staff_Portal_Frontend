import React, { useState } from "react";
import PropTypes from "prop-types";
import { useUserContext } from "../../contexts/UserContext";
import useListLayout from "../../hooks/ListLayout";
import AcademicListItem from "../list_item_components/AcademicListItem";
import Pagination from "../helper_components/Pagination";

function AcademicList(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [listStyle, setListStyle] = useState("");
  const [paginationSize, setPaginationSize] = useState("");
  const user = useUserContext();

  useListLayout(setCurrentPage, setItemsPerPage, setPaginationSize, setListStyle,
    currentPage, props.academics);

  const customTableHeads = () => {
    switch (user.role) {
      case "HR": return (
        <>
          <th style={{ width: "150px" }}>Salary</th>
          <th style={{ width: "150px" }}>Annual Leave Balance</th>
          <th style={{ width: "150px" }}>Accidental Leave Balance</th>
          <th style={{ width: "70px" }}> </th>
          <th style={{ width: "70px" }}> </th>
        </>
      );
      case "Course Instructor": return (
        <>
          {props.listType === "Personal" && props.academicsType === "Teaching Assistant"
            && <th style={{ width: "70px" }}> </th>}
        </>
      );
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
        academicsType={props.academicsType}
        listType={props.listType}
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
              <th style={{ width: "150px" }}>Day Off</th>
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
  academicsType: PropTypes.oneOf(["All", "Course Instructor", "Teaching Assistant"]),
  listType: PropTypes.oneOf(["General", "Personal"]),
  toggleDeleteModal: PropTypes.func,
};

AcademicList.defaultProps = {
  academicsType: "All",
  listType: "General",
  toggleDeleteModal: () => {},
};

export default AcademicList;
