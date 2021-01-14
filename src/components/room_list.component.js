import React,{useState} from "react";
import RoomListItem from "./room_list_item.component";
import Pagination from "././pagination.component";
import {
  Col, Spinner,
  Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, FormText
} from "reactstrap";
import { NavLink } from "react-router-dom";

const RoomList = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  // Get current posts
 const indexOfLastPost = currentPage * postsPerPage;
 const indexOfFirstPost = indexOfLastPost - postsPerPage;
 const currentPosts = props.rooms.slice(indexOfFirstPost, indexOfLastPost);
 // Change page
 const paginate = pageNumber => setCurrentPage(pageNumber);

  const roomList = () => {
   
    if (!props.rooms) {
      return [];
    }

    return currentPosts.map((room) => {
      return <RoomListItem room={room} key={room._id} role={props.role}/>
    });
  };
  if (props.rooms.length == 0) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem><NavLink to="/staff/home">Home</NavLink></BreadcrumbItem>
            <BreadcrumbItem active>Rooms</BreadcrumbItem>
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
  return (
    <div>
    <table className="table">
      <thead className="table-head">
        <tr className="table-row">
          <th>Name</th>
          <th>Capacity</th>
          <th>Remaining Capacity</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        {roomList()}
      </tbody>
    </table>
    <Pagination
    postsPerPage={postsPerPage}
    totalPosts={props.rooms.length}
    paginate={paginate}
  />
  </div>
  );
}

export default RoomList;