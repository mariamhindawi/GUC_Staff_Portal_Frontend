import React,{useState} from "react";
import HrListItem from "././hr_list_item.component";
import Pagination from "././pagination.component";
import {
  Col, Spinner,
  Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, FormText
} from "reactstrap";
import { NavLink } from "react-router-dom";

const HrList = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  // Get current posts
 const indexOfLastPost = currentPage * postsPerPage;
 const indexOfFirstPost = indexOfLastPost - postsPerPage;
 const currentPosts = props.hrmembers.slice(indexOfFirstPost, indexOfLastPost);
 // Change page
 const paginate = pageNumber => setCurrentPage(pageNumber);

  const hrList = () => {
    if (!props.hrmembers) {
      return [];
    }

    return currentPosts.map((hrmember, i) => {
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
    <div>
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
      <Pagination
      postsPerPage={postsPerPage}
      totalPosts={props.hrmembers.length}
      paginate={paginate}
    />
    </div>
    );
  }
}
export default HrList;