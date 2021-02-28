import React, { useState } from "react";
import PropTypes from "prop-types";
import Axios from "axios";
import AxiosInstance from "../../../others/AxiosInstance";
import AuthTokenManager from "../../../others/AuthTokenManager";
import useAxiosCancel from "../../../hooks/AxiosCancel";
import Spinner from "../../helper_components/Spinner";
import UnassignAcademicModal from "../../helper_components/UnassignAcademicModal";
import AcademicList from "../../list_components/AcademicList";

function ViewAcademics(props) {
  const [unassignModalIsOpen, setUnassignModalOpen] = useState(false);
  const [unassignModalState, setUnassignModalState] = useState("will submit");
  const [unassignModalBodyText, setUnassignModalBodyText] = useState("");
  const [unassignModalMessage, setUnassignModalMessage] = useState({ messageText: "", messageStyle: "" });
  const [academicToUnassign, setAcademicToUnassign] = useState({});
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

  const unassignAcademic = async academic => {
    let userRolePath;
    let academicRolePath;
    if (academic.role === "Teaching Assistant" || academic.role === "Course Coordinator") {
      userRolePath = "ci";
      academicRolePath = "teaching-assistant";
    }
    else {
      userRolePath = "hod";
      academicRolePath = "course-instructor";
    }
    setUnassignModalState("submitting");
    await AxiosInstance.put(`/staff/${userRolePath}/unassign-${academicRolePath}/${academic.id}/${props.course}`, {
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
        props.updateAcademics();
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
  const toggleUnassignModal = (academic, text) => {
    if (academic) {
      setAcademicToUnassign(academic);
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

  const getAcademics = () => {
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
    return academics;
  };

  return (
    <>
      { props.isLoading && <Spinner />}

      {
        !props.isLoading
          && (props.listType !== "Personal" || (props.listType === "Personal" && props.course !== "")) && (
          <AcademicList
            academics={getAcademics()}
            academicsType={props.academicsType}
            listType={props.listType}
            toggleUnassignModal={toggleUnassignModal}
            course={props.course}
          />
        )
      }

      <UnassignAcademicModal
        isOpen={unassignModalIsOpen}
        state={unassignModalState}
        message={unassignModalMessage}
        bodyText={unassignModalBodyText}
        academicToUnassign={academicToUnassign}
        unassignAcademic={unassignAcademic}
        toggle={toggleUnassignModal}
        reset={resetUnassignModal}
      />
    </>
  );
}

ViewAcademics.propTypes = {
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
  updateCourses: PropTypes.func,
};

ViewAcademics.defaultProps = {
  academicsType: "All",
  listType: "General",
  course: "",
  updateAcademics: () => {},
  updateCourses: () => {},
};

export default ViewAcademics;
