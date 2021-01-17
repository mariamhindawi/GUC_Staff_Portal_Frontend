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
                                <Button className="rounded bg-info">Update Academic</Button>
                            </Link>
                        </td>
                        <td>
                            <Link to={`${match.url}/delete/${props.academic.id}`}>
                                <Button className="rounded bgg-danger">Delete Academic</Button>
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