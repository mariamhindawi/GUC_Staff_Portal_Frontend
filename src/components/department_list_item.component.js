import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

const DepartmentListItem = (props) => {
    const match = useRouteMatch();

    const customButtons = () => {
        switch (props.role) {
            case "hr":
                return (
                    <>
                        <td>
                            <Link to={`${match.url}/update/${props.department.name}`}>
                                <button>Update department</button>
                            </Link>
                        </td>
                        <td>
                            <Link to={`${match.url}/delete/${props.department.name}`}>
                                <button>Delete department</button>
                            </Link>
                        </td>
                    </>
                );
            default: return <></>;
        }
    };

    return (
        <tr  className="table-row">
            <td>{props.department.name}</td>
            <td>{props.faculty !== "UNASSIGNED" ? props.faculty : "-"}</td>
            <td>{props.headOfDepartment !== "UNASSIGNED" ? props.headOfDepartment : "-"}</td>
            {customButtons()}
        </tr>
    )
};

export default DepartmentListItem;