import React from "react";
import { Route, withRouter } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../axios";
import HrList from "./hr_list.component";
import HrMemberForm from "./hr_member_form.component";
import DeleteHrMember from "./delete_hr_member.component";

class HRhrmembers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hrmembers: [],
            rooms: []
        }
    }

    fetchHrMembers() {
        axiosInstance.get("/fe/get-hr-members", {
            cancelToken: this.axiosCancelSource.token,
            headers: {
                token: sessionStorage.getItem("token")
            }
        })
            .then(res => {
                this.setState({
                    hrmembers: res.data.hrmembers,
                    rooms: res.data.rooms
                });
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response);
                }
                else if (error.request) {
                    console.log(error.request);
                }
                else {
                    console.log(error.message);
                }
                console.log(error);
            });
    }

    componentDidMount() {
        this.axiosCancelSource = axios.CancelToken.source();
        this.fetchHrMembers();
    }

    componentWillUnmount() {
        this.axiosCancelSource.cancel("Operation canceled by the user");
    }

    getHrMember(hrMemberID) {
        const hrmembers = this.state.hrmembers;
        for (let i = 0; i < hrmembers.length; i++) {
            if (hrmembers[i].id === hrMemberID)
                return hrmembers[i];
        }
        return { id: "", name: "", salary: "", gender: "", role: "", email: "" }
    };

    getRoom(hrMemberID) {
        const hrmembers = this.state.hrmembers;
        const rooms = this.state.rooms;
        for (let i = 0; i < hrmembers.length; i++) {
            if (hrmembers[i].id === hrMemberID)
                return rooms[i];
        }
        return { room: "" }
    };

    render() {
        return (
            <div>
               <Route exact path={`${this.props.match.path}`}> <HrList hrmembers={this.state.hrmembers} rooms={this.state.rooms} role="hr" /> </Route>
                <Route exact path={`${this.props.match.path}/update/:id`}
                    render={routeProps => (
                        <HrMemberForm hrMember={this.getHrMember(routeProps.match.params.id)} office={this.getRoom(routeProps.match.params.id)} updateHrMembers={this.fetchHrMembers()} formType="update" />
                    )} />
                <Route exact path={`${this.props.match.path}/delete/:id`}
                    render={routeProps => (
                        <DeleteHrMember hrMember={this.getHrMember(routeProps.match.params.id)} updateHrMembers={this.fetchHrMembers()} />
                    )} />
            </div>
        )
    }
}

export default withRouter(HRhrmembers);