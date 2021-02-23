import React, { useEffect, useLayoutEffect, useState } from "react";
import PropTypes from "prop-types";
import HrMissingHoursListItem from "../list_item_components/HrMissingHoursListItem";
import Pagination from "../helper_components/Pagination";

function HrMissingHoursList(props) {
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

    const lastPage = Math.ceil(props.missingHours.length / newItemsPerPage) || 1;
    const newCurrentPage = currentPage > lastPage ? lastPage : currentPage;
    setCurrentPage(newCurrentPage);

    if (props.missingHours.length === 0
      || (newCurrentPage === lastPage && props.missingHours.length % newItemsPerPage !== 0)) {
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

  const usersList = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = props.missingHours.slice(indexOfFirstItem, indexOfLastItem);

    if (props.missingHours.length === 0) {
      return <tr><td className="no-items">No Records</td></tr>;
    }
    return currentItems.map(record => (
      <HrMissingHoursListItem
        key={record}
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
              <th style={{ width: "220px" }}>User</th>
              <th style={{ width: "220px" }}>Missing Hours</th>
            </tr>
          </thead>
          <tbody>
            {usersList()}
          </tbody>
        </table>
      </div>

      <Pagination
        size={paginationSize}
        className="attendance-pagination"
        numberOfItems={props.missingHours.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

HrMissingHoursList.propTypes = {
  missingHours: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    missingHours: PropTypes.number,
  })).isRequired,
};

export default HrMissingHoursList;
