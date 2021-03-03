import React from "react";
import PropTypes from "prop-types";
import { useUserContext } from "../../contexts/UserContext";
import EditButton from "../button_components/EditButton";
import DeleteButton from "../button_components/DeleteButton";

function AttendanceRecordsListItem(props) {
  const user = useUserContext();

  const customData = () => {
    if (user.role === "HR" && props.listType === "Edit") {
      if (user.id !== props.attendanceRecord.user && (!props.attendanceRecord.signInTime.getTime()
        || !props.attendanceRecord.signOutTime.getTime())) {
        return (
          <>
            <td>
              <EditButton
                onClick={() => { props.toggleEditModal(props.attendanceRecord._id); }}
              />
            </td>
            <td>
              <DeleteButton
                onClick={() => { props.toggleDeleteModal(props.attendanceRecord._id); }}
              />
            </td>
          </>
        );
      }
      return (
        <>
          <td />
          <td>
            <DeleteButton
              onClick={() => { props.toggleDeleteModal(props.attendanceRecord._id); }}
            />
          </td>
        </>
      );
    }
    return null;
  };

  return (
    <tr>
      {props.attendanceRecord.signInTime.getTime()
        ? <td>{props.attendanceRecord.signInTime.toString().substring(0, 24)}</td>
        : <td style={{ paddingLeft: "100px" }}>-</td>}
      {props.attendanceRecord.signOutTime.getTime()
        ? <td>{props.attendanceRecord.signOutTime.toString().substring(0, 24)}</td>
        : <td style={{ paddingLeft: "100px" }}>-</td>}
      {customData()}
    </tr>
  );
}

AttendanceRecordsListItem.propTypes = {
  attendanceRecord: PropTypes.shape({
    _id: PropTypes.string,
    user: PropTypes.string,
    signInTime: PropTypes.instanceOf(Date),
    signOutTime: PropTypes.instanceOf(Date),
  }).isRequired,
  listType: PropTypes.oneOf(["General", "Edit"]),
  toggleEditModal: PropTypes.func,
  toggleDeleteModal: PropTypes.func,
};

AttendanceRecordsListItem.defaultProps = {
  listType: "General",
  toggleEditModal: () => {},
  toggleDeleteModal: () => {},
};

export default AttendanceRecordsListItem;
