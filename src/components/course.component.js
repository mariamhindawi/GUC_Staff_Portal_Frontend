import React from "react";

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
            <button>View course instructors</button>
            <br/><br/>
            <button>View teaching assistants</button>
        </div>
    )
};

export default Course;