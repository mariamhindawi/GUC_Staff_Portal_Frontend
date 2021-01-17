import React from "react";
import { Button } from "reactstrap";

const Course = (props) => {

    return (
        <div>
            <h6>Course ID:</h6>
            <p>{props.course.id}</p>
            <h6>Course name:</h6>
            <p>{props.course.name}</p>
            <h6>Course department:</h6>
            <p>{props.department.name}</p>
            <h6>Course coordinator:</h6>
            <p>{props.course.courseCoordinator}</p>
            <Button className="bg-info">View course instructors</Button>
            <br /><br />
            <Button className="bg-info">View teaching assistants</Button>
        </div>
    )
};

export default Course;