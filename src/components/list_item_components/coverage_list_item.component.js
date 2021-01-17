import React from "react";

const CoverageListItem = (props) => {

    return (
        <tr className="table-row">
            <td>{props.course.id}</td>
            <td>{props.course.name}</td>
            <td>{props.coverage}</td>
        </tr>
    )
};

export default CoverageListItem;