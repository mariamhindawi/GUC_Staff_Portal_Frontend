import React, { useState } from 'react';
import FacultyListItem from "./faculty_list_item.component";
import Pagination from "././pagination.component";
import {
  Col, Spinner,
  Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, FormText
} from "reactstrap";
import { NavLink } from "react-router-dom";

const FacultyList = (props) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPosts = props.faculties.slice(indexOfFirstPost, indexOfLastPost);
 // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const facultyList = () => {
    
    if (!props.faculties) {
      return [];
    }

    return props.faculties.map((faculty) => {
      return <FacultyListItem faculty={faculty} role={props.role} key={faculty._id} />
    });
  };
  console.log(props.faculties);
  if (props.faculties.length == 0) {
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
            <th>Faculty Name</th>
          </tr>
        </thead>
        <tbody>
          {facultyList()}
        </tbody>
      </table>
      <Pagination
       postsPerPage={postsPerPage}
       totalPosts={props.faculties.length}
       paginate={paginate}
     />
  </div>
    );
  }
}
export default FacultyList;