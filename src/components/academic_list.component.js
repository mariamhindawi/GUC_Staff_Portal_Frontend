import React from "react";
import AcademicListItem from "././academic_list_item.component";

const AcademicList = (props) => {

    const academicList = () => {
        if (!props.academics) {
          return [];
        }
        return props.academics.map((academic, i) => {
            return <AcademicListItem academic={academic} department={props.departments[i]} room={props.rooms[i]} key={academic.id} />
        });
    };

    return (
      <table className="table">
          <thead className="thead-light">
              <tr>
                <th>ID</th>
                <th>name</th>
                <th>Department</th>
                <th>Office</th>
                <th>Salary</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              { academicList() }
            </tbody>
      </table>
    );
}

export default AcademicList;