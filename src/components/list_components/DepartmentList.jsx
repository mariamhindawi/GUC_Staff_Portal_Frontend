import React, { useState } from "react";
import PropTypes from "prop-types";
import { useUserContext } from "../../contexts/UserContext";
import useListLayout from "../../hooks/ListLayout";
import DepartmentListItem from "../list_item_components/DepartmentListItem";
import Pagination from "../helper_components/Pagination";

function DepartmentList(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [listStyle, setListStyle] = useState("");
  const [paginationSize, setPaginationSize] = useState("");
  const user = useUserContext();

  useListLayout(setCurrentPage, setItemsPerPage, setPaginationSize, setListStyle,
    currentPage, props.departments);

  const customTableHeads = () => {
    switch (user.role) {
      case "HR": return (
        <>
          <th style={{ width: "70px" }}> </th>
          <th style={{ width: "70px" }}> </th>
        </>
      );
      default: return null;
    }
  };
  const departmentList = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = props.departments.slice(indexOfFirstItem, indexOfLastItem);

    if (props.departments.length === 0) {
      return <tr><td className="no-items">No Departments</td></tr>;
    }
    return currentItems.map(department => (
      <DepartmentListItem
        key={department._id}
        department={department}
        toggleDeleteModal={props.toggleDeleteModal}
      />
    ));
  };

  return (
    <>
      <div className="list-container">
        <table className={`list ${listStyle}`}>
          <thead>
            <tr>
              <th style={{ width: "200px" }}>Name</th>
              <th style={{ width: "200px" }}>Faculty</th>
              <th style={{ width: "150px" }}>Head of Department</th>
              {customTableHeads()}
            </tr>
          </thead>
          <tbody>
            {departmentList()}
          </tbody>
        </table>
      </div>

      <Pagination
        size={paginationSize}
        className="list-pagination"
        numberOfItems={props.departments.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

DepartmentList.propTypes = {
  departments: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    faculty: PropTypes.string,
    headOfDepartment: PropTypes.string,
  })).isRequired,
  toggleDeleteModal: PropTypes.func,
};

DepartmentList.defaultProps = {
  toggleDeleteModal: () => {},
};

export default DepartmentList;
