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
import SlotList from "../../../list_components/SlotList";

function CcViewSlots(props) {
  const [slotToDelete, setSlotToDelete] = useState("");
  const [deleteModalIsOpen, setDeleteModalOpen] = useState(false);
  const [deleteModalState, setDeleteModalState] = useState("will submit");
  const [deleteModalMessage, setDeleteModalMessage] = useState({ messageText: "", messageStyle: "" });
  const match = useRouteMatch();
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

  const deleteSlot = async slotId => {
    setDeleteModalState("submitting");
    await AxiosInstance({
      method: "delete",
      url: `/staff/cc/delete-course-slot/${slotId}`,
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
        props.updateSlots();
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(error.message);
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
  const toggleDeleteModal = slotId => {
    if (slotId) {
      setSlotToDelete(slotId);
    }
    setDeleteModalOpen(prevState => !prevState);
  };
  const resetDeleteModal = () => {
    setDeleteModalState("will submit");
    setDeleteModalMessage({ messageText: "", messageStyle: "" });
  };

  return (
    <>
      { props.isLoading && <Spinner />}

      {
        !props.isLoading && (
          <>
            <span className="d-flex justify-content-end">
              <Link to={`${match.url}/add`} tabIndex={-1}>
                <AddButton>Add Slot</AddButton>
              </Link>
            </span>
            <SlotList slots={props.slots} toggleDeleteModal={toggleDeleteModal} />
          </>
        )
      }

      <DeleteModal
        isOpen={deleteModalIsOpen}
        state={deleteModalState}
        message={deleteModalMessage}
        itemToDelete={slotToDelete}
        deleteItem={deleteSlot}
        toggle={toggleDeleteModal}
        reset={resetDeleteModal}
      />
    </>
  );
}

CcViewSlots.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  slots: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    day: PropTypes.string,
    slotNumber: PropTypes.string,
    room: PropTypes.string,
    course: PropTypes.string,
    staffMember: PropTypes.stringt,
    type: PropTypes.string,
  })).isRequired,
  updateSlots: PropTypes.func.isRequired,
};

export default CcViewSlots;
