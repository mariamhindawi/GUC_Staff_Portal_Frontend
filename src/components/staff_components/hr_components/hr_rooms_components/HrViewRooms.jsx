import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useRouteMatch } from "react-router-dom";
import Axios from "axios";
import AxiosInstance from "../../../../others/AxiosInstance";
import AuthTokenManager from "../../../../others/AuthTokenManager";
import useAxiosCancel from "../../../../hooks/AxiosCancel";
import Spinner from "../../../helper_components/Spinner";
import AddButton from "../../../button_components/AddButton";
import DeleteModal from "../../../helper_components/DeleteModal";
import RoomList from "../../../list_components/RoomList";

function HrViewRooms(props) {
  const [roomToDelete, setRoomToDelete] = useState("");
  const [deleteModalIsOpen, setDeleteModalOpen] = useState(false);
  const [deleteModalState, setDeleteModalState] = useState("will submit");
  const [deleteModalMessage, setDeleteModalMessage] = useState({ messageText: "", messageStyle: "" });
  const match = useRouteMatch();
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

  const deleteRoom = async roomName => {
    setDeleteModalState("submitting");
    await AxiosInstance.delete(`/staff/hr/delete-room/${roomName}`, {
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    })
      .then(async response => {
        setDeleteModalMessage({
          messageText: response.data,
          messageStyle: "success",
        });
        setDeleteModalState("submitted");
        props.updateRooms();
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(`Request cancelled: ${error.message}`);
        }
        else if (error.response) {
          setDeleteModalMessage({
            messageText: error.response.data,
            messageStyle: "danger",
          });
          setDeleteModalState("submitted");
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
  const toggleDeleteModal = roomName => {
    if (roomName) {
      setRoomToDelete(roomName);
    }
    setDeleteModalOpen(prevState => !prevState);
  };
  const resetDeleteModal = () => {
    setRoomToDelete("");
    setDeleteModalState("will submit");
    setDeleteModalMessage({ messageText: "", messageStyle: "" });
  };

  return (
    <>
      { props.isLoading && <Spinner />}

      {
        !props.isLoading && (
          <div className="view-container">
            <span className="d-flex justify-content-end">
              <Link to={`${match.url}/add`} tabIndex={-1}>
                <AddButton>Add Room</AddButton>
              </Link>
            </span>
            <RoomList rooms={props.rooms} toggleDeleteModal={toggleDeleteModal} />
          </div>
        )
      }

      <DeleteModal
        isOpen={deleteModalIsOpen}
        state={deleteModalState}
        message={deleteModalMessage}
        itemToDelete={roomToDelete}
        deleteItem={deleteRoom}
        toggle={toggleDeleteModal}
        reset={resetDeleteModal}
      />
    </>
  );
}

HrViewRooms.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  rooms: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    capacity: PropTypes.number,
    remainingCapacity: PropTypes.number,
  })).isRequired,
  updateRooms: PropTypes.func.isRequired,
};

export default HrViewRooms;
