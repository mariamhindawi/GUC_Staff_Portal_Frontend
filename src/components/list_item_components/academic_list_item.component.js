import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { Button } from "reactstrap";

const AcademicListItem = (props) => {
    const match = useRouteMatch();

    const customButtons = () => {
        switch (props.role) {
            case "hr":
                return (
                    <>
                        <td>
                            <Link to={`${match.url}/update/${props.academic.id}`}>
                                <Button className="rounded bg-info">Update Academic</Button>
                            </Link>
                        </td>
                        <td>
                            <Button className="rounded bg-danger" onClick={() => props.toggleModal(props.academic.id)}>
                                Delete Academic
                            </Button>
                        </td>
                    </>
                );
            default: return <></>;
        }
    };

    return (
        <tr className="table-row">
            <td>{props.academic.id}</td>
            <td>{props.academic.name}</td>
            <td>{props.department !== "UNASSIGNED" ? props.department : "-"}</td>
            <td>{props.room}</td>
            <td>{props.academic.dayOff}</td>
            <td>{props.academic.email}</td>
            {customButtons()}
        </tr>
    )
};

export default AcademicListItem;