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
                                <button>Update Academic</button>
                            </Link>
                        </td>
                        <td>
                            <Link to={`${match.url}/delete/${props.academic.id}`}>
                                <button>Delete Academic</button>
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
            <td>{props.academic.salary}</td>
            <td>{props.academic.email}</td>
            <td><Button className="rounded">View Academic</Button></td>
            {customButtons()}
            
        </tr>
    )
};

export default AcademicListItem;