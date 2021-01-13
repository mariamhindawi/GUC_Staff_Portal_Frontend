import React, { useState } from 'react';
import DepartmentListItem from "./department_list_item.component";
import Pagination from "././pagination.component";

import {
  Col, Spinner,
  Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, FormText
} from "reactstrap";
import { NavLink } from "react-router-dom";

const DepartmentList = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = props.departments.slice(indexOfFirstPost, indexOfLastPost);
 // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const departmentList = () => {
    if (!props.departments) {
      return [];
    }

    return currentPosts.map((department, i) => {
      return <DepartmentListItem department={department} faculty={props.faculties[i]} headOfDepartment={props.heads[i]}
        key={department._id} />
    });
  };
  if (props.departments.length == 0) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem><NavLink to="/staff/home">Home</NavLink></BreadcrumbItem>
            <BreadcrumbItem active>Departments</BreadcrumbItem>
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
     <div>
        <table className="table">
        <thead className="table-head">
          <tr className="table-row">
            <th>Name</th>
            <th>Faculty</th>
            <th>Head of Department</th>
          </tr>
        </thead>
        <tbody>
          {departmentList()}
        </tbody>
        <Pagination
       postsPerPage={postsPerPage}
       totalPosts={props.departments.length}
       paginate={paginate}
     />
      </table>
     </div>
    );
  }
}

export default DepartmentList;