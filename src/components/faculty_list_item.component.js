import React from "react";

const FacultyListItem = (props) => {
    return (
        <tr>
            <td>{props.faculty.name}</td>
        </tr>
    );
};

export default FacultyListItem;