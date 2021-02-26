import React from "react";
import PropTypes from "prop-types";
import { CircularProgressbar } from "react-circular-progressbar";

function ViewSalary(props) {
  const { baseSalary, calculatedSalary } = props.salary;

  return (
    <div className="progress-container">
      <div className="progress-card">
        <span>
          Base Salary:&nbsp;&nbsp;
          {`${baseSalary} EGP`}
        </span>
        <span>
          Calculated Salary:&nbsp;&nbsp;
          {`${calculatedSalary.toFixed(2)} EGP`}
        </span>
      </div>
      <div className="progress-chart">
        <span>Month Salary</span>
        <CircularProgressbar
          value={calculatedSalary}
          maxValue={baseSalary}
          text={`${((calculatedSalary / baseSalary) * 100).toFixed(2)}%`}
        />
      </div>
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
