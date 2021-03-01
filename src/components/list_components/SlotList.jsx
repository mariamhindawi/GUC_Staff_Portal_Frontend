import React, { useState } from "react";
import PropTypes from "prop-types";
import { useUserContext } from "../../contexts/UserContext";
import useListLayout from "../../hooks/ListLayout";
import SlotListItem from "../list_item_components/SlotListItem";
import Pagination from "../helper_components/Pagination";

function SlotList(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [listStyle, setListStyle] = useState("");
  const [paginationSize, setPaginationSize] = useState("");
  const user = useUserContext();

  useListLayout(setCurrentPage, setItemsPerPage, setPaginationSize, setListStyle,
    currentPage, props.slots);

  const customTableHeads = () => {
    switch (user.role) {
      case "Course Coordinator": return (
        <>
          <th style={{ width: "70px" }}> </th>
          <th style={{ width: "70px" }}> </th>
        </>
      );
      default: return null;
    }
  };
  const slotList = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = props.slots.slice(indexOfFirstItem, indexOfLastItem);

    if (props.slots.length === 0) {
      return <tr><td className="no-items">No Slots</td></tr>;
    }
    return currentItems.map(slot => (
      <SlotListItem
        key={slot._id}
        slot={slot}
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
              <th style={{ width: "150px" }}>Day</th>
              <th style={{ width: "170px" }}>Slot Number</th>
              <th style={{ width: "150px" }}>Room</th>
              <th style={{ width: "150px" }}>Type</th>
              <th style={{ width: "150px" }}>Course</th>
              <th style={{ width: "150px" }}>Academic Member</th>
              {customTableHeads()}
            </tr>
          </thead>
          <tbody>
            {slotList()}
          </tbody>
        </table>
      </div>

      <Pagination
        size={paginationSize}
        className="list-pagination"
        numberOfItems={props.slots.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

SlotList.propTypes = {
  slots: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    day: PropTypes.string,
    slotNumber: PropTypes.string,
    room: PropTypes.string,
    course: PropTypes.string,
    staffMember: PropTypes.string,
    type: PropTypes.string,
  })).isRequired,
  toggleDeleteModal: PropTypes.func,
};

SlotList.defaultProps = {
  toggleDeleteModal: () => {},

};

export default SlotList;
