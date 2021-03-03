import React from "react";
import PropTypes from "prop-types";
import { Dropdown, DropdownButton } from "react-bootstrap";

function AttendanceSelect(props) {
  const getDropdownMonths = () => {
    const dropdownMonths = [];
    for (let i = 1; i <= 12; i++) {
      const dropdownMonth = (
        <Dropdown.Item
          onClick={() => { props.setMonth(i); }}
          key={i}
        >
          {i}
        </Dropdown.Item>
      );
      dropdownMonths.push(dropdownMonth);
    }
    return dropdownMonths;
  };
  const getDropdownYears = () => {
    const dropdownYears = [];
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < 5; i++) {
      const dropdownYear = (
        <Dropdown.Item
          onClick={() => { props.setYear(currentYear - i); }}
          key={currentYear - i}
        >
          {currentYear - i}
        </Dropdown.Item>
      );
      dropdownYears.push(dropdownYear);
    }
    return dropdownYears;
  };
  const handleChange = e => {
    props.setUserId(e.target.value);
  };

  return (
    <div className="view-select">
      <div>
        <span className="mr-2">Month</span>
        <DropdownButton bsPrefix="view-dropdown-button attendance-dropdown-button" title={props.month}>
          {getDropdownMonths()}
        </DropdownButton>
        <span className="ml-3 mr-2">Year</span>
        <DropdownButton bsPrefix="view-dropdown-button attendance-dropdown-button" title={props.year}>
          {getDropdownYears()}
        </DropdownButton>
      </div>
      {props.search && (
        <input
          className="input"
          type="search"
          value={props.userId}
          placeholder="User ID"
          onChange={handleChange}
        />
      )}
    </div>
  );
}

AttendanceSelect.propTypes = {
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  setMonth: PropTypes.func.isRequired,
  setYear: PropTypes.func.isRequired,
  search: PropTypes.bool,
  userId: PropTypes.string,
  setUserId: PropTypes.func,
};

AttendanceSelect.defaultProps = {
  search: false,
  userId: "",
  setUserId: () => {},
};

export default AttendanceSelect;
