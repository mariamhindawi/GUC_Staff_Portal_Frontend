import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import Axios from "axios";
import AxiosInstance from "../../others/AxiosInstance";
import AuthTokenManager from "../../others/AuthTokenManager";
import SlotTableComponent from "./SlotTable.component";
import { useUserContext } from "../../contexts/UserContext";

const ScheduleComponent = () => {
  const [slots, setSlots] = useState([]);
  const [active, setActive] = useState("");
  const [modal, setModal] = useState(false);
  const user = useUserContext();
  const toggle = () => setModal(!modal);

  useEffect(() => {
    AxiosInstance.get("staff/academic/schedule", {
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    }).then(res => setSlots(res.data));
  }, []);

  const click = slot => {
    setActive(slot);
    toggle();
  };
  return (
    <>
      <SlotTableComponent slots={slots} active="" onClick={click} />
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
};

export default ScheduleComponent;
