import React from "react";
import { Route, withRouter } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../axios";
import RoomList from "../components/room_list.component";
import DeleteRoom from "./delete_room.component";
import RoomForm from "./room_form.component";
import {
    Col, Spinner
} from "reactstrap";

class HrRooms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            loading: true
        }
        this.fetchRooms = this.fetchRooms.bind(this);
    }

    async fetchRooms() {
        this.setState({ loading: true });
        await axiosInstance.get("/fe/get-rooms", {
            cancelToken: this.axiosCancelSource.token,
            headers: {
                token: sessionStorage.getItem("token")
            }
        })
            .then(res => {
                this.setState({
                    rooms: res.data,
                    loading: false
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
        this.setState({ loading: false });
    }

    componentDidMount() {
        this.axiosCancelSource = axios.CancelToken.source();
        this.fetchRooms();
    }

    componentWillUnmount() {
        this.axiosCancelSource.cancel("Operation canceled by the user");
    }

    getRoom(roomName) {
        const rooms = this.state.rooms;
        for (let i = 0; i < rooms.length; i++) {
            if (rooms[i].name === roomName)
                return rooms[i];
        }
        return { name: "", capacity: "", type: "" }
    };

    render() {
        return (
            <div>
                <Route exact path={`${this.props.match.path}`}
                    render={() => {
                        if (this.state.loading) {
                            return (
                                <div className="container">
                                    <div className="row mt-10">
                                        <Col xs={{ offset: 6 }}>
                                            <br />
                                            <br />
                                            <br />
                                            <Spinner color="primary" />
                                        </Col>
                                    </div>
                                </div>
                            );
                        }
                        return (<RoomList rooms={this.state.rooms} role="hr" />);
                    }} />
                <Route exact path={`${this.props.match.path}/update/:name`}
                    render={routeProps => (
                        <RoomForm room={this.getRoom(routeProps.match.params.name)} updateRooms={this.fetchRooms} formType="update" />
                    )} />
                <Route exact path={`${this.props.match.path}/delete/:name`}
                    render={routeProps => (
                        <DeleteRoom room={this.getRoom(routeProps.match.params.name)} updateRooms={this.fetchRooms} />
                    )} />
            </div>
        );
    }
}

export default withRouter(HrRooms);
