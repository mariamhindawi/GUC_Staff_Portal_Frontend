import React from "react";
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";

const RoomListItem = (props) => {

    return (
        <tr>
            <td>{props.room.name}</td>
            <td>{props.room.capacity}</td>
            <td>{props.room.remainingCapacity}</td>
            <td>{props.room.type}</td>
        </tr>
    )
};

export default RoomListItem;