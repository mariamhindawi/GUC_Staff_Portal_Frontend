import React, { useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { Button } from "reactstrap";

const HrListItem = (props) => {
    const match = useRouteMatch();

    const customButtons = () => {
        switch (props.role) {
            case "hr":
                return (
                    <>
                        <td>
                            <Link to={`${match.url}/update/${props.hrmember.id}`}>
                                <Button className="bg-info">Update HR</Button>
                            </Link>
                        </td>
                        <td>
                            <Link to={`${match.url}/delete/${props.hrmember.id}`}>
                                <Button className="bg-danger">Delete HR</Button>
                            </Link>
                        </td>
                    </>
                );
            default: return <></>;
        }
    };
    return (
        <tr className="table-row">
            <td>{props.hrmember.id}</td>
            <td>{props.hrmember.name}</td>
            <td>{props.room}</td>
            <td>{props.hrmember.salary}</td>
            <td>{props.hrmember.email}</td>
            {customButtons()}
        </tr>
    )
  
 
};

export default HrListItem;