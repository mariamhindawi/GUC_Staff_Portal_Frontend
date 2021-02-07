import React, { useState } from "react";
import PropTypes from "prop-types";
import AcademicListItem from "../list_item_components/AcademicListItem";
import Pagination from "../helper_components/Pagination";
import { useUserContext } from "../../contexts/UserContext";

const AcademicList = props => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const user = useUserContext();

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPosts = props.academics.slice(indexOfFirstItem, indexOfLastItem);

  const academicList = () => (
    currentPosts.map(academic => (
      <AcademicListItem
        key={academic.id}
        academic={academic}
        toggleDeleteModal={props.toggleDeleteModal}
      />
    ))
  );

  const customTableHeads = () => {
    switch (user.role) {
      case "HR": return (
        <>
          <th> </th>
          <th> </th>
        </>
      );
      default: return <></>;
    }
  };

  if (props.academics.length === 0) {
    return <span className="align-center">No items</span>;
  }
  return (
    <>
      <div className="list-container">
        <table className="list">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Office</th>
              <th>Day Off</th>
              <th>Email</th>
              {customTableHeads()}
            </tr>
          </thead>
          <tbody>
            {academicList()}
          </tbody>
        </table>
      </div>

      <Pagination
        className="list-pagination"
        numberOfItems={props.academics.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

AcademicList.propTypes = {
  academics: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    gender: PropTypes.string,
    salary: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    role: PropTypes.string,
    department: PropTypes.string,
    dayOff: PropTypes.string,
    office: PropTypes.string,
  })).isRequired,
  toggleDeleteModal: PropTypes.func,
};

AcademicList.defaultProps = {
  toggleDeleteModal: () => { },
};

export default AcademicList;
