import React, { useState } from 'react';
import CourseListItem from "./course_list_item.component";
import Pagination from "././pagination.component";
import {
  Col, Spinner,
  Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, FormText
} from "reactstrap";
import { NavLink } from "react-router-dom";

const CourseList = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  // Get current posts
 const indexOfLastPost = currentPage * postsPerPage;
 const indexOfFirstPost = indexOfLastPost - postsPerPage;
 const currentPosts = props.courses.slice(indexOfFirstPost, indexOfLastPost);
 // Change page
 const paginate = pageNumber => setCurrentPage(pageNumber);

  const courseList = () => {
    if (!props.courses) {
      return [];
    }
    return currentPosts.map((course, i) => {
      return <CourseListItem course={course} department={props.departments[i]} key={course._id} />
    });
  };
  if (props.courses.length == 0) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem><NavLink to="/staff/home">Home</NavLink></BreadcrumbItem>
            <BreadcrumbItem active>HOD Courses</BreadcrumbItem>
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
            <th>Course ID</th>
            <th>Course name</th>
            <th>Department</th>
            <th>Course coordinator</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {courseList()}
        </tbody>
      </table>
      <Pagination
       postsPerPage={postsPerPage}
       totalPosts={props.courses.length}
       paginate={paginate}
     />
      </div>

    );
  }
}

export default CourseList;