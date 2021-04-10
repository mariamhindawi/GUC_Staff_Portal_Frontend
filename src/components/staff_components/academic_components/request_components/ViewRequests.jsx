import React, { useState } from "react";
import PropTypes from "prop-types";
import Axios from "axios";
import AxiosInstance from "../../../../others/AxiosInstance";
import AuthTokenManager from "../../../../others/AuthTokenManager";
import useAxiosCancel from "../../../../hooks/AxiosCancel";
import Spinner from "../../../helper_components/Spinner";
import DeleteModal from "../../../helper_components/DeleteModal";
import RequestList from "../../../list_components/RequestList";

function ViewRequests(props) {
  const [requestToDelete, setRequestToDelete] = useState("");
  const [deleteModalIsOpen, setDeleteModalOpen] = useState(false);
  const [deleteModalState, setDeleteModalState] = useState("will submit");
  const [deleteModalMessage, setDeleteModalMessage] = useState({ messageText: "", messageStyle: "" });
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

  const acceptReplacement = async requestId => {
    await AxiosInstance({
      method: "put",
      url: `/staff/academic/replacement-requests/${requestId}/accept`,
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    })
      .then(() => {
        props.updateRequests();
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(error.message);
        }
        else if (error.response) {
          console.log(error.response);
        }
        else if (error.request) {
          console.log(error.request);
        }
        else {
          console.log(error.message);
        }
      });
  };
  const rejectReplacement = async requestId => {
    await AxiosInstance({
      method: "put",
      url: `/staff/academic/replacement-requests/${requestId}/reject`,
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    })
      .then(() => {
        props.updateRequests();
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(error.message);
        }
        else if (error.response) {
          console.log(error.response);
        }
        else if (error.request) {
          console.log(error.request);
        }
        else {
          console.log(error.message);
        }
      });
  };

  const deleteRequest = async requestId => {
    setDeleteModalState("submitting");
    await AxiosInstance({
      method: "delete",
      url: `/staff/academic/cancel-request/${requestId}`,
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    })
      .then(async response => {
        setDeleteModalMessage({
          messageText: response.data,
          messageStyle: "success",
        });
        setDeleteModalState("submitted");
        props.updateRequests();
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(error.message);
        }
        else if (error.response) {
          setDeleteModalMessage({
            messageText: error.response.data,
            messageStyle: "danger",
          });
          setDeleteModalState("submitted");
          console.log(error.response);
        }
        else if (error.request) {
          console.log(error.request);
        }
        else {
          console.log(error.message);
        }
      });
  };
  const toggleDeleteModal = requestId => {
    if (requestId) {
      setRequestToDelete(requestId);
    }
    setDeleteModalOpen(prevState => !prevState);
  };
  const resetDeleteModal = () => {
    setDeleteModalState("will submit");
    setDeleteModalMessage({ messageText: "", messageStyle: "" });
  };

  return (
    <>
      { props.isLoading && <Spinner />}

      {
        !props.isLoading && (
        <RequestList
          requests={props.requests}
          requestType={props.requestType}
          requestFilter={props.requestFilter}
          toggleDeleteModal={toggleDeleteModal}
          acceptReplacement={acceptReplacement}
          rejectReplacement={rejectReplacement}
          hodAcceptRequest={props.hodAcceptRequest}
          hodRejectRequest={props.hodRejectRequest}
          ccAcceptRequest={props.ccAcceptRequest}
          ccRejectRequest={props.ccRejectRequest}

        />
        )
      }

      <DeleteModal
        isOpen={deleteModalIsOpen}
        state={deleteModalState}
        message={deleteModalMessage}
        itemToDelete={requestToDelete}
        deleteItem={deleteRequest}
        toggle={toggleDeleteModal}
        reset={resetDeleteModal}
      />
    </>
  );
}

ViewRequests.propTypes = {
  isLoading: PropTypes.bool.isRequired,
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
  updateRequests: PropTypes.func.isRequired,
  hodAcceptRequest: PropTypes.func,
  hodRejectRequest: PropTypes.func,
  ccAcceptRequest: PropTypes.func,
  ccRejectRequest: PropTypes.func,

};

ViewRequests.defaultProps = {
  hodAcceptRequest: () => {},
  hodRejectRequest: () => {},
  ccAcceptRequest: () => {},
  ccRejectRequest: () => {},

};
export default ViewRequests;
