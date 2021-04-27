import React, { useEffect, useState } from "react";
import Axios from "axios";
import AxiosInstance from "../../../others/AxiosInstance";
import useAxiosCancel from "../../../hooks/AxiosCancel";
import AuthTokenManager from "../../../others/AuthTokenManager";
import SlotsTableList from "../../list_components/SlotsTableList";
import Spinner from "../../helper_components/Spinner";
import ScheduleDetailsModal from "../../helper_components/ScheduleDetailsModal";

function Schedule() {
  const [isLoading, setLoading] = useState(true);
  const [slots, setSlots] = useState([]);
  const [activeSlot, setActiveSlot] = useState("");
  const [unassignModalIsOpen, setUnassignModalOpen] = useState(false);
  const [unassignModalState, setUnassignModalState] = useState("will submit");
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

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
  const toggleUnassignModal = () => {
    setUnassignModalOpen(prevState => !prevState);
  };
  const resetUnassignModal = () => {
    setUnassignModalState("will submit");
  };

  const click = slot => {
    setActiveSlot(slot);
    toggleUnassignModal();
  };
  if (isLoading) {
    return (
      <Spinner />
    );
  }

  return (
    <>
      <div className="view-container text-center">
        <SlotsTableList slots={slots} activeSlot={activeSlot} onClick={click} />
      </div>
      <ScheduleDetailsModal
        isOpen={unassignModalIsOpen}
        state={unassignModalState}
        slots={slots}
        toggle={toggleUnassignModal}
        reset={resetUnassignModal}
        activeSlot={activeSlot}
        unassign="schedule"
      />
    </>
  );
}

export default Schedule;
