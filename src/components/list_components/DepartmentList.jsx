import React, { useEffect, useLayoutEffect, useState } from "react";
import PropTypes from "prop-types";
import { useUserContext } from "../../contexts/UserContext";
import DepartmentListItem from "../list_item_components/DepartmentListItem";
import Pagination from "../helper_components/Pagination";

function DepartmentList(props) {
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

    const lastPage = Math.ceil(props.departments.length / newItemsPerPage) || 1;
    const newCurrentPage = currentPage > lastPage ? lastPage : currentPage;
    setCurrentPage(newCurrentPage);

    if (props.departments.length === 0
      || (newCurrentPage === lastPage && props.departments.length % newItemsPerPage !== 0)) {
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
  useLayoutEffect(setLayout, [props.departments, currentPage]);
  useEffect(setupEventListeners, [props.departments, currentPage]);

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
  toggleDeleteModal: PropTypes.func.isRequired,
};

export default DepartmentList;
