import React from "react";
import { Route } from "react-router-dom";
import Root from "./components/root.component";
import LoginForm from "./components/login_form.component";
import Header from "./components/header.component";
import Sidebar from "./components/sidebar.component";
import HrHomePage from "./components/hr_home.component";
import DepartmentForm from "./components/department_form.component";
import CourseSlotForm from "./components/course_slot_form.component";
import Attendance from "./components/attendance.component";
import MissingDays from "./components/missing_days.component";
import Hours from "./components/hours.component";
import HRAttendance from "./components/hr_attendance.component";
import HRHours from "./components/hr_hours.component";
import HRDays from "./components/hr_days.component";

function App() {
  return (
    <div>
      <Route exact path="/"> <Root /> </Route>
      <Route exact path="/login"> <LoginForm /> </Route>
      <Route path="/staff"> <Header /> </Route>
      <Route path="/staff"> <Sidebar /> </Route>
      <Route path="/staff/hr"> <HrHomePage /> </Route>
      <Route path="/test/department-form"> <DepartmentForm department={{name: "", faculty: "", headOfDepartment: ""}} formType="add" /> </Route>
      <Route path="/test/course-slot-form"> <CourseSlotForm courseSlot={{slotNumber: "", day: "", course: "", type:"", room: ""}} formType="add" /> </Route>
      <Route path="/staff/attendance"> <Attendance /> </Route>
      <Route path="/staff/missingdays"> <MissingDays /> </Route>
      <Route path="/staff/hours"> <Hours /> </Route>
      <Route path="/hr/attendance"> <HRAttendance /> </Route>
      <Route path="/hr/hours"> <HRHours/>  </Route>
      <Route path="/hr/days"> <HRDays/>  </Route>
    </div>
  );
}

export default App;