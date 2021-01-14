import React from "react";
import { Route, withRouter } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../axios";
import AcademicList from "../components/academic_list.component";
import AcademicForm from "./academic_member_form.component";
import DeleteAcademic from "./delete_academic_member.component";

class HRacademics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            academics: [],
            departments: [],
            rooms: []
        }
    }

    fetchAcademics() {
        axiosInstance.get("/fe/get-academics", {
            cancelToken: this.axiosCancelSource.token,
            headers: {
                token: sessionStorage.getItem("token")
            }
        })
            .then(res => {
                this.setState({
                    academics: res.data.academics,
                    departments: res.data.departments,
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
        this.fetchAcademics();
    }

    componentWillUnmount() {
        this.axiosCancelSource.cancel("Operation canceled by the user");
    }

    getAcademic(academicID) {
        const academics = this.state.academics;
        for (let i = 0; i < academics.length; i++) {
            if (academics[i].id === academicID)
                return academics[i];
        }
        return { id: "", name: "", salary: "", dayOff: "", gender: "", role: "", email: "" }
    };

    getDepartment(academicID) {
        const academics = this.state.academics;
        const departments = this.state.departments;
        for (let i = 0; i < academics.length; i++) {
            if (academics[i].id === academicID)
                return departments[i];
        }
        return { department: "" }
    };

    getRoom(academicID) {
        const academics = this.state.academics;
        const rooms = this.state.rooms;
        for (let i = 0; i < academics.length; i++) {
            if (academics[i].id === academicID)
                return rooms[i];
        }
        return { room: "" }
    };

    render() {
        return (
            <div>
               <Route exact path={`${this.props.match.path}`}> <AcademicList academics={this.state.academics} departments={this.state.departments} rooms={this.state.rooms} role="hr" /> </Route>
                <Route exact path={`${this.props.match.path}/update/:id`}
                    render={routeProps => (
                        <AcademicForm academicMember={this.getAcademic(routeProps.match.params.id)} department={this.getDepartment(routeProps.match.params.id)} office={this.getRoom(routeProps.match.params.id)} updateAcademics={this.fetchAcademics()} formType="update" />
                    )} />
                <Route exact path={`${this.props.match.path}/delete/:id`}
                    render={routeProps => (
                        <DeleteAcademic academicMember={this.getAcademic(routeProps.match.params.id)} updateAcademics={this.fetchAcademics()} />
                    )} />
            </div>
        )
    }
}

export default withRouter(HRacademics);