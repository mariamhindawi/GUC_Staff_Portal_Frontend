import React, { useEffect, useLayoutEffect, useState } from "react";
import PropTypes, { string } from "prop-types";
import HrMissingDaysListItem from "../list_item_components/HrMissingDaysListItem";
import Pagination from "../helper_components/Pagination";

function HrMissingDaysList(props) {
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

    const lastPage = Math.ceil(props.missingDays.length / newItemsPerPage) || 1;
    const newCurrentPage = currentPage > lastPage ? lastPage : currentPage;
    setCurrentPage(newCurrentPage);

    if (props.missingDays.length === 0
      || (newCurrentPage === lastPage && props.missingDays.length % newItemsPerPage !== 0)) {
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
    const currentItems = props.missingDays.slice(indexOfFirstItem, indexOfLastItem);

    if (props.missingDays.length === 0) {
      return <tr><td className="no-items">No Records</td></tr>;
    }
    return currentItems.map(record => (
      <HrMissingDaysListItem
        key={record.id}
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
              <th style={{ width: "220px" }}>Number Of Missing Days</th>
              <th style={{ width: "220px" }}>View Missing Days</th>
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
        numberOfItems={props.missingDays.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

HrMissingDaysList.propTypes = {
  missingDays: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    missingDays: PropTypes.arrayOf(string).isRequired,
  })).isRequired,
};

export default HrMissingDaysList;
