import React, { useEffect, useState } from "react";
import Axios from "axios";
import AxiosInstance from "../../../../others/AxiosInstance";
import useAxiosCancel from "../../../../hooks/AxiosCancel";
import { useUserContext } from "../../../../contexts/UserContext";
import AuthTokenManager from "../../../../others/AuthTokenManager";
import SlotsTableList from "../../../list_components/SlotsTableList";
import Spinner from "../../../helper_components/Spinner";
import ReplacementRequestModal from "../../../helper_components/ReplacementRequestModal";

function ReplacementRequest() {
  const [isLoading, setLoading] = useState(true);
  const [slots, setSlots] = useState([]);
  const [activeSlot, setActiveSlot] = useState("");
  const [slotToAssign, setSlotToAssign] = useState("");
  const [assignModalIsOpen, setAssignModalOpen] = useState(false);
  const [assignModalState, setAssignModalState] = useState("will submit");
  const [assignModalBodyText, setAssignModalBodyText] = useState("");
  const [assignModalMessage, setAssignModalMessage] = useState({ messageText: "", messageStyle: "" });
  const user = useUserContext();
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

  const sendRequest = async (replacementId, date) => {
    setAssignModalState("submitting");
    await AxiosInstance({
      method: "post",
      url: "staff/academic/send-replacement-request",
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
      data: {
        replacementID: replacementId,
        slot: slots.filter(slot => slot._id === slotToAssign)[0].slotNumber,
        day: date,
      },
    })
      .then(response => {
        setAssignModalMessage({
          messageText: response.data,
          messageStyle: "success",
        });
        setAssignModalState("submitted");
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(error.message);
        }
        else if (error.response) {
          setAssignModalMessage({
            messageText: error.response.data,
            messageStyle: "danger",
          });
          setAssignModalState("submitted");
        }
        else if (error.request) {
          console.log(error.request);
        }
        else {
          console.log(error.message);
        }
      });
  };
  const toggleAssignModal = slot => {
    if (slot) {
      setActiveSlot(slot);
      setSlotToAssign(slot);
      setAssignModalBodyText("Send request for slot: ");
    }
    setAssignModalOpen(prevState => !prevState);
  };
  const resetAssignModal = () => {
    setSlotToAssign("");
    setAssignModalState("will submit");
    setAssignModalBodyText("");
    setAssignModalMessage({ messageText: "", messageStyle: "" });
  };
  const fetchSchedule = () => {
    setLoading(true);
    AxiosInstance.get("staff/academic/schedule", {
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    })
      .then(response => {
        setSlots(response.data);
        setLoading(false);
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(error.message);
        }
        else if (error.response) {
          console.log(error.response);
          setLoading(false);
        }
        else if (error.request) {
          console.log(error.request);
        }
        else {
          console.log(error.message);
        }
      });
  };
  useEffect(fetchSchedule, []);

  if (isLoading) {
    return (
      <Spinner />
    );
  }

  return (
    <div className="view-container text-center">
      <SlotsTableList
        slots={slots.filter(slot => slot.staffMember === user.id)}
        activeSlot={activeSlot}
        onClick={toggleAssignModal}
      />

      <ReplacementRequestModal
        isOpen={assignModalIsOpen}
        state={assignModalState}
        message={assignModalMessage}
        bodyText={assignModalBodyText}
        slotToAssign={slotToAssign}
        sendRequest={sendRequest}
        toggle={toggleAssignModal}
        reset={resetAssignModal}
      />
    </div>
  );
}

export default ReplacementRequest;
