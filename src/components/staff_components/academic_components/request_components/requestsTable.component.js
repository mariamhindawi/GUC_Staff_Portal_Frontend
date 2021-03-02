import React, { useState } from "react";
import {
  Button, Table, Popover, PopoverBody, PopoverHeader, List
} from "reactstrap";
import Pagination from "../../../helper_components/Pagination";

const RequestsTableComponent = ({ requests, cancelRequest, acceptRequest, rejectRequest }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = requests.slice(indexOfFirstPost, indexOfLastPost);
  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
  const requestRows = requests.map(request => <RequestsTableRow key={request.id} request={request} cancelRequest={cancelRequest} acceptRequest={acceptRequest} rejectRequest={rejectRequest} />);

  return (
    <div style={{ width: "100%" }}>
      <table className="table">
        <thead className="table-head">
          <tr className="table-row">
            <th>ID</th>
            <th>Type</th>
            {cancelRequest ? null : <th>Requested by</th>}
            {cancelRequest ? <th>Status</th> : null}
            <th>Message</th>
            <th>Day</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {requestRows}
        </tbody>

      </table>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={requests.length}
        paginate={paginate}
      />
    </div>
  );
};
const RequestsTableRow = ({ request, cancelRequest, acceptRequest, rejectRequest }) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const toggle = () => setPopoverOpen(!popoverOpen);
  const requestDetails = Object.keys(request).filter(key => key !== "__v" && key !== "_id").map(key => <li key={request.id + key}>{`${key}: ${key === "day" ? request[key].split("T")[0] : key === "slots" ? request[key].map(slot => slot.slotNumber) : request[key]}`}</li>);

  return (
    <>
      <tr onClick={toggle} key={request.id}>
        <th><span id={`row${request.id}`}>{request.id}</span></th>
        <td>{request.type}</td>
        {cancelRequest ? null : <td>{request.requestedBy}</td>}
        {cancelRequest ? <td>{request.status}</td> : null}
        <td>{acceptRequest ? request.reason : request.type === "slotLinkingRequest" ? request.ccComment : request.HODComment}</td>
        <td>{request.type !== "slotLinkingRequest" && request.type !== "dayOffChangeRequest" ? request.day.split("T")[0] : null}</td>
        {cancelRequest && request.type !== "slotLinkingRequest" && request.type !== "dayOffChangeRequest"
                && new Date(request.day) > new Date()
                || cancelRequest && request.status === "Under review"
          ? <td><Button className="bg-danger" onClick={() => cancelRequest(request.id)}>Cancel</Button></td> : <td />}
        {acceptRequest ? <td><Button className="bg-success" onClick={() => acceptRequest(request.id)}>Accept</Button></td> : <td />}
        {rejectRequest ? <td><Button className="bg-danger" onClick={() => rejectRequest(request.id)}>Reject</Button></td> : <></>}
      </tr>
      <Popover
        placement="bottom"
        isOpen={popoverOpen}
        target={`row${request.id}`}
        toggle={toggle}
      >
        <PopoverHeader>
          Request
          {request.id}
        </PopoverHeader>
        <PopoverBody>
          <List type="unstyled">
            {requestDetails}
          </List>
        </PopoverBody>
      </Popover>
    </>
  );
};

export default RequestsTableComponent;
