import React, { useEffect, useLayoutEffect, useState } from "react";
import PropTypes, { string } from "prop-types";
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

  const missingDaysList = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = props.records.slice(indexOfFirstItem, indexOfLastItem);

    if (props.records.length === 0) {
      return <tr><td className="no-items">No Missing Days</td></tr>;
    }
    return currentItems.map(record => (
      <MissingDaysListItem
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
              <th>Day</th>
            </tr>
          </thead>
          <tbody>
            {missingDaysList()}
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

MissingDaysList.propTypes = {
  records: PropTypes.arrayOf(string).isRequired,
};

export default MissingDaysList;
