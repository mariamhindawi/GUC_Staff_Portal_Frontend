import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { Button } from "reactstrap";

const CourseListItem = (props) => {
    const match = useRouteMatch();

    const customButtons = () => {
        switch (props.role) {
            case "hr":
                return (
                    <>
                        <td>
                            <Link to={`${match.url}/update/${props.course.id}`}>
                                <button>Update course</button>
                            </Link>
                        </td>
                        <td>
                            <Link to={`${match.url}/delete/${props.course.id}`}>
                                <button>Delete course</button>
                            </Link>
                        </td>
                    </>
                );
            case "hod":
                return (
                    <>
                        <td>
                            <Link to={`${match.url}/assign-ci/${props.course.id}`}>
                                <button>Assign Course Instructor</button>
                            </Link>
                        </td>
                        <td>
                            <Link to={`${match.url}/delete-ci/${props.course.id}`}>
                                <button>Delete Course Instructor</button>
                            </Link>
                        </td>
                    </>
                );
            case "ci":
                return (
                    <>
                        <td>
                            <Link to={`${match.url}/assign-cc/${props.course.id}`}>
                                <button>Assign Course Coordinator</button>
                            </Link>
                        </td>
                        <td>
                            <Link to={`${match.url}/assign-ta/${props.course.id}`}>
                                <button>Assign TA</button>
                            </Link>
                        </td>
                        <td>
                            <Link to={`${match.url}/delete-ta/${props.course.id}`}>
                                <button>Delete TA</button>
                            </Link>
                        </td>
                    </>
                );
            default: return <></>;
        }
    };

    return (
        <tr className="table-row">
            <td>{props.course.id}</td>
            <td>{props.course.name}</td>
            <td>{props.department}</td>
            <td>{props.course.courseCoordinator !== "UNASSIGNED" ? props.course.courseCoordinator : "-"}</td>
            <td><Button className="rounded">View Course</Button></td>
            {customButtons()}
        </tr>
    )
};

export default CourseListItem;