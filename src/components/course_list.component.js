import React from "react";
import CourseListItem from "./course_list_item.component";

const CourseList = (props) => {

    const courseList = () => {
        if (!props.courses) {
          return [];
        }
        return props.courses.map((course, i) => {
            return <CourseListItem course={course} department={props.departments[i]} key={course._id} />
        });
    };

    return (
      <table className="table">
          <thead className="thead-light">
              <tr>
                <th>Course ID</th>
                <th>Course name</th>
                <th>Department</th>
                <th>Course coordinator</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              { courseList() }
            </tbody>
      </table>
    );
}

export default CourseList;