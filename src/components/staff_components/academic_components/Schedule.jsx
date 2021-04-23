import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import Axios from "axios";
import AxiosInstance from "../../../others/AxiosInstance";
import useAxiosCancel from "../../../hooks/AxiosCancel";
import { useUserContext } from "../../../contexts/UserContext";
import AuthTokenManager from "../../../others/AuthTokenManager";
import SlotsTableList from "../../list_components/SlotsTableList";
import Spinner from "../../helper_components/Spinner";

function Schedule() {
  const [isLoading, setLoading] = useState(true);
  const [slots, setSlots] = useState([]);
  const [active, setActive] = useState("");
  const [modal, setModal] = useState(false);
  const user = useUserContext();
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

  const toggle = () => setModal(!modal);
  const click = slot => {
    setActive(slot);
    toggle();
  };
  if (isLoading) {
    return (
      <Spinner />
    );
  }

  return (
    <>
      <div className="view-container text-center">
        <SlotsTableList slots={slots} active="" onClick={click} />
      </div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Slot Details</ModalHeader>
        <ModalBody>
          {slots.filter(slot => slot._id === active).map(slot => (
            <ul key="slot._id" className="unstyled">
              <li key="k1">
                Slot:
                {slot.slotNumber}
              </li>
              <li key="k2">
                Day:
                {slot.day}
              </li>
              <li key="k3">
                Course:
                {slot.course}
              </li>
              <li key="k4">
                Room:
                {slot.room}
              </li>
              {user.id !== slot.staffMember ? (
                <li key="k5">
                  Academic Member:
                  {slot.staffMember}
                </li>
              ) : null}
            </ul>
          ))}
        </ModalBody>
      </Modal>
    </>
  );
}

export default Schedule;
