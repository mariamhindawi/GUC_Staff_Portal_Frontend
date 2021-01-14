import React, { useState } from 'react';
import AcademicListItem from "././academic_list_item.component";
import Pagination from "././pagination.component";
import {
  Col, Spinner,
  Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, FormText
} from "reactstrap";
import { NavLink } from "react-router-dom";

const AcademicList = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  // Get current posts
 const indexOfLastPost = currentPage * postsPerPage;
 const indexOfFirstPost = indexOfLastPost - postsPerPage;
 const currentPosts = props.academics.slice(indexOfFirstPost, indexOfLastPost);
 // Change page
 const paginate = pageNumber => setCurrentPage(pageNumber);

  const academicList = () => {
    if (!props.academics) {
      return [];
    }
    return currentPosts.map((academic, i) => {
      return <AcademicListItem academic={academic} department={props.departments[i]} room={props.rooms[i]} role={props.role} key={academic.id} />
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
      <div>
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
    <Pagination
    postsPerPage={postsPerPage}
    totalPosts={props.academics.length}
    paginate={paginate}
  />
  </div>
      
    );
  }
}
export default AcademicList;