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
                                <Button className="rounded bg-info">Update department</Button>
                            </Link>
                        </td>
                        <td>
                            <Button className="rounded bg-danger" onClick={() => props.toggleModal(props.department.name)}>
                                Delete department
                            </Button>
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