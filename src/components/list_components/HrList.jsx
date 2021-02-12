import React, { useEffect, useLayoutEffect, useState } from "react";
import PropTypes from "prop-types";
import { useUserContext } from "../../contexts/UserContext";
import HrListItem from "../list_item_components/HrListItem";
import Pagination from "../helper_components/Pagination";

function HrList(props) {
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

    const lastPage = Math.ceil(props.hrMembers.length / newItemsPerPage) || 1;
    const newCurrentPage = currentPage > lastPage ? lastPage : currentPage;
    setCurrentPage(newCurrentPage);

    if (props.hrMembers.length === 0
      || (newCurrentPage === lastPage && props.hrMembers.length % newItemsPerPage !== 0)) {
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
              <th style={{ width: "100px" }}>ID</th>
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
    dayOff: PropTypes.string,
    office: PropTypes.string,
    annualLeaveBalance: PropTypes.number,
    accidentalLeaveBalance: PropTypes.number,
  })).isRequired,
  toggleDeleteModal: PropTypes.func.isRequired,
};

export default HrList;
