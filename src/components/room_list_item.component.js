import React from "react";

const RoomListItem = (props) => {
    return (
        <tr className="table-row">
            <td>{props.room.name}</td>
            <td>{props.room.capacity}</td>
            <td>{props.room.remainingCapacity}</td>
            <td>{props.room.type}</td>
        </tr>
    )
};

export default RoomListItem;