import React, { useState } from "react";
import PropTypes from "prop-types";
import { useUserContext } from "../../contexts/UserContext";
import useListLayout from "../../hooks/ListLayout";
import RoomListItem from "../list_item_components/RoomListItem";
import Pagination from "../helper_components/Pagination";

function RoomList(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [listStyle, setListStyle] = useState("");
  const [paginationSize, setPaginationSize] = useState("");
  const user = useUserContext();

  useListLayout(setCurrentPage, setItemsPerPage, setPaginationSize, setListStyle,
    currentPage, props.rooms);

  const customTableHeads = () => {
    switch (user.role) {
      case "HR": return (
        <>
          <th style={{ width: "70px" }}> </th>
          <th style={{ width: "70px" }}> </th>
        </>
      );
      default: return null;
    }
  };
  const roomList = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = props.rooms.slice(indexOfFirstItem, indexOfLastItem);

    if (props.rooms.length === 0) {
      return <tr><td className="no-items">No Rooms</td></tr>;
    }
    return currentItems.map(room => (
      <RoomListItem
        key={room._id}
        room={room}
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
              <th style={{ width: "150px" }}>Name</th>
              <th style={{ width: "200px" }}>Type</th>
              <th style={{ width: "100px" }}>Capacity</th>
              <th style={{ width: "100px" }}>Remaining Capacity</th>
              {customTableHeads()}
            </tr>
          </thead>
          <tbody>
            {roomList()}
          </tbody>
        </table>
      </div>

      <Pagination
        size={paginationSize}
        className="list-pagination"
        numberOfItems={props.rooms.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

RoomList.propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    capacity: PropTypes.number,
    remainingCapacity: PropTypes.number,
  })).isRequired,
  toggleDeleteModal: PropTypes.func,
};

RoomList.defaultProps = {
  toggleDeleteModal: () => {},
};

export default RoomList;
