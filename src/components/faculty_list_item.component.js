import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { Button } from "reactstrap";

const FacultyListItem = (props) => {
    const match = useRouteMatch();

    const customButtons = () => {
        switch (props.role) {
            case "hr":
                return (
                    <>
                        <td>
                            <Link to={`${match.url}/update/${props.faculty.name}`}>
                                <Button className="bg-info">Update faculty</Button>
                            </Link>
                        </td>
                        <td>
                            <button  onClick={() => props.toggleModal(props.faculty.name)}>
                                Delete faculty
                            </button>
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