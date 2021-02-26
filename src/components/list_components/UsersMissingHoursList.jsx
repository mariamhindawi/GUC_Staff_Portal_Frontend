import React, { useState } from "react";
import PropTypes from "prop-types";
import useListLayout from "../../hooks/ListLayout";
import UsersMissingHoursListItem from "../list_item_components/UsersMissingHoursListItem";
import Pagination from "../helper_components/Pagination";

function UsersMissingHoursList(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [listStyle, setListStyle] = useState("");
  const [paginationSize, setPaginationSize] = useState("");

  useListLayout(setCurrentPage, setItemsPerPage, setPaginationSize, setListStyle,
    currentPage, props.usersMissingHours);

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
