import React from "react";
import { Button } from "reactstrap";

const CourseListItem = (props) => {

    if(props.course){
    return (
        <tr className="table-row">
            <td>{props.course.id}</td>
            <td>{props.course.name}</td>
            <td>{props.department.name}</td>
            <td>{props.course.courseCoordinator !== "UNASSIGNED" ? props.course.courseCoordinator : "-"}</td>
            <td><Button className="rounded">View Course</Button></td>
        </tr>
    )
    }
    else{
        return( <tr className="no-items">No Items</tr>)
     }
};

export default CourseListItem;