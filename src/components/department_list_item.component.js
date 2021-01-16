import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { Button } from "reactstrap";

const DepartmentListItem = (props) => {
    const match = useRouteMatch();

    const customButtons = () => {
        switch (props.role) {
            case "hr":
                return (
                    <>
                        <td>
                            <Link to={`${match.url}/update/${props.department.name}`}>
                                <Button className="bg-info">Update department</Button>
                            </Link>
                        </td>
                        <td>
                            <Link to={`${match.url}/delete/${props.department.name}`}>
                                <Button className="bg-danger">Delete department</Button>
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