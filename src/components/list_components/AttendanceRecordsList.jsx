import React, { useEffect, useLayoutEffect, useState } from "react";
import PropTypes from "prop-types";
import AttendanceRecordsListItem from "../list_item_components/AttendanceRecordsListItem";
import Pagination from "../helper_components/Pagination";

function AttendanceRecordsList(props) {
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

    const lastPage = Math.ceil(props.attendanceRecords.length / newItemsPerPage) || 1;
    const newCurrentPage = currentPage > lastPage ? lastPage : currentPage;
    setCurrentPage(newCurrentPage);

    if (props.attendanceRecords.length === 0
      || (newCurrentPage === lastPage && props.attendanceRecords.length % newItemsPerPage !== 0)) {
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

  const attendanceRecordsList = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = props.attendanceRecords.slice(indexOfFirstItem, indexOfLastItem);

    if (props.attendanceRecords.length === 0) {
      return <tr><td className="no-items">No Attendance Records</td></tr>;
    }
    return currentItems.map(attendanceRecord => (
      <AttendanceRecordsListItem
        key={attendanceRecord._id}
        attendanceRecord={attendanceRecord}
      />
    ));
  };

  return (
    <>
      <div className="list-container">
        <table className={`list ${listStyle}`}>
          <thead>
            <tr>
              <th style={{ width: "250px" }}>Sign In Time</th>
              <th style={{ width: "250px" }}>Sign Out Time</th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecordsList()}
          </tbody>
        </table>
      </div>

      <Pagination
        size={paginationSize}
        className="list-pagination"
        numberOfItems={props.attendanceRecords.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

AttendanceRecordsList.propTypes = {
  attendanceRecords: PropTypes.arrayOf(PropTypes.shape({
    user: PropTypes.string,
    signInTime: PropTypes.instanceOf(Date),
    signOutTime: PropTypes.instanceOf(Date),
  })).isRequired,
};

export default AttendanceRecordsList;
