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
                                <button>Update Hr</button>
                            </Link>
                        </td>
                        <td>
                            <Link to={`${match.url}/delete/${props.hrmember.id}`}>
                                <button>Delete Hr</button>
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
  }
  else{
    return( <tr className="no-items">No Items</tr>)
  }
};

export default HrListItem;