import React from "react";
import PropTypes from "prop-types";
import DeleteButton from "../button_components/DeleteButton";
import AcceptButton from "../button_components/AcceptButton";
import RejectButton from "../button_components/RejectButton";
import { useUserContext } from "../../contexts/UserContext";

function RequestListItem(props) {
  const user = useUserContext();

  const customData = () => {
    if (user.role === "Head of Department") {
      return (
        <>
          <td>{props.request.requestedBy}</td>
          <td>
            <AcceptButton onClick={() => { props.hodAcceptRequest(props.request.id); }} />
          </td>
          <td>
            <RejectButton onClick={() => { props.hodRejectRequest(props.request.id); }} />
          </td>
        </>
      );
    }
    if (user.role === "Course Coordinator") {
      return (
        <>
          <td>{props.request.requestedBy}</td>
          <td>
            <AcceptButton onClick={() => { props.ccAcceptRequest(props.request.id); }} />
          </td>
          <td>
            <RejectButton onClick={() => { props.ccRejectRequest(props.request.id); }} />
          </td>
        </>
      );
    }
    if (props.requestType === "Leave requests") {
      return (
        <>
          <td>{props.request.status}</td>
          <td>
            {props.request.status === "Pending"
              ? <DeleteButton onClick={() => { props.toggleDeleteModal(props.request.id); }} />
              : <></>}
          </td>
        </>
      );
    }

    if (props.requestFilter === "Sent") {
      return (
        <>
          <td>{props.request.status}</td>
          <td>
            {props.request.status === "Pending"
              ? <DeleteButton onClick={() => { props.toggleDeleteModal(props.request.id); }} />
              : <></>}
          </td>
        </>
      );
    }

    return (
      <>
        <td>{props.request.requestedBy}</td>
        <td>
          <AcceptButton onClick={() => { props.acceptReplacement(props.request.id); }} />
        </td>
        <td>
          <RejectButton onClick={() => { props.rejectReplacement(props.request.id); }} />
        </td>
      </>
    );
  };

  return (
    <tr>
      <td>{props.request.id}</td>
      <td>{props.request.type}</td>
      <td>
        {props.request.type === "replacementRequest" ? props.request.reason : <>-</> }
        {props.request.type === "slotLinkingRequest" ? props.request.ccComment : props.request.HODComment}
      </td>
      <td>{props.request.type !== "slotLinkingRequest" && props.request.type !== "dayOffChangeRequest" ? props.request.day.split("T")[0] : <>-</>}</td>
      {customData()}
    </tr>
  );
}

RequestListItem.propTypes = {
  requestType: PropTypes.string.isRequired,
  requestFilter: PropTypes.string.isRequired,
  request: PropTypes.shape({
    _id: PropTypes.string,
    id: PropTypes.number,
    type: PropTypes.string,
    status: PropTypes.string,
    reason: PropTypes.string,
    day: PropTypes.string,
    requestedBy: PropTypes.string,
    HODComment: PropTypes.string,
    ccComment: PropTypes.string,
  }).isRequired,
  toggleDeleteModal: PropTypes.func,
  acceptReplacement: PropTypes.func,
  rejectReplacement: PropTypes.func,
  hodAcceptRequest: PropTypes.func,
  hodRejectRequest: PropTypes.func,
  ccAcceptRequest: PropTypes.func,
  ccRejectRequest: PropTypes.func,

};

RequestListItem.defaultProps = {
  toggleDeleteModal: () => {},
  acceptReplacement: () => {},
  rejectReplacement: () => {},
  hodAcceptRequest: () => {},
  hodRejectRequest: () => {},
  ccAcceptRequest: () => {},
  ccRejectRequest: () => {},

};

export default RequestListItem;
