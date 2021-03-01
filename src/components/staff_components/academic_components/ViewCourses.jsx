import React, { useState } from "react";
import PropTypes from "prop-types";
import Axios from "axios";
import AxiosInstance from "../../../others/AxiosInstance";
import AuthTokenManager from "../../../others/AuthTokenManager";
import useAxiosCancel from "../../../hooks/AxiosCancel";
import Spinner from "../../helper_components/Spinner";
import AssignAcademicModal from "../../helper_components/AssignAcademicModal";
import UnassignAcademicModal from "../../helper_components/UnassignAcademicModal";
import CourseList from "../../list_components/CourseList";

function ViewCourses(props) {
  const [courseToAssign, setCourseToAssign] = useState({});
  const [academicToAssignRole, setAcademicToAssignRole] = useState("");
  const [assignModalIsOpen, setAssignModalOpen] = useState(false);
  const [assignModalState, setAssignModalState] = useState("will submit");
  const [assignModalBodyText, setAssignModalBodyText] = useState("");
  const [assignModalMessage, setAssignModalMessage] = useState({ messageText: "", messageStyle: "" });
  const [academicToUnassign, setAcademicToUnassign] = useState({});
  const [courseToUnassignFrom, setCourseToUnassignFrom] = useState({});
  const [unassignModalIsOpen, setUnassignModalOpen] = useState(false);
  const [unassignModalState, setUnassignModalState] = useState("will submit");
  const [unassignModalBodyText, setUnassignModalBodyText] = useState("");
  const [unassignModalMessage, setUnassignModalMessage] = useState({ messageText: "", messageStyle: "" });
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

  const assignAcademic = async (academicId, academicRole, course) => {
    let userRolePath;
    let academicRolePath;
    if (academicRole === "Teaching Assistant") {
      userRolePath = "ci";
      academicRolePath = "teaching-assistant";
    }
    else if (academicRole === "Course Coordinator") {
      userRolePath = "ci";
      academicRolePath = "course-coordinator";
    }
    else if (academicRole === "Course Instructor") {
      userRolePath = "hod";
      academicRolePath = "course-instructor";
    }
    setAssignModalState("submitting");
    await AxiosInstance({
      method: "post",
      url: `/staff/${userRolePath}/assign-${academicRolePath}`,
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
      data: {
        academicId,
        courseId: course.id,
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
          console.log(error.message);
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
  const toggleAssignModal = (course, academicRole, text) => {
    if (course) {
      setCourseToAssign(course);
      setAcademicToAssignRole(academicRole);
      setAssignModalBodyText(text);
    }
    setAssignModalOpen(prevState => !prevState);
  };
  const resetAssignModal = () => {
    setCourseToAssign({});
    setAssignModalState("will submit");
    setAssignModalBodyText("");
    setAssignModalMessage({ messageText: "", messageStyle: "" });
  };
  const unassignAcademic = async (academic, course) => {
    setUnassignModalState("submitting");
    await AxiosInstance({
      method: "put",
      url: `/staff/ci/unassign-course-coordinator/${academic.id}/${course.id}`,
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    })
      .then(async response => {
        setUnassignModalMessage({
          messageText: response.data,
          messageStyle: "success",
        });
        setUnassignModalState("submitted");
        props.updateCourses();
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(error.message);
        }
        else if (error.response) {
          setUnassignModalMessage({
            messageText: error.response.data,
            messageStyle: "danger",
          });
          setUnassignModalState("submitted");
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
  const toggleUnassignModal = (course, text) => {
    if (course) {
      setAcademicToUnassign({ id: course.courseCoordinator });
      setCourseToUnassignFrom(course);
      setUnassignModalBodyText(text);
    }
    setUnassignModalOpen(prevState => !prevState);
  };
  const resetUnassignModal = () => {
    setAcademicToUnassign({});
    setUnassignModalState("will submit");
    setUnassignModalBodyText("");
    setUnassignModalMessage({ messageText: "", messageStyle: "" });
  };

  return (
    <>
      { props.isLoading && <Spinner />}

      {
        !props.isLoading && (
          <CourseList
            courses={props.courses}
            coursesCoverage={props.coursesCoverage}
            listType={props.listType}
            toggleAssignModal={toggleAssignModal}
            toggleUnassignModal={toggleUnassignModal}
          />
        )
      }

      <AssignAcademicModal
        isOpen={assignModalIsOpen}
        state={assignModalState}
        message={assignModalMessage}
        bodyText={assignModalBodyText}
        courseToAssign={courseToAssign}
        academicRole={academicToAssignRole}
        assignAcademic={assignAcademic}
        toggle={toggleAssignModal}
        reset={resetAssignModal}
      />

      <UnassignAcademicModal
        isOpen={unassignModalIsOpen}
        state={unassignModalState}
        message={unassignModalMessage}
        bodyText={unassignModalBodyText}
        academicToUnassign={academicToUnassign}
        courseToUnassignFrom={courseToUnassignFrom}
        unassignAcademic={unassignAcademic}
        toggle={toggleUnassignModal}
        reset={resetUnassignModal}
      />
    </>
  );
}

ViewCourses.propTypes = {
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
  coursesCoverage: PropTypes.arrayOf(PropTypes.number),
  listType: PropTypes.oneOf(["General", "Personal"]),
  updateCourses: PropTypes.func,
};

ViewCourses.defaultProps = {
  coursesCoverage: [],
  listType: "General",
  updateCourses: () => {},
};

export default ViewCourses;
