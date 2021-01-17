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
                                <Button className="rounded bg-secondary">Update Room</Button>
                            </Link>
                        </td>
                        <td>
                            <Button className="rounded bg-danger" onClick={() => props.toggleModal(props.room.name)}>
                                Delete Room
                            </Button>
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