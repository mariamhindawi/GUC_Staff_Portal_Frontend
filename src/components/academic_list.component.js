import React from "react";
import AcademicListItem from "././academic_list_item.component";
import {
  Col, Spinner,
  Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, FormText
} from "reactstrap";
import { NavLink } from "react-router-dom";

const AcademicList = (props) => {

  const academicList = () => {
    if (!props.academics) {
      return [];
    }

    return props.academics.map((academic, i) => {
      return <AcademicListItem academic={academic} department={props.departments[i]} room={props.rooms[i]} key={academic.id} />
    });
  };
  if (props.academics.length == 0) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem><NavLink to="/staff/home">Home</NavLink></BreadcrumbItem>
            <BreadcrumbItem active>Academics</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="row mt-10">
          <Col xs={{ offset: 6 }}>
            <br />
            <br />
            <br />
            <Spinner color="primary" />
          </Col>
        </div>
      </div>
    )
  }
  else {

    return (
      <table className="table">
        <thead className="table-head">
          <tr className="table-row">
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Office</th>
            <th>Salary</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {academicList()}
        </tbody>
      </table>
    );
  }
}
export default AcademicList;