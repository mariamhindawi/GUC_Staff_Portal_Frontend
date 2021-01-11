import React from "react";
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import Profile from "./profile.component";
import HODCourses from "./hod_courses.component";
import HRrooms from './hr_rooms.component';
import HRacademics from './hr_academics.component';
import HRfaculty from './hr_faculty.component';
import HRdepartments from './hr_departments.component';


class HomePage extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <h1>Welcome</h1>
                    <Link to={`${this.props.match.url}/profile`}>Profile</Link>
                    <br/> <br/>
                    <Link to={`${this.props.match.url}/hod-courses`}>HOD courses</Link>
                    <br></br>
                    <Link to={`${this.props.match.url}/hr-rooms`}>HR rooms</Link>
                    <br></br>
                    <Link to={`${this.props.match.url}/hr-academics`}>HR academics</Link>
                    <br></br>
                    <Link to={`${this.props.match.url}/hr-faculties`}>HR faculties</Link>
                    <br></br>
                    <Link to={`${this.props.match.url}/hr-departments`}>HR departments</Link>
                </div>
                <Router>
                    <Route exact path={`${this.props.match.path}/profile`}> <Profile /> </Route>
                    <Route exact path={`${this.props.match.path}/hod-courses`}> <HODCourses /> </Route>
                    <Route exact path={`${this.props.match.path}/hr-rooms`}> <HRrooms /> </Route>
                    <Route exact path={`${this.props.match.path}/hr-academics`}> <HRacademics /> </Route>
                    <Route exact path={`${this.props.match.path}/hr-faculties`}> <HRfaculty /> </Route>
                    <Route exact path={`${this.props.match.path}/hr-departments`}> <HRdepartments /> </Route>
                </Router>
            </div>
        )
    }
}

export default withRouter(HomePage);