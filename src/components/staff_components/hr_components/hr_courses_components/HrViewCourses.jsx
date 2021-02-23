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
import CourseList from "../../../list_components/CourseList";

function HrViewCourses(props) {
  const [courseToDelete, setCourseToDelete] = useState("");
  const [deleteModalIsOpen, setDeleteModalOpen] = useState(false);
  const [deleteModalState, setDeleteModalState] = useState("will submit");
  const [deleteModalMessage, setDeleteModalMessage] = useState({ messageText: "", messageStyle: "" });
  const match = useRouteMatch();
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

  const deleteCourse = async courseId => {
    setDeleteModalState("submitting");
    await AxiosInstance.delete(`/staff/hr/delete-course/${courseId}`, {
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
        props.updateCourses();
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
  const toggleDeleteModal = courseId => {
    if (courseId) {
      setCourseToDelete(courseId);
    }
    setDeleteModalOpen(prevState => !prevState);
  };
  const resetDeleteModal = () => {
    setCourseToDelete("");
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
                <AddButton>Add Course</AddButton>
              </Link>
            </span>
            <CourseList courses={props.courses} toggleDeleteModal={toggleDeleteModal} />
          </div>
        )
      }

      <DeleteModal
        isOpen={deleteModalIsOpen}
        state={deleteModalState}
        message={deleteModalMessage}
        itemToDelete={courseToDelete}
        deleteItem={deleteCourse}
        toggle={toggleDeleteModal}
        reset={resetDeleteModal}
      />
    </>
  );
}

HrViewCourses.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  courses: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    department: PropTypes.string,
    courseInstructors: PropTypes.arrayOf(PropTypes.string),
    teachingAssistants: PropTypes.arrayOf(PropTypes.string),
    courseCoordinator: PropTypes.string,
  })).isRequired,
  updateCourses: PropTypes.func.isRequired,
};

export default HrViewCourses;
