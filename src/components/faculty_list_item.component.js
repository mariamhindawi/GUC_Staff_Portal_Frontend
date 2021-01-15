import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

const FacultyListItem = (props) => {
    const match = useRouteMatch();

    const customButtons = () => {
        switch (props.role) {
            case "hr":
                return (
                    <>
                        <td>
                            <Link to={`${match.url}/update/${props.faculty.name}`}>
                                <button>Update faculty</button>
                            </Link>
                        </td>
                        <td>
                            <Link to={`${match.url}/delete/${props.faculty.name}`}>
                                <button>Delete faculty</button>
                            </Link>
                        </td>
                    </>
                );
            default: return <></>;
        }
    };

    return (
        <tr className="table-row">
            <td>{props.faculty.name}</td>
            {customButtons()}
        </tr>
    );
};

export default FacultyListItem;