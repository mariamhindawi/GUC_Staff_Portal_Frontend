import React, { useEffect, useLayoutEffect, useState } from "react";
import PropTypes from "prop-types";
import UsersMissingHoursListItem from "../list_item_components/UsersMissingHoursListItem";
import Pagination from "../helper_components/Pagination";

function UsersMissingHoursList(props) {
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

    const lastPage = Math.ceil(props.usersMissingHours.length / newItemsPerPage) || 1;
    const newCurrentPage = currentPage > lastPage ? lastPage : currentPage;
    setCurrentPage(newCurrentPage);

    if (props.usersMissingHours.length === 0
      || (newCurrentPage === lastPage && props.usersMissingHours.length % newItemsPerPage !== 0)) {
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

  const usersMissingHoursList = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = props.usersMissingHours.slice(indexOfFirstItem, indexOfLastItem);

    if (props.usersMissingHours.length === 0) {
      return <tr><td className="no-items">No Records</td></tr>;
    }
    return currentItems.map(userMissingHours => (
      <UsersMissingHoursListItem
        key={userMissingHours.id}
        userMissingHours={userMissingHours}
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
              <th style={{ width: "150px" }}>Missing Hours</th>
            </tr>
          </thead>
          <tbody>
            {usersMissingHoursList()}
          </tbody>
        </table>
      </div>

      <Pagination
        size={paginationSize}
        className="list-pagination"
        numberOfItems={props.usersMissingHours.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

UsersMissingHoursList.propTypes = {
  usersMissingHours: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    missingHours: PropTypes.number,
  })).isRequired,
};

export default UsersMissingHoursList;
