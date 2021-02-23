import React, { useEffect, useLayoutEffect, useState } from "react";
import PropTypes from "prop-types";
import AttendanceListItem from "../list_item_components/AttendanceListItem";
import Pagination from "../helper_components/Pagination";

function AttendanceList(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [listStyle, setListStyle] = useState("");
  const [paginationSize, setPaginationSize] = useState("");

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

    const lastPage = Math.ceil(props.records.length / newItemsPerPage) || 1;
    const newCurrentPage = currentPage > lastPage ? lastPage : currentPage;
    setCurrentPage(newCurrentPage);

    if (props.records.length === 0
      || (newCurrentPage === lastPage && props.records.length % newItemsPerPage !== 0)) {
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

  const attendanceList = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = props.records.slice(indexOfFirstItem, indexOfLastItem);

    if (props.records.length === 0) {
      return <tr><td className="no-items">No Attendance Records</td></tr>;
    }
    return currentItems.map(record => (
      <AttendanceListItem
        key={record._id}
        record={record}
      />
    ));
  };

  return (
    <>
      <div className="list-container">
        <table className={`list ${listStyle}`}>
          <thead>
            <tr>
              <th style={{ width: "220px" }}>Sign In Time</th>
              <th style={{ width: "220px" }}>Sign Out Time</th>
            </tr>
          </thead>
          <tbody>
            {attendanceList()}
          </tbody>
        </table>
      </div>

      <Pagination
        size={paginationSize}
        className="attendance-pagination"
        numberOfItems={props.records.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

AttendanceList.propTypes = {
  records: PropTypes.arrayOf(PropTypes.shape({
    user: PropTypes.string,
    signInTime: PropTypes.string,
    signOutTime: PropTypes.string,
  })).isRequired,
};

export default AttendanceList;
