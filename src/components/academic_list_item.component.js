import React from "react";
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";

const AcademicListItem = (props) => {
    return (
        <Router>
            <tr>
                <td>{props.academic.id}</td>
                <td>{props.academic.name}</td>
                <td>{props.department !== "UNASSIGNED" ? props.department : "-"}</td>
                <td>{props.room}</td>
                <td>{props.academic.salary}</td>
                <td>{props.academic.email}</td>
                <td><Link to="/hr-academics/academic" params={{id: props.id}}>View academic page</Link></td>
            </tr>
        </Router>
    )
};

export default AcademicListItem;