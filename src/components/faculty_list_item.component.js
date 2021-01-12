import React from "react";

const FacultyListItem = (props) => {
    return (
        <tr className="table-row">
            <td>{props.faculty.name}</td>
        </tr>
    );
};

export default FacultyListItem;