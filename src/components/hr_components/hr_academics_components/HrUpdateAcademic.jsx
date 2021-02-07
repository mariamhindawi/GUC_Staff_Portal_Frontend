import React from "react";
import PropTypes from "prop-types";
import { Link, useRouteMatch } from "react-router-dom";
import { Alert, Modal } from "react-bootstrap";
import AcademicMemberForm from "../../form_components/AcademicMemberForm";

function HrUpdateAcademic(props) {
  const match = useRouteMatch();

  const getAcademic = academicID => {
    const { academics } = props;
    for (let i = 0; i < academics.length; i++) {
      if (academics[i].id === academicID) {
        return academics[i];
      }
    }
    return null;
  };

  const removeFromPath = (path, number) => {
    const splitPath = path.split("/");
    if (number < splitPath.length) {
      splitPath.length -= number;
      return splitPath.join("/");
    }
    return "";
  };

  const academic = getAcademic(match.params.id);
  if (!academic) {
    return (
      <Modal backdrop="static" show>
        <Modal.Body>
          <Alert className="d-flex justify-content-between" variant="info">
            Incorrect user ID
            <Alert.Link as={Link} to={removeFromPath(match.path, 2)}>
              Go back
            </Alert.Link>
          </Alert>
        </Modal.Body>
      </Modal>
    );
  }
  return (
    <AcademicMemberForm formType="update" academic={academic} updateAcademics={props.updateAcademics} />
  );
}

HrUpdateAcademic.propTypes = {
  academics: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    gender: PropTypes.string,
    salary: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    role: PropTypes.string,
    departments: PropTypes.string,
    rooms: PropTypes.string,
    dayOff: PropTypes.string,
  })).isRequired,
  updateAcademics: PropTypes.func.isRequired,
};

export default HrUpdateAcademic;
