import React, { useState } from 'react';
import CourseSlotListItem from "./course_slot_list_item.component";
import Pagination from "././pagination.component";
import {
  Col, Spinner,
  Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, FormText
} from "reactstrap";
import { NavLink } from "react-router-dom";

const CourseSlotList = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  // Get current posts
 const indexOfLastPost = currentPage * postsPerPage;
 const indexOfFirstPost = indexOfLastPost - postsPerPage;
 const currentPosts = props.slots.slice(indexOfFirstPost, indexOfLastPost);
 // Change page
 const paginate = pageNumber => setCurrentPage(pageNumber);

  const courseSlotList = () => {
    if (!props.courses) {
      return [];
    }
    return currentPosts.map((slot, i) => {
      return <CourseSlotListItem slot={slot} course={props.courses[i]} room={props.rooms[i]} role={props.role} key={slot._id} />
    });
  };
  if (props.slots.length == 0) {
    return (
      <div className="container">
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
            <th>Course</th>
            <th>Day</th>
            <th>Slot Number</th>
            <th>Room</th>
            <th>Type</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {courseSlotList()}
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
export default CourseSlotList;