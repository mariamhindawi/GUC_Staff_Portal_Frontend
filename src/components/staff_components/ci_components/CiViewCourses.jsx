import React, { useState } from "react";
import PropTypes from "prop-types";
import Axios from "axios";
import AxiosInstance from "../../../others/AxiosInstance";
import AuthTokenManager from "../../../others/AuthTokenManager";
import useAxiosCancel from "../../../hooks/AxiosCancel";
import Spinner from "../../helper_components/Spinner";
import AssignModal from "../../helper_components/AssignModal";
import CourseList from "../../list_components/CourseList";

function CiViewCourses(props) {
  const [courseToAssign, setCourseToAssign] = useState("");
  const [academicTypeToAssign, setAcademicTypeToAssign] = useState("");
  const [assignModalIsOpen, setAssignModalOpen] = useState(false);
  const [assignModalState, setAssignModalState] = useState("will submit");
  const [assignModalMessage, setAssignModalMessage] = useState({ messageText: "", messageStyle: "" });
  const [assignBodyText, setAssignBodyText] = useState("");

  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

  const assignAcademic = async (academicId, courseId, academicRole) => {
    setAssignModalState("submitting");
    await AxiosInstance({
      method: "post",
      url: `/staff/ci/assign-${academicRole}/${academicId}/${courseId}`,
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    })
      .then(async response => {
        setAssignModalMessage({
          messageText: response.data,
          messageStyle: "success",
        });
        setAssignModalState("submitted");
        props.updateCourses();
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(`Request cancelled: ${error.message}`);
        }
        else if (error.response) {
          setAssignModalMessage({
            messageText: error.response.data,
            messageStyle: "danger",
          });
          setAssignModalState("submitted");
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

  const toggleAssignModal = (courseId, type, text) => {
    if (courseId) {
      setCourseToAssign(courseId);
      setAcademicTypeToAssign(type);
      setAssignBodyText(text);
    }
    setAssignModalOpen(prevState => !prevState);
  };

  const resetAssignModal = () => {
    setCourseToAssign("");
    setAcademicTypeToAssign("");
    setAssignModalState("will submit");
    setAssignModalMessage({ messageText: "", messageStyle: "" });
    setAssignBodyText("");
  };

  return (
    <>
      { props.isLoading && <Spinner />}

      {
        !props.isLoading && (
          <CourseList
            courses={props.courses}
            type={props.type}
            toggleAssignModal={toggleAssignModal}
          />
        )
      }
      <AssignModal
        isOpen={assignModalIsOpen}
        state={assignModalState}
        message={assignModalMessage}
        itemToAssign={courseToAssign}
        assignItem={assignAcademic}
        toggle={toggleAssignModal}
        reset={resetAssignModal}
        assignBodyText={assignBodyText}
        academicRole={academicTypeToAssign}
      />
    </>
  );
}

CiViewCourses.propTypes = {
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
  type: PropTypes.oneOf(["General", "Personal"]),
  updateCourses: PropTypes.func,
};

CiViewCourses.defaultProps = {
  type: "General",
  updateCourses: () => { },
};

export default CiViewCourses;
