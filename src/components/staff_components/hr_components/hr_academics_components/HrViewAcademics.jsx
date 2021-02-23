import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useRouteMatch } from "react-router-dom";
import Axios from "axios";
import AxiosInstance from "../../../../others/AxiosInstance";
import AuthTokenManager from "../../../../others/AuthTokenManager";
import useAxiosCancel from "../../../../hooks/AxiosCancel";
import Spinner from "../../../helper_components/Spinner";
import AddButton from "../../../button_components/AddButton";
import DeleteModal from "../../../helper_components/DeleteModal";
import AcademicList from "../../../list_components/AcademicList";

function HrViewAcademics(props) {
  const [academicToDelete, setAcademicToDelete] = useState("");
  const [deleteModalIsOpen, setDeleteModalOpen] = useState(false);
  const [deleteModalState, setDeleteModalState] = useState("will submit");
  const [deleteModalMessage, setDeleteModalMessage] = useState({ messageText: "", messageStyle: "" });
  const match = useRouteMatch();
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

  const deleteAcademic = async academicId => {
    setDeleteModalState("submitting");
    await AxiosInstance.delete(`/staff/hr/delete-academic-member/${academicId}`, {
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
        props.updateAcademics();
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
  const toggleDeleteModal = academicID => {
    if (academicID) {
      setAcademicToDelete(academicID);
    }
    setDeleteModalOpen(prevState => !prevState);
  };
  const resetDeleteModal = () => {
    setAcademicToDelete("");
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
                <AddButton>Add Academic Member</AddButton>
              </Link>
            </span>
            <AcademicList academics={props.academics} toggleDeleteModal={toggleDeleteModal} />
          </div>
        )
      }

      <DeleteModal
        isOpen={deleteModalIsOpen}
        state={deleteModalState}
        message={deleteModalMessage}
        itemToDelete={academicToDelete}
        deleteItem={deleteAcademic}
        toggle={toggleDeleteModal}
        reset={resetDeleteModal}
      />
    </>
  );
}

HrViewAcademics.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  academics: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    gender: PropTypes.string,
    salary: PropTypes.number,
    role: PropTypes.string,
    department: PropTypes.string,
    dayOff: PropTypes.string,
    office: PropTypes.string,
    annualLeaveBalance: PropTypes.number,
    accidentalLeaveBalance: PropTypes.number,
  })).isRequired,
  updateAcademics: PropTypes.func.isRequired,
};

export default HrViewAcademics;
