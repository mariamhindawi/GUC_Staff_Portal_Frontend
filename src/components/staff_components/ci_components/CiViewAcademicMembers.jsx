import React, { useState } from "react";
import PropTypes from "prop-types";
import Axios from "axios";
import AxiosInstance from "../../../others/AxiosInstance";
import AuthTokenManager from "../../../others/AuthTokenManager";
import useAxiosCancel from "../../../hooks/AxiosCancel";
import Spinner from "../../helper_components/Spinner";
import DeleteModal from "../../helper_components/DeleteModal";
import AcademicList from "../../list_components/AcademicList";

function CiViewAcademics(props) {
  const [academicToDelete, setAcademicToDelete] = useState("");
  const [deleteModalIsOpen, setDeleteModalOpen] = useState(false);
  const [deleteModalState, setDeleteModalState] = useState("will submit");
  const [deleteModalMessage, setDeleteModalMessage] = useState({ messageText: "", messageStyle: "" });
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

  const unassignAcademic = async academicId => {
    setDeleteModalState("submitting");
    await AxiosInstance.delete(`/staff/ci/unassign-teaching-assistant/${academicId}/${props.course}`, {
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

  let academics;
  if (props.academicsType === "Course Instructor") {
    academics = props.academics.courseInstructors;
  }
  else if (props.academicsType === "Teaching Assistant") {
    academics = props.academics.teachingAssistants;
  }
  else {
    academics = [...props.academics.courseInstructors, ...props.academics.teachingAssistants];
  }

  return (
    <>
      { props.isLoading && <Spinner />}

      {
        !props.isLoading && (
          <div className="view-container">
            <AcademicList
              academics={academics}
              academicsType={props.academicsType}
              listType={props.listType}
              toggleDeleteModal={toggleDeleteModal}
            />
          </div>
        )
      }

      <DeleteModal
        isOpen={deleteModalIsOpen}
        state={deleteModalState}
        message={deleteModalMessage}
        itemToDelete={academicToDelete}
        deleteItem={unassignAcademic}
        toggle={toggleDeleteModal}
        reset={resetDeleteModal}
      />
    </>
  );
}

CiViewAcademics.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  academics: PropTypes.shape({
    courseInstructors: PropTypes.arrayOf(PropTypes.shape({
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
    })),
    teachingAssistants: PropTypes.arrayOf(PropTypes.shape({
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
    })),
  }).isRequired,
  academicsType: PropTypes.oneOf(["All", "Course Instructor", "Teaching Assistant"]),
  listType: PropTypes.oneOf(["General", "Personal"]),
  course: PropTypes.string,
  updateAcademics: PropTypes.func,
};

CiViewAcademics.defaultProps = {
  academicsType: "All",
  listType: "General",
  course: "",
  updateAcademics: () => {},
};

export default CiViewAcademics;
