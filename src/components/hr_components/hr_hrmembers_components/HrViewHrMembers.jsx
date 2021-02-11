import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useRouteMatch } from "react-router-dom";
import Axios from "axios";
import AxiosInstance from "../../../others/AxiosInstance";
import AuthTokenManager from "../../../others/AuthTokenManager";
import useAxiosCancel from "../../../hooks/AxiosCancel";
import Spinner from "../../helper_components/Spinner";
import AddButton from "../../button_components/AddButton";
import DeleteModal from "../../helper_components/DeleteModal";
import HrList from "../../list_components/HrList";

function HrViewHrMembers(props) {
  const [hrMemberToDelete, setHrMemberToDelete] = useState("");
  const [deleteModalIsOpen, setDeleteModalOpen] = useState(false);
  const [deleteModalState, setDeleteModalState] = useState("will submit");
  const [deleteModalMessage, setDeleteModalMessage] = useState({ messageText: "", messageStyle: "" });
  const match = useRouteMatch();
  const axiosCancelSource = Axios.CancelToken.source();

  useAxiosCancel(axiosCancelSource);

  const deleteHrMember = async hrMemberId => {
    setDeleteModalState("submitting");
    await AxiosInstance.delete(`/staff/hr/delete-hr-member/${hrMemberId}`, {
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
        props.updateHrMembers();
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(`Request cancelled: ${error.message}`);
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
  const toggleDeleteModal = hrMemberID => {
    if (hrMemberID) {
      setHrMemberToDelete(hrMemberID);
    }
    setDeleteModalOpen(prevState => !prevState);
  };
  const resetDeleteModal = () => {
    setHrMemberToDelete("");
    setDeleteModalState("will submit");
    setDeleteModalMessage({ messageText: "", messageStyle: "" });
  };

  return (
    <>
      { props.isLoading && <Spinner />}

      {
        !props.isLoading && (
          <div className="view-container">
            <span className="d-flex justify-content-end">
              <Link to={`${match.url}/add`} tabIndex={-1}>
                <AddButton>Add HR Member</AddButton>
              </Link>
            </span>
            <HrList hrMembers={props.hrMembers} toggleDeleteModal={toggleDeleteModal} />
          </div>
        )
      }

      <DeleteModal
        isOpen={deleteModalIsOpen}
        state={deleteModalState}
        message={deleteModalMessage}
        itemToDelete={hrMemberToDelete}
        deleteItem={deleteHrMember}
        toggle={toggleDeleteModal}
        reset={resetDeleteModal}
      />
    </>
  );
}

HrViewHrMembers.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  hrMembers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    gender: PropTypes.string,
    salary: PropTypes.number,
    dayOff: PropTypes.string,
    office: PropTypes.string,
    annualLeaveBalance: PropTypes.number,
    accidentalLeaveBalance: PropTypes.number,
  })).isRequired,
  updateHrMembers: PropTypes.func.isRequired,
};

export default HrViewHrMembers;
