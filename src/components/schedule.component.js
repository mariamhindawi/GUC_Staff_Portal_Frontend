import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import axios from "../axios";
import SlotTableComponent from "./SlotTable.component";
import jwt from 'jsonwebtoken'

const ScheduleComponent = () => {
    const [slots, setSlots] = useState([])
    const [active, setActive] = useState("")
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);


    useEffect(() => {
        axios.get('/academic/schedule', {
            headers: {
                token: sessionStorage.token
            }
        }).then(res => setSlots(res.data))
    }, [])

    const click= (slot)=>{
        setActive(slot)
        toggle()
    }
    return <>
        <SlotTableComponent slots={slots} active="" onClick={click} />
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Slot Details</ModalHeader>
            <ModalBody>
                {slots.filter(slot=>slot._id===active).map(slot=>{
                    return <ul key="slot._id" className='unstyled'>
                        <li key="k1">Slot: {slot.slotNumber}</li>
                        <li key="k2">Day: {slot.day}</li>
                        <li key="k3">Course: {slot.course}</li>
                        <li key="k4">Room: {slot.room}</li>
                        {jwt.decode(sessionStorage.token).id !== slot.staffMember ?<li key="k5">Academic Member: {slot.staffMember}</li>:null}
                    </ul>
                })}
            </ModalBody>
        </Modal>
    </>
}

export default ScheduleComponent;