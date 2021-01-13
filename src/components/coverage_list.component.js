import React from "react";
import CoverageListItem from "./coverage_list_item.component";
import {
  Col, Spinner,
  Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, FormText
} from "reactstrap";
import { NavLink } from "react-router-dom";

const CoverageList = (props) => {

  const coverageList = () => {
    if (!props.courses) {
      return [];
    }

    return props.courses.map((course, i) => {
      return <CoverageListItem course={course} coverage={props.coverages[i]} key={course._id} />
    });
  };
  if (props.courses.length == 0) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem><NavLink to="/staff/home">Home</NavLink></BreadcrumbItem>
            <BreadcrumbItem active>Course coverages</BreadcrumbItem>
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
            <th>Course ID</th>
            <th>Course Name</th>
            <th>Coverage</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {coverageList()}
        </tbody>
      </table>
    );
  }
}
export default CoverageList;