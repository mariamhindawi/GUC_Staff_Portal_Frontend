import React, { useState } from "react";
import CoverageListItem from "./coverage_list_item.component";
import Pagination from "././pagination.component";

import {
  Col, Spinner,
  Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, FormText
} from "reactstrap";
import { NavLink } from "react-router-dom";

const CoverageList = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = props.courses.slice(indexOfFirstPost, indexOfLastPost);
  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const coverageList = () => {
    if (props.courses.length === 0) {
      return (<tr className="no-items">No Items</tr>)
    }
    return currentPosts.map((course, i) => {
      return <CoverageListItem course={course} coverage={props.coverages[i]} key={course._id} />
    });
  };
  if (props.loading) {
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
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={props.courses.length}
          paginate={paginate}
        />
      </div>
    );
  }
}
export default CoverageList;