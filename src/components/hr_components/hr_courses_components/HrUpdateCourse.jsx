import React from "react";
import PropTypes from "prop-types";
import { useRouteMatch } from "react-router-dom";
import { getItem, removeFromPath } from "../../../others/Helpers";
import GoBackModal from "../../helper_components/GoBackModal";
import CourseForm from "../../form_components/CourseForm";

function HrUpdateCourse(props) {
  const match = useRouteMatch();
  const course = getItem(props.courses, "_id", match.params._id);

  if (!course) {
    return <GoBackModal message="Incorrect Course ID" link={removeFromPath(match.path, 2)} />;
  }
  return (
    <CourseForm formType="update" course={course} updateCourses={props.updateCourses} />
  );
}

HrUpdateCourse.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    capacity: PropTypes.number,
    remainingCapacity: PropTypes.number,
  })).isRequired,
  updateCourses: PropTypes.func.isRequired,
};

export default HrUpdateCourse;
