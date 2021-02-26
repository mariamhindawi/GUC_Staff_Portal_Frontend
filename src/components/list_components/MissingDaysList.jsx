import React, { useEffect, useLayoutEffect, useState } from "react";
import PropTypes from "prop-types";
import MissingDaysListItem from "../list_item_components/MissingDaysListItem";
import Pagination from "../helper_components/Pagination";

function MissingDaysList(props) {
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
  useLayoutEffect(setLayout, [props.missingDays, currentPage]);
  useEffect(setupEventListeners, [props.missingDays, currentPage]);

  const missingDaysList = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = props.missingDays.slice(indexOfFirstItem, indexOfLastItem);

    if (props.missingDays.length === 0) {
      return <tr><td className="no-items">No Missing Days</td></tr>;
    }
    return currentItems.map(missingDay => (
      <MissingDaysListItem
        key={missingDay}
        missingDay={missingDay}
      />
    ));
  };

  return (
    <>
      <div className="list-container">
        <table className={`list ${listStyle}`}>
          <thead>
            <tr>
              <th style={{ width: "200px" }}>Day</th>
            </tr>
          </thead>
          <tbody>
            {missingDaysList()}
          </tbody>
        </table>
      </div>

      <Pagination
        size={paginationSize}
        className="list-pagination"
        numberOfItems={props.missingDays.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

MissingDaysList.propTypes = {
  missingDays: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
};

export default MissingDaysList;
