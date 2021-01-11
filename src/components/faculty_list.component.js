import React from "react";
import FacultyListItem from "./faculty_list_item.component";

const FacultyList = (props) => {

    const facultyList = () => {
        if (!props.faculties) {
          return [];
        }
        return props.faculties.map((faculty) => {
            return <FacultyListItem faculty={faculty} key={faculty._id} />
        });
    };

    console.log(props);

    return (
      <table className="table">
          <thead className="thead-light">
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              { facultyList() }
            </tbody>
      </table>
    );
}

export default FacultyList;