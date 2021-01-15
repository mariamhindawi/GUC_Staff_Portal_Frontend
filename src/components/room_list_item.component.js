import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

const RoomListItem = (props) => {
    const match = useRouteMatch();

    const customButtons = () => {
        switch (props.role) {
            case "hr":
                return (
                    <>
                        <td>
                            <Link to={`${match.url}/update/${props.room.name}`}>
                                <button>Update room</button>
                            </Link>
                        </td>
                        <td>
                            <Link to={`${match.url}/delete/${props.room.name}`}>
                                <button>Delete room</button>
                            </Link>
                        </td>
                    </>
                );
            default: return <></>;
        }
    };
if(!props.room){

    return (
        <tr className="table-row">
            <td>{props.room.name}</td>
            <td>{props.room.capacity}</td>
            <td>{props.room.remainingCapacity}</td>
            <td>{props.room.type}</td>
            {customButtons()}
        </tr>
    )
}
else{
    return( <tr className="no-items">No Items</tr>)
}
};

export default RoomListItem;