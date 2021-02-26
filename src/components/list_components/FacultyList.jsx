import React, { useState } from "react";
import PropTypes from "prop-types";
import { useUserContext } from "../../contexts/UserContext";
import useListLayout from "../../hooks/ListLayout";
import FacultyListItem from "../list_item_components/FacultyListItem";
import Pagination from "../helper_components/Pagination";

function FacultyList(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [listStyle, setListStyle] = useState("");
  const [paginationSize, setPaginationSize] = useState("");
  const user = useUserContext();

  useListLayout(setCurrentPage, setItemsPerPage, setPaginationSize, setListStyle,
    currentPage, props.faculties);

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
  const facultyList = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = props.faculties.slice(indexOfFirstItem, indexOfLastItem);

    if (props.faculties.length === 0) {
      return <tr><td className="no-items">No Faculties</td></tr>;
    }
    return currentItems.map(faculty => (
      <FacultyListItem
        key={faculty._id}
        faculty={faculty}
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
              {customTableHeads()}
            </tr>
          </thead>
          <tbody>
            {facultyList()}
          </tbody>
        </table>
      </div>

      <Pagination
        size={paginationSize}
        className="list-pagination"
        numberOfItems={props.faculties.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

FacultyList.propTypes = {
  faculties: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,
  toggleDeleteModal: PropTypes.func,
};

FacultyList.defaultProps = {
  toggleDeleteModal: () => {},
};

export default FacultyList;
