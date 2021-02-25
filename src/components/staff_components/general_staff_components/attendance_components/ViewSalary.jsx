import React from "react";
import PropTypes from "prop-types";

function ViewSalary(props) {
  return (
    <div>
      <span>{`Base Salary: ${props.salary.baseSalary}`}</span>
      <br />
      <span>{`Calculated Salary: ${props.salary.calculatedSalary}`}</span>
    </div>
  );
}

ViewSalary.propTypes = {
  salary: PropTypes.shape({
    baseSalary: PropTypes.number,
    calculatedSalary: PropTypes.number,
  }).isRequired,
};

export default ViewSalary;
