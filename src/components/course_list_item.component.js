import React from "react";
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";

const CourseListItem = (props) => {

    return (
        <tr className="table-row">
            <td>{props.course.id}</td>
            <td>{props.course.name}</td>
            <td>{props.department.name}</td>
            <td>{props.course.courseCoordinator !== "UNASSIGNED" ? props.course.courseCoordinator : "-"}</td>
            <td><button className="rounded pl-2 pr-2">View Course</button></td>
        </tr>
    )
};

export default CourseListItem;