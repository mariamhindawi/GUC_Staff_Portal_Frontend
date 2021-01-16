import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

const AcademicListItem = (props) => {
    const match = useRouteMatch();

    const customButtons = () => {
        switch (props.role) {
            case "hr":
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