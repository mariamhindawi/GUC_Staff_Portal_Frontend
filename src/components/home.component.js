import React from "react";
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import Profile from "./profile.component";
import HODCourses from "./hod_courses.component";
import RoomForm from "./room_form.component";

class HomePage extends React.Component {
    render() {
        const room = {
            "name": "",
            "capacity": "",
            "type": "",
        };

        const room1 = {
            "_id": "5fe66c8538f6263350cacc00",
            "name": "C7.305",
            "capacity": 10,
            "remainingCapacity": 5,
            "type": "Office",
            "__v": 0
        };

        return (
            <div>
                <div>
                    <h1>Welcome</h1>
                    <Link to={`${this.props.match.url}/profile`}>Profile</Link>
                    <br/>
                    <Link to={`${this.props.match.url}/hod-courses`}>HOD courses</Link>
                    <br/>
                    <Link to={`${this.props.match.url}/hr-add-room`}>HR add room</Link>
                    <br/>
                    <Link to={`${this.props.match.url}/hr-update-room`}>HR update room</Link>
                    <br/><br/>
                </div>
                <Router>
                    <Route exact path={`${this.props.match.path}/profile`}> <Profile /> </Route>
                    <Route exact path={`${this.props.match.path}/hod-courses`}> <HODCourses /> </Route>
                    <Route exact path={`${this.props.match.path}/hr-add-room`}> <RoomForm room={room} formType="add"/> </Route>
                    <Route exact path={`${this.props.match.path}/hr-update-room`}> <RoomForm room={room1} formType="update"/> </Route>
                </Router>
            </div>
        )
    }
}

export default withRouter(HomePage);