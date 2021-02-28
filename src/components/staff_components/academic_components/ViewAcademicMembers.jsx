import React, { useState } from "react";
import PropTypes from "prop-types";
import Axios from "axios";
import AxiosInstance from "../../../others/AxiosInstance";
import AuthTokenManager from "../../../others/AuthTokenManager";
import useAxiosCancel from "../../../hooks/AxiosCancel";
import Spinner from "../../helper_components/Spinner";
import UnassignModal from "../../helper_components/UnassignModal";
import AcademicList from "../../list_components/AcademicList";

function ViewAcademics(props) {
  const [academicToUnassign, setAcademicToUnassign] = useState({});
  const [unassignModalIsOpen, setUnassignModalOpen] = useState(false);
  const [unassignModalState, setUnassignModalState] = useState("will submit");
  const [unassignModalMessage, setUnassignModalMessage] = useState({ messageText: "", messageStyle: "" });
  const [unassignBodyText, setUnassignBodyText] = useState("");
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

  const unassignAcademic = async academic => {
    let academicRole;
    let academicPath;
    if (academic.role === "Teaching Assistant" || academic.role === "Course Coordinator") {
      academicRole = "teaching-assistant";
      academicPath = "ci";
    }
    else {
      academicRole = "course-instructor";
      academicPath = "hod";
    }
    setUnassignModalState("submitting");
    await AxiosInstance.delete(`/staff/${academicPath}/unassign-${academicRole}/${academic.id}/${props.course}`, {
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
      setUnassignBodyText(text);
    }
    setUnassignModalOpen(prevState => !prevState);
  };
  const resetUnassignModal = () => {
    setAcademicToUnassign({});
    setUnassignModalState("will submit");
    setUnassignModalMessage({ messageText: "", messageStyle: "" });
    setUnassignBodyText("");
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

      <UnassignModal
        isOpen={unassignModalIsOpen}
        state={unassignModalState}
        message={unassignModalMessage}
        itemToUnassign={academicToUnassign}
        unassignItem={unassignAcademic}
        toggle={toggleUnassignModal}
        reset={resetUnassignModal}
        unassignBodyText={unassignBodyText}
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
