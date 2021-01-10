import React from "react";
import RoomListItem from "./course_list_item.component";

const RoomList = (props) => {

    const roomList = () => {
        if (!props.rooms) {
          return [];
        }
        return props.rooms.map((room) => {
            return <RoomListItem room={room} key={room._id} />
        });
    };

    console.log(props);

    return (
      <table className="table">
          <thead className="thead-light">
              <tr>
                <th>Name</th>
                <th>Capacity</th>
                <th>Remaining Capacity</th>
                <th>Type</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              { roomList() }
            </tbody>
      </table>
    );
}

export default RoomList;