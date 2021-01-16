import React from "react";
import { Route, withRouter } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../axios";
import RoomList from "../components/room_list.component";
import RoomForm from "./room_form.component";
import {
    Button,
    Col, Modal, Spinner
} from "reactstrap";

class HrRooms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            deleteModalOpen: false,
            roomToDelete: "",
            modalMessageStyle: "",
            modalMessage: "",
            loading: true
        }
        this.fetchRooms = this.fetchRooms.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.deleteRoom = this.deleteRoom.bind(this);
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

    toggleModal(roomName) {
        this.setState({ deleteModalOpen: !this.state.deleteModalOpen, roomToDelete: roomName, modalMessage: "" });
    }

    async deleteRoom(roomName) {
        await axiosInstance.delete(`/hr/delete-room/${roomName}`, {
            cancelToken: this.axiosCancelSource.token,
            headers: {
                token: sessionStorage.getItem("token")
            }
        })
            .then(async response => {
                this.setState({
                    modalMessageStyle: "form-success-message",
                    modalMessage: response.data
                });
                await this.fetchRooms();
            })
            .catch(error => {
                if (error.response) {
                    this.setState({
                        modalMessageStyle: "form-error-message",
                        modalMessage: error.response.data
                    });
                    console.log(error.response);
                }
                else if (error.request) {
                    console.log(error.request);
                }
                else {
                    console.log(error.message);
                }
            });
    }

    renderModal() {
        if (!this.state.modalMessage) {
            return (
                <>
                    <div>Are you sure?</div>
                    <Button className="rounded bg-danger" onClick={() => this.deleteRoom(this.state.roomToDelete)}>Yes</Button>
                    <Button className="rounded bg-secondary" onClick={this.toggleModal}>No</Button>
                </>
            );
        }
        return (
            <>
                <br />
                <div className={this.state.modalMessageStyle}>{this.state.modalMessage}</div>
                <br />
            </>
        );
    }

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
                        return (
                            <>
                                <button>Add Room</button>
                                <RoomList rooms={this.state.rooms} role="hr" toggleModal={this.toggleModal} />
                                <Modal isOpen={this.state.deleteModalOpen} toggle={this.toggleModal}>
                                    {this.renderModal()}
                                </Modal>
                            </>
                        );
                    }} />
                <Route exact path={`${this.props.match.path}/update/:name`}
                    render={routeProps => (
                        <RoomForm room={this.getRoom(routeProps.match.params.name)} updateRooms={this.fetchRooms} formType="update" />
                    )} />
            </div>
        );
    }
}

export default withRouter(HrRooms);
