import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { Button } from "reactstrap";

const CourseSlotListItem = (props) => {
    const match = useRouteMatch();

    const customButtons = () => {
        switch (props.role) {
            case "cc":
                return (
                    <>
                        <td>
                            <Link to={`${match.url}/update/${props.academic.id}`}>
                                <button className="rounded">Update Academic</button>
                            </Link>
                        </td>
                        <td>
                            <Link to={`${match.url}/delete/${props.academic.id}`}>
                                <button className="rounded">Delete Academic</button>
                            </Link>
                        </td>
                    </>
                );
            default: return <></>;
        }
    };
    return (
        <tr className="table-row">
            <td>{props.course}</td>
            <td>{props.slot.day}</td>
            <td>{props.slot.slotNumber}</td>
            <td>{props.room}</td>
            <td>{props.slot.type}</td>
            {customButtons()}
            
        </tr>
    )
};

export default CourseSlotListItem;