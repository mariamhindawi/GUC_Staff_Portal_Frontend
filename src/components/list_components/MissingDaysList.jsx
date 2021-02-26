import React, { useState } from "react";
import PropTypes from "prop-types";
import useListLayout from "../../hooks/ListLayout";
import MissingDaysListItem from "../list_item_components/MissingDaysListItem";
import Pagination from "../helper_components/Pagination";

function MissingDaysList(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [listStyle, setListStyle] = useState("");
  const [paginationSize, setPaginationSize] = useState("");

  useListLayout(setCurrentPage, setItemsPerPage, setPaginationSize, setListStyle,
    currentPage, props.missingDays);

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
