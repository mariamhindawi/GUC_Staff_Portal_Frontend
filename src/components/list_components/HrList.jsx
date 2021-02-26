import React, { useState } from "react";
import PropTypes from "prop-types";
import { useUserContext } from "../../contexts/UserContext";
import useListLayout from "../../hooks/ListLayout";
import HrListItem from "../list_item_components/HrListItem";
import Pagination from "../helper_components/Pagination";

function HrList(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [listStyle, setListStyle] = useState("");
  const [paginationSize, setPaginationSize] = useState("");
  const user = useUserContext();

  useListLayout(setCurrentPage, setItemsPerPage, setPaginationSize, setListStyle,
    currentPage, props.hrMembers);

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
      default: return null;
    }
  };
  const hrList = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = props.hrMembers.slice(indexOfFirstItem, indexOfLastItem);

    if (props.hrMembers.length === 0) {
      return <tr><td className="no-items">No HR Members</td></tr>;
    }
    return currentItems.map(hrMember => (
      <HrListItem
        key={hrMember.id}
        hrMember={hrMember}
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
              <th style={{ width: "150px" }}>ID</th>
              <th style={{ width: "250px" }}>Name</th>
              <th style={{ width: "350px" }}>Email</th>
              <th style={{ width: "120px" }}>Gender</th>
              <th style={{ width: "150px" }}>Office</th>
              {customTableHeads()}
            </tr>
          </thead>
          <tbody>
            {hrList()}
          </tbody>
        </table>
      </div>

      <Pagination
        size={paginationSize}
        className="list-pagination"
        numberOfItems={props.hrMembers.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

HrList.propTypes = {
  hrMembers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    gender: PropTypes.string,
    salary: PropTypes.number,
    office: PropTypes.string,
    annualLeaveBalance: PropTypes.number,
    accidentalLeaveBalance: PropTypes.number,
  })).isRequired,
  toggleDeleteModal: PropTypes.func,
};

HrList.defaultProps = {
  toggleDeleteModal: () => {},
};

export default HrList;
