import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useRouteMatch } from "react-router-dom";
import Axios from "axios";
import AxiosInstance from "../../../others/AxiosInstance";
import AuthTokenManager from "../../../others/AuthTokenManager";
import ErrorMessages from "../../../others/ErrorMessages";
import AddButton from "../../button_components/AddButton";
import Spinner from "../../helper_components/Spinner";
import AcademicList from "../../list_components/AcademicList";
import DeleteModal from "../../helper_components/DeleteModal";

function HrViewAcademics(props) {
  const [academicToDelete, setAcademicToDelete] = useState("");
  const [deleteModalIsOpen, setDeleteModalOpen] = useState(false);
  const [deleteModalState, setDeleteModalState] = useState("will submit");
  const [deleteModalMessage, setDeleteModalMessage] = useState({ messageText: "", messageStyle: "" });
  const match = useRouteMatch();
  const axiosCancelSource = Axios.CancelToken.source();

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
          console.log(error.response);
        }
        else if (error.request) {
          console.log(error.request);
        }
        else {
          console.log(error.message);
        }
      })
      .finally(() => {
        setDeleteModalState("submitted");
      });
  };
  const cancelRequests = () => (
    () => { axiosCancelSource.cancel(ErrorMessages.requestCancellation); }
  );
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

  useEffect(cancelRequests, []);

  return (
    <>
      { props.isLoading && <Spinner /> }

      {
        !props.isLoading && (
          <div className="view-container">
            <Link className="list-add-button" to={`${match.url}/add`} tabIndex={-1}>
              <AddButton buttonText="Add Academic Member" />
            </Link>
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
    salary: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    role: PropTypes.string,
    departments: PropTypes.string,
    rooms: PropTypes.string,
    dayOff: PropTypes.string,
  })).isRequired,
  updateAcademics: PropTypes.func.isRequired,
};

export default HrViewAcademics;
