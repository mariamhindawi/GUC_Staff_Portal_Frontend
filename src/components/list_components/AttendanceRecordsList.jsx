import React, { useState } from "react";
import PropTypes from "prop-types";
import { useUserContext } from "../../contexts/UserContext";
import useListLayout from "../../hooks/ListLayout";
import AttendanceRecordsListItem from "../list_item_components/AttendanceRecordsListItem";
import Pagination from "../helper_components/Pagination";

function AttendanceRecordsList(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [listStyle, setListStyle] = useState("");
  const [paginationSize, setPaginationSize] = useState("");
  const user = useUserContext();

  useListLayout(setCurrentPage, setItemsPerPage, setPaginationSize, setListStyle,
    currentPage, props.attendanceRecords);

  const customTableHeads = () => {
    switch (user.role) {
      case "HR": return (
        <>
          {props.listType === "Edit" && (
            <th style={{ width: "70px" }}> </th>
          )}
          {props.listType === "Edit" && (
            <th style={{ width: "70px" }}> </th>
          )}
        </>
      );
      default: return null;
    }
  };
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
        listType={props.listType}
        toggleEditModal={props.toggleEditModal}
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
              <th style={{ width: "250px" }}>Sign In Time</th>
              <th style={{ width: "250px" }}>Sign Out Time</th>
              {customTableHeads()}
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
    _id: PropTypes.string,
    user: PropTypes.string,
    signInTime: PropTypes.instanceOf(Date),
    signOutTime: PropTypes.instanceOf(Date),
  })).isRequired,
  listType: PropTypes.oneOf(["General", "Edit"]),
  toggleEditModal: PropTypes.func,
  toggleDeleteModal: PropTypes.func,
};

AttendanceRecordsList.defaultProps = {
  listType: "General",
  toggleEditModal: () => {},
  toggleDeleteModal: () => {},
};

export default AttendanceRecordsList;
