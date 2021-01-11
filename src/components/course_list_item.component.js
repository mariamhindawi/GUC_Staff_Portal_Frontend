import React from "react";

const CourseListItem = (props) => {

    return (
        <tr>
            <td>{props.course.id}</td>
            <td>{props.course.name}</td>
            <td>{props.department.name}</td>
            <td>{props.course.courseCoordinator !== "UNASSIGNED" ? props.course.courseCoordinator : "-"}</td>
            <td><button>Go to course page</button></td>
        </tr>
    )
};

export default CourseListItem;