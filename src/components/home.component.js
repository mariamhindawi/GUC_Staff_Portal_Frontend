import React from "react";
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import Profile from "./profile.component";
import HODCourses from "./hod_courses.component";

class HomePage extends React.Component {
    render() {
        return (
            <div>
                <div>
                    {console.log(this.props)}
                    <h1>Welcome</h1>
                    <Link to={`${this.props.match.url}/profile`}>Profile</Link>
                    <br/> <br/>
                    <Link to={`${this.props.match.url}/hod-courses`}>HOD courses</Link>
                </div>
                <Router>
                    <Route exact path={`${this.props.match.path}/profile`}> <Profile /> </Route>
                    <Route exact path={`${this.props.match.path}/hod-courses`}> <HODCourses /> </Route>
                </Router>
            </div>
        )
    }
}

export default withRouter(HomePage);