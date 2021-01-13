import React from "react";
import { Route, Link, withRouter } from "react-router-dom";
import HrRooms from "./hr_rooms.component";
import HRacademics from "./hr_academics.component";
import HRhrmembers from "./hr_hrmembers.component";
import HRfaculty from "./hr_faculty.component";
import HRdepartments from "./hr_departments.component";

class HrHomePage extends React.Component {

    render() {
        return (
            <div className="home-margin">
                <div >
                    <h1>Welcome</h1>
                    <Link to={`${this.props.match.url}/rooms`}>HR rooms</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to={`${this.props.match.url}/academic-members`}>HR academics</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to={`${this.props.match.url}/hr-members`}>HR hr members</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to={`${this.props.match.url}/faculties`}>HR faculties</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to={`${this.props.match.url}/departments`}>HR departments</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <br /><br />
                </div>
                <div>
                    <Route path={`${this.props.match.path}/rooms`}> <HrRooms /> </Route>
                    <Route path={`${this.props.match.path}/academic-members`}> <HRacademics /> </Route>
                    <Route path={`${this.props.match.path}/hr-members`}> <HRhrmembers /> </Route>
                    <Route path={`${this.props.match.path}/faculties`}> <HRfaculty /> </Route>
                    <Route path={`${this.props.match.path}/departments`}> <HRdepartments /> </Route>
                </div>
            </div>
        )
    }
}

export default withRouter(HrHomePage);