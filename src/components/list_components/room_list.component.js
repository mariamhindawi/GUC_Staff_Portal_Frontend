import React, { useState } from "react";
import RoomListItem from "../list_item_components/room_list_item.component";
import Pagination from "../todo/pagination.component";

const RoomList = (props) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = props.rooms.slice(indexOfFirstPost, indexOfLastPost);
  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const roomList = () => {
    if (props.rooms.length === 0) {
      return (<tr className="no-items">No Items</tr>)
    }

    return currentPosts.map((room) => {
      return <RoomListItem room={room} key={room._id} role={props.role} toggleModal={props.toggleModal}/>
    });
  };

  const customTableHeads = () => {
    switch (props.role) {
      case "hr":
        return (
          <>
            <th />
            <th />
          </>
        );
      default: return <></>;
    }
  };

  return (
    <div>
      <table className="table">
        <thead className="table-head">
          <tr className="table-row">
            <th>Name</th>
            <th>Capacity</th>
            <th>Remaining Capacity</th>
            <th>Type</th>
            {customTableHeads()}
          </tr>
        </thead>
        <tbody>
          {roomList()}
        </tbody>
      </table>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={props.rooms.length}
        paginate={paginate}
      />
    </div>
  );
}

export default RoomList;