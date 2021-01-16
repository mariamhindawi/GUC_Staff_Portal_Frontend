import React, { useEffect, useState } from "react";
import Axios from "../axios";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Label, Table, Card, Button, Alert } from 'reactstrap';
import SlotTableComponent from "./SlotTable.component";

const SlotLinkingForm = props => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [course, setCourse] = useState("")
    const [courses, setCourses] = useState([])
    const [slots, setSlots] = useState([])
    const [active,setActive]=useState("")
    const [alert,setAlert]=useState("")
    const [error,setError]=useState("")

    useEffect(() => {
        Axios.get("fe/get-my-courses", {
            headers: {
                token: sessionStorage.token
            }
        }).then(res => setCourses(res.data))
    }, [])
    const toggle = () => setDropdownOpen(prevState => !prevState);

    const chooseCourse = (id) => {
        setCourse(id)
        Axios.get('fe/course-slots', {
            headers: {
                token: sessionStorage.token
            },
            params: {
                id: id
            }
        }).then(res => { setSlots(res.data) })
    }

    const sendRequest = ()=>{
        Axios('/academic/send-slot-linking-request',{
            method:'POST',
            headers:{
                token:sessionStorage.token
            },
            data:{
                day:slots.filter(slot=>slot._id===active)[0].day,
                room:slots.filter(slot=>slot._id===active)[0].room,
                slot:slots.filter(slot=>slot._id===active)[0].slotNumber
            }
        }).then(res=>setAlert(res.data)).catch(res=>setError(res.data))
    }
    const dropdownCourses = courses.map(course => {
        return <DropdownItem onClick={() => chooseCourse(course.id)} key={course._id}>{course.id + ': ' + course.name}</DropdownItem>
    })
    if (slots)
        return <div className="container">
          <div className="pl-8">
          <Dropdown className="bg-info" isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret>
                    {course ? course : 'Select course'}
                </DropdownToggle>
                <DropdownMenu>
                    {dropdownCourses}
                </DropdownMenu>
            </Dropdown>
          </div>
            <div className="text-center"><h1>Choose a slot</h1></div>
            <SlotTableComponent slots={slots.filter(slot=>slot.staffMember==='UNASSIGNED')} onClick={setActive} active={active}/>
            <div className="form-button-div mb-2">
            <Button type="submit" className={active?"bg-success":""} onClick={sendRequest}>Send Request</Button>
            </div>
            {alert?<Alert className="bg-success">{alert}</Alert>:null}
            {error?<Alert className="bg-danger">{error}</Alert>:null}
        </div>
    else
        return <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>
                {course ? course : 'Select course'}
            </DropdownToggle>
            <DropdownMenu>
                {dropdownCourses}
            </DropdownMenu>
        </Dropdown>

}

export default SlotLinkingForm;