import React, { useEffect, useLayoutEffect, useState } from "react";
import PropTypes from "prop-types";
import UsersMissingDaysListItem from "../list_item_components/UsersMissingDaysListItem";
import Pagination from "../helper_components/Pagination";

function UsersMissingDaysList(props) {
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

    const lastPage = Math.ceil(props.usersMissingDays.length / newItemsPerPage) || 1;
    const newCurrentPage = currentPage > lastPage ? lastPage : currentPage;
    setCurrentPage(newCurrentPage);

    if (props.usersMissingDays.length === 0
      || (newCurrentPage === lastPage && props.usersMissingDays.length % newItemsPerPage !== 0)) {
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

  const usersMissingDaysList = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = props.usersMissingDays.slice(indexOfFirstItem, indexOfLastItem);

    if (props.usersMissingDays.length === 0) {
      return <tr><td className="no-items">No Records</td></tr>;
    }
    return currentItems.map(userMissingDays => (
      <UsersMissingDaysListItem
        key={userMissingDays.id}
        userMissingDays={userMissingDays}
      />
    ));
  };

  return (
    <>
      <div className="list-container">
        <table className={`list ${listStyle}`}>
          <thead>
            <tr>
              <th style={{ width: "150px" }}>User</th>
              <th style={{ width: "150px" }}>Number Of Missing Days</th>
              <th style={{ width: "200px" }}>Missing Days</th>
            </tr>
          </thead>
          <tbody>
            {usersMissingDaysList()}
          </tbody>
        </table>
      </div>

      <Pagination
        size={paginationSize}
        className="list-pagination"
        numberOfItems={props.usersMissingDays.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

UsersMissingDaysList.propTypes = {
  usersMissingDays: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    missingDays: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
  })).isRequired,
};

export default UsersMissingDaysList;
