import React, { useState } from "react";
import PropTypes from "prop-types";
import { useUserContext } from "../../contexts/UserContext";
import useListLayout from "../../hooks/ListLayout";
import RequestListItem from "../list_item_components/RequestListItem";
import Pagination from "../helper_components/Pagination";

function RequestList(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [listStyle, setListStyle] = useState("");
  const [paginationSize, setPaginationSize] = useState("");
  const user = useUserContext();

  useListLayout(setCurrentPage, setItemsPerPage, setPaginationSize, setListStyle,
    currentPage, props.requests);

  const requestList = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = props.requests.slice(indexOfFirstItem, indexOfLastItem);

    if (props.requests.length === 0) {
      return <tr><td className="no-items">No Requests</td></tr>;
    }
    return currentItems.map(request => (
      <RequestListItem
        key={request._id}
        request={request}
        toggleDeleteModal={props.toggleDeleteModal}
        requestType={props.requestType}
        requestFilter={props.requestFilter}
        acceptReplacement={props.acceptReplacement}
        rejectReplacement={props.rejectReplacement}
        hodAcceptRequest={props.hodAcceptRequest}
        hodRejectRequest={props.hodRejectRequest}
        ccAcceptRequest={props.ccAcceptRequest}
        ccRejectRequest={props.ccRejectRequest}
      />
    ));
  };
  const customTableHeads = () => {
    if (user.role === "Head of Department" && props.requestType !== "Leave requests" && props.requestType !== "Replacement requests") {
      return (
        <>
          <th style={{ width: "100px" }}>Requested by</th>
          <th style={{ width: "70px" }}> </th>
          <th style={{ width: "70px" }}> </th>

        </>
      );
    }
    if (user.role === "Course Coordinator" && props.requestType !== "Leave requests" && props.requestType !== "Replacement requests") {
      return (
        <>
          <th style={{ width: "100px" }}>Requested by</th>
          <th style={{ width: "70px" }}> </th>
          <th style={{ width: "70px" }}> </th>

        </>
      );
    }
    if (props.requestType === "Leave requests") {
      return (
        <>
          <th style={{ width: "100px" }}>Status</th>
          <th style={{ width: "70px" }}> </th>
        </>
      );
    }

    if (props.requestFilter === "Sent") {
      return (
        <>
          <th style={{ width: "100px" }}>Status</th>
          <th style={{ width: "70px" }}> </th>
        </>
      );
    }

    return (
      <>
        <th style={{ width: "100px" }}>Requested by</th>
        <th style={{ width: "70px" }}> </th>
        <th style={{ width: "70px" }}> </th>

      </>
    );
  };
  return (
    <>
      <div className="list-container">
        <table className={`list ${listStyle}`}>
          <thead>
            <tr>
              <th style={{ width: "120px" }}>ID</th>
              <th style={{ width: "150px" }}>Request Type</th>
              <th style={{ width: "150px" }}>Message</th>
              <th style={{ width: "100px" }}>Day</th>
              {customTableHeads()}
            </tr>
          </thead>
          <tbody>
            {requestList()}
          </tbody>
        </table>
      </div>

      <Pagination
        size={paginationSize}
        className="list-pagination"
        numberOfItems={props.requests.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

RequestList.propTypes = {
  requestType: PropTypes.string.isRequired,
  requestFilter: PropTypes.string.isRequired,
  requests: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    id: PropTypes.number,
    type: PropTypes.string,
    status: PropTypes.string,
    reason: PropTypes.string,
    day: PropTypes.string,
  })).isRequired,
  toggleDeleteModal: PropTypes.func,
  acceptReplacement: PropTypes.func,
  rejectReplacement: PropTypes.func,
  hodAcceptRequest: PropTypes.func,
  hodRejectRequest: PropTypes.func,
  ccAcceptRequest: PropTypes.func,
  ccRejectRequest: PropTypes.func,

};

RequestList.defaultProps = {
  toggleDeleteModal: () => {},
  acceptReplacement: () => {},
  rejectReplacement: () => {},
  hodAcceptRequest: () => {},
  hodRejectRequest: () => {},
  ccAcceptRequest: () => {},
  ccRejectRequest: () => {},

};

export default RequestList;
