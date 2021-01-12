import React from "react";
import HrListItem from "././hr_list_item.component";
import {
  Col, Spinner,
  Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, FormText
} from "reactstrap";
import { NavLink } from "react-router-dom";

const HrList = (props) => {

  const hrList = () => {
    if (!props.hrmembers) {
      return [];
    }

    return props.hrmembers.map((hrmember, i) => {
      return <HrListItem hrmember={hrmember} room={props.rooms[i]} key={hrmember.id} />
    });
  };
  if (props.hrmembers.length == 0) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem><NavLink to="/staff/home">Home</NavLink></BreadcrumbItem>
            <BreadcrumbItem active>HR Members</BreadcrumbItem>
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
            <th>name</th>
            <th>Office</th>
            <th>Salary</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {hrList()}
        </tbody>
      </table>
    );
  }
}
export default HrList;