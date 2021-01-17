import React, { useEffect, useState } from "react";
import Axios from "../axios";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Label, Table, Card, Button, Alert, Input } from "reactstrap";
import SlotTableComponent from "./SlotTable.component";

const CIAssignSlots = props => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [course, setCourse] = useState("")
    const [courses, setCourses] = useState([])
    const [slots, setSlots] = useState([])
    const [active,setActive]=useState("")
    const [alert,setAlert]=useState("")
    const [error,setError]=useState("")
    const [academicMember,setAcademicMember]=useState("")

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
        Axios.get("fe/course-slots", {
            headers: {
                token: sessionStorage.token
            },
            params: {
                id: id
            }
        }).then(res => { setSlots(res.data) })
    }
    const handleChange = (event)=>{
        setAcademicMember(event.target.value)
    }

    const sendRequest = ()=>{
        Axios("/ci/assign-academic-member-to-slot",{
            method:"PUT",
            headers:{
                token:sessionStorage.token
            },
            data:{
                id:academicMember,
                day:slots.filter(slot=>slot._id===active)[0].day,
                room:slots.filter(slot=>slot._id===active)[0].room,
                slotNumber:slots.filter(slot=>slot._id===active)[0].slotNumber
            }
        }).then(res=>{console.log(res.data);setAlert(("Success"))}).catch(res=>setError(res.data))
    }

    const dropdownCourses = courses.map(course => {
        return <DropdownItem onClick={() => chooseCourse(course.id)} key={course._id}>{course.id + ": " + course.name}</DropdownItem>
    })
    if (slots)
        return <>
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret>
                    {course ? course : "Select course"}
                </DropdownToggle>
                <DropdownMenu>
                    {dropdownCourses}
                </DropdownMenu>
            </Dropdown>
            <h1>Choose a slot</h1>
            <SlotTableComponent slots={slots.filter(slot=>slot.staffMember==="UNASSIGNED")} onClick={setActive} active={active}/>
            {active?<Input name="academicMember" value={academicMember} onChange={handleChange}></Input>:null}
            <Button type="submit" className={active?"bg-primary":""} onClick={sendRequest}>Assign to slot</Button>
            {alert?<Alert className="bg-success">{alert}</Alert>:null}
            {error?<Alert className="bg-danger">{error}</Alert>:null}
        </>
    else
        return <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>
                {course ? course : "Select course"}
            </DropdownToggle>
            <DropdownMenu>
                {dropdownCourses}
            </DropdownMenu>
        </Dropdown>

}

export default CIAssignSlots;