import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { Button } from "reactstrap";

const RoomListItem = (props) => {
    const match = useRouteMatch();

    const customButtons = () => {
        switch (props.role) {
            case "hr":
                return (
                    <>
                        <td>
                            <Link to={`${match.url}/update/${props.room.name}`}>
                                <button>Update Room</button>
                            </Link>
                        </td>
                        <td>
                            <button onClick={() => props.toggleModal(props.room.name)}>
                                Delete Room
                            </button>
                        </td>
                    </>
                );
            default: return <></>;
        }
    };

    return (
        <tr className="table-row">
            <td>{props.room.name}</td>
            <td>{props.room.capacity}</td>
            <td>{props.room.remainingCapacity}</td>
            <td>{props.room.type}</td>
            {customButtons()}
        </tr>
    )
};

export default RoomListItem;