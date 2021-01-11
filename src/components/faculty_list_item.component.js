import React from "react";
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";

const FacultyListItem = (props) => {

    return (
        <tr>
            <td>{props.faculty.name}</td>
        </tr>
    )
};

export default FacultyListItem;