import React from "react";
import PropTypes from "prop-types";
import CourseForm from "../../form_components/CourseForm";

function HrAddCourse(props) {
  return <CourseForm formType="add" updateCourses={props.updateCourses} />;
}

HrAddCourse.propTypes = {
  updateCourses: PropTypes.func.isRequired,
};

export default HrAddCourse;
